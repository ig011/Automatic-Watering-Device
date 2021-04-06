#ifndef GLOBAL
#define GLOBAL

#include <Arduino.h>
#include <WiFiUdp.h>
#include <NTPClient.h>

#define CONFIG_FILE "/config.cfg"
#define FIRMWARE_VERSION "0.1.0"

#define DEVICE_ID 1
#define ANALOG_PIN A0
#define PUMP_START_PIN 16
#define SAMPLE_TIME 500

#define TEMPERATURE_SENSOR_PIN 4

#define HUMIDITY_DRY 779
#define HUMIDITY_WET 324

uint16_t Humidity = 100;
uint8_t Pump_on = 0;
uint8_t Pump_off = 0;
uint8_t Pump_voltage = 0;
uint8_t Pump_is_running = 0;
uint8_t Pump_is_active = true;
uint8_t Pump_water_level_low = 0;
int16_t Temperature = 0;

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
NTPClient timeClient(ntpUDP, NTP_SERVER, 3600);

#endif