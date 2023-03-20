#include <Arduino.h>
#include <LittleFS.h>
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <ArduinoOTA.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#include <GLOBAL.h>
#include <WIFI_CONNECTION.h>
#include <API.h>

// Setting up One Wire protocol and Dallas Temperature library
OneWire oneWire(TEMPERATURE_SENSOR_PIN);
DallasTemperature sensors(&oneWire);

void loadConfig()
{
  if (LittleFS.begin())
  {
    Serial.println("File system has been mounted");
    Serial.println("Loading configuration file...");
    File jsonFile = GetFile(CONFIG_FILE, "r");
    if (jsonFile)
    {
      size_t size = jsonFile.size();
      std::unique_ptr<char[]> jsonBuf(new char[size]);
      jsonFile.readBytes(jsonBuf.get(), size);

      DynamicJsonDocument jsonBuffer(1024);
      auto error = deserializeJson(jsonBuffer, jsonBuf.get());
      if (!error)
      {
        strcpy(DEVICE_NAME, jsonBuffer[FIELD_DEVICE_NAME]);
        strcpy(STASSID, jsonBuffer[FIELD_STA_SSID]);
        strcpy(STAPSK, jsonBuffer[FIELD_STA_PSK]);
        strcpy(FLOWER, jsonBuffer[FIELD_FLOWER]);
        strcpy(IMG_FLOWER, jsonBuffer[FIELD_FLOWER_IMAGE]);
        strcpy(CSS_FILENAME, jsonBuffer[FIELD_CSS_FILENAME]);
        strcpy(JS_FILENAME, jsonBuffer[FIELD_JS_FILENAME]);
        strcpy(NTP_SERVER, jsonBuffer[FIELD_NTP_SERVER]);
        Pump_on = jsonBuffer[FIELD_PUMP_ON];
        Pump_off = jsonBuffer[FIELD_PUMP_OFF];
        Pump_voltage = jsonBuffer[FIELD_PUMP_VOLTAGE];
        Pump_working_mode = jsonBuffer[FIELD_PUMP_MODE];
        Pump_is_active = jsonBuffer[FIELD_PUMP_IS_ACTIVE];
        Ramp_time = jsonBuffer[FIELD_RAMP_TIME];
        Serial.println("Config file has been loaded");
      }
      else
      {
        Serial.println("Failed to load config file");
      }
      jsonFile.close();
    }
  }
}

float RCFilter(float measure)
{
  static float output = 0;
  static float output_last = 0;

  float RC = (SAMPLE_TIME / 1000.0) / (6.283185 * 100);
  double coeff[] = {(SAMPLE_TIME / 1000.0) / ((SAMPLE_TIME / 1000.0) + RC), RC / ((SAMPLE_TIME / 1000.0) + RC)};

  output_last = output;
  output = coeff[0] * measure + coeff[1] * output_last;

  return output;
}

void handleTemperatureMeasure()
{

  static uint32_t last_millis = 0;
  if ((millis() - last_millis) >= (SAMPLE_TIME * 5))
  {
    sensors.requestTemperatures();
    Temperature = sensors.getTempCByIndex(0);
    last_millis = millis();
  }
}

void handleHumidityMeasure()
{
  static uint32_t last_millis = 0;
  if ((millis() - last_millis) >= (SAMPLE_TIME * 1))
  {
    Humidity = analogRead(ANALOG_PIN);
    Humidity = RCFilter(Humidity);
    Humidity = map(Humidity, HUMIDITY_WET, HUMIDITY_DRY, 100, 0);
    last_millis = millis();
  }
}

void ChangeMotorSpeed(uint16_t target_analog_value, uint16_t *current_analog_value, uint16_t ramp_time, char ramp_type = 'l', float number_of_points = 100.0)
{
  static uint32_t last_millis = 0;
  static uint8_t catched_current_analog_value = 0;
  static uint8_t target_analog_value_old = target_analog_value;

  if (target_analog_value != target_analog_value_old)
  {
    catched_current_analog_value = *current_analog_value;
    target_analog_value_old = target_analog_value;
  }

  if ((millis() - last_millis) >= (ramp_time / number_of_points))
  {
    if (*current_analog_value != target_analog_value)
    {
      *current_analog_value += (target_analog_value - catched_current_analog_value) / number_of_points;
      if (target_analog_value >= catched_current_analog_value)
      {
        if (*current_analog_value >= target_analog_value)
          *current_analog_value = target_analog_value;
      }
      else
      {
        if (*current_analog_value <= target_analog_value)
          *current_analog_value = target_analog_value;
      }
    }
    if (*current_analog_value >= 255)
      *current_analog_value = 255;
    else if (*current_analog_value < 0)
      *current_analog_value = 0;
    analogWrite(PUMP_START_PIN, *current_analog_value);
    last_millis = millis();
  }
}

void handleAutomaticWatering()
{
  static uint32_t last_millis = 0;
  static uint8_t pump_timer = 0;
  static uint8_t pump_retry = 0;

  if (((millis() - last_millis) >= SAMPLE_TIME) && Pump_is_active && !Pump_water_level_low)
  {
    if (Humidity <= Pump_on)
    {
      Pump_is_running = 1;
      if (pump_timer < (500.0 / SAMPLE_TIME))
      {
        Pump_target_analog_value = 200;
      }
      else
      {
        Pump_target_analog_value = 200;
      }
    }
    else if (Humidity >= Pump_off)
    {
      Pump_is_running = 0;
      pump_timer = 0;
      Pump_target_analog_value = 0;
    }

    if (Pump_is_running)
    {
      if (pump_timer >= 1 * (1000.0 / SAMPLE_TIME))
      {
        digitalWrite(PUMP_START_PIN, LOW);
        Pump_is_running = 0;
      }
      pump_timer += 1;
      if (pump_timer >= 5 * (1000.0 / SAMPLE_TIME))
      {
        pump_timer = 0;
        if (pump_retry < 2)
          pump_retry++;
      }
    }
    last_millis = millis();
  }
  if (pump_retry >= 2)
  {
    Pump_water_level_low = 1;
    pump_retry = 0;
  }
}

void handleWatering()
{
  if (!Pump_working_mode)
    handleAutomaticWatering();
}

void setup()
{
  // Defining specified outputs
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(PUMP_START_PIN, OUTPUT);

  // Writing its state to HIGH
  digitalWrite(LED_BUILTIN, HIGH);

  // Loading configuration
  Serial.begin(9600);
  loadConfig();

  // Connecting to Wifi
  WifiConnection_Init(STASSID, STAPSK);

  // Running programming over WiFi
  ArduinoOTA.setHostname(DEVICE_NAME);
  ArduinoOTA.setPassword("programmingpass");
  ArduinoOTA.begin();

  // Starting One Wire
  sensors.begin();

  // Setting up server endpoints
  API_Init();

  // Setting UP mDNS
  MDNS.begin(DEVICE_NAME);
}

void loop()
{
  server.handleClient();
  ArduinoOTA.handle();
  MDNS.update();
  handleHumidityMeasure();
  handleTemperatureMeasure();
  handleWatering();
  ChangeMotorSpeed(Pump_target_analog_value, &Current_pump_analog_value, Ramp_time);
  handleUpdateNTPTime(SAMPLE_TIME);
  DATA_handle_Data_Logging(Humidity, Temperature, Pump_is_running, 36 * 1000);
}