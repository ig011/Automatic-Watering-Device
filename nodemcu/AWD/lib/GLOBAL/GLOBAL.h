#ifndef GLOBAL
#define GLOBAL

#include <Arduino.h>
#include <WiFiUdp.h>
#include <NTPClient.h>

#define CONFIG_FILE "/config.cfg"
#define DATA_LOGGER_FILE "/data.bin"
#define FIRMWARE_VERSION "0.1.0"

#define FIELD_DEVICE_NAME "device_name"
#define FIELD_DEVICE_IP "device_ip"
#define FIELD_DEVICE_ID "device_id"
#define FIELD_FIRMWARE_VERSION "firmware_version"
#define FIELD_DEVICE_TIME "device_time"
#define FIELD_STA_SSID "stassid"
#define FIELD_STA_PSK "stapsk"
#define FIELD_FLOWER "flower"
#define FIELD_FLOWER_IMAGE "img_flower"
#define FIELD_CSS_FILENAME "css_filename"
#define FIELD_JS_FILENAME "js_filename"
#define FIELD_NTP_SERVER "ntp_server"
#define FIELD_PUMP_ON "pump_on"
#define FIELD_PUMP_OFF "pump_off"
#define FIELD_PUMP_VOLTAGE "pump_voltage"
#define FIELD_PUMP_MODE "pump_working_mode"
#define FIELD_PUMP_IS_ACTIVE "pump_is_active"
#define FIELD_PUMP_STATUS "pump_status"
#define FIELD_PUMP_WATER_LEVEL_LOW "water_level_low"
#define FIELD_TEMPERATURE "temperature"
#define FIELD_HUMIDITY "humidity"
#define FIELD_CURRENT_PUMP_ANALOG_VALUE "pump_current_voltage"
#define FIELD_RAMP_TIME "pump_ramp_time"

#define FIELD_STATUS "status"
#define FIELD_MANUAL_MODE "value"

#define DEVICE_ID 1
#define ANALOG_PIN A0
#define PUMP_START_PIN 16
#define SAMPLE_TIME 500

#define TEMPERATURE_SENSOR_PIN 4

#define HUMIDITY_DRY 779
#define HUMIDITY_WET 324

// Device state variables
volatile uint8_t Humidity = 100;
volatile uint8_t Pump_on = 0;
volatile uint8_t Pump_off = 0;
volatile uint8_t Pump_voltage = 0;
volatile uint8_t Pump_is_running = 0;
volatile uint8_t Pump_is_active = 0;
volatile uint8_t Pump_water_level_low = 0;
volatile uint8_t Pump_working_mode = 0;
int16_t Temperature = 0;

uint8_t Pump_target_analog_value = 0;
uint16_t Current_pump_analog_value = 0;
uint16_t Ramp_time = 500;

char DEVICE_NAME[50] = "";
char STASSID[50] = "";
char STAPSK[50] = "";
char FLOWER[50] = "";
char IMG_FLOWER[200] = "";
char CSS_FILENAME[50] = "";
char JS_FILENAME[50] = "";
char NTP_SERVER[50] = "";

// NTP Client
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_SERVER);

#endif