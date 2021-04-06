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
        strcpy(DEVICE_NAME, jsonBuffer["device_name"]);
        strcpy(STASSID, jsonBuffer["stassid"]);
        strcpy(STAPSK, jsonBuffer["stapsk"]);
        strcpy(FLOWER, jsonBuffer["flower"]);
        strcpy(IMG_FLOWER, jsonBuffer["img_flower"]);
        strcpy(CSS_FILENAME, jsonBuffer["css_filename"]);
        strcpy(JS_FILENAME, jsonBuffer["js_filename"]);
        strcpy(NTP_SERVER, jsonBuffer["ntp_server"]);
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

bool saveConfig()
{
  DynamicJsonDocument jsonBuffer(1024);
  jsonBuffer["device_name"] = DEVICE_NAME;
  jsonBuffer["stassid"] = STASSID;
  jsonBuffer["stapsk"] = STAPSK;
  jsonBuffer["flower"] = FLOWER;
  jsonBuffer["img_flower"] = IMG_FLOWER;

  File jsonFile = GetFile(CONFIG_FILE, "w");
  if (jsonFile)
  {
    serializeJsonPretty(jsonBuffer, jsonFile);
  }
  else
  {
    Serial.println("Failed to open config file for writing");
    return false;
  }
  jsonFile.close();
  return true;
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

void handleWatering()
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
        analogWrite(PUMP_START_PIN, 512);
      }
      else
      {
        analogWrite(PUMP_START_PIN, (int)(Pump_voltage / 100.0 * 1023));
      }
    }
    else if (Humidity >= Pump_off)
    {
      Pump_is_running = 0;
      pump_timer = 0;
      digitalWrite(PUMP_START_PIN, LOW);
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
  handleUpdateNTPTime(SAMPLE_TIME);
  yield();
}