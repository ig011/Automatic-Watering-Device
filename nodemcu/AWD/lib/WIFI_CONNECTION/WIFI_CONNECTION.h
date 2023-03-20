#ifndef WIFI_CONNECTION
#define WIFI_CONNECTION

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <NTPClient.h>

#include <GLOBAL.h>

// Creating specified const chars * and ESP web server object
ESP8266WebServer server(80);
String IP_Address = "";

// Converting IP Adress to string variable
String IpAddress2String(const IPAddress &ipAddress)
{
    return String(ipAddress[0]) + String(".") +
           String(ipAddress[1]) + String(".") +
           String(ipAddress[2]) + String(".") +
           String(ipAddress[3]);
}

void handleUpdateNTPTime(const uint16_t sample_time)
{
    static uint32_t last_millis = 0;
    if ((millis() - last_millis) >= sample_time * 10)
    {
        timeClient.update();
        last_millis = millis();
    }
}

void WifiConnection_Init(const char *STASSID, const char *STAPSK, const uint16_t blink_delay = 300, const uint8_t max_tries = 20)
{
    uint8_t attempts_counter = 0;
    char s[30] = "";

    // Configuring WIFI mode
    WiFi.mode(WIFI_STA);
    WiFi.begin(STASSID, STAPSK);

    // Connecting to local WIFI network
    while (WiFi.status() != WL_CONNECTED && (attempts_counter < max_tries))
    {
        delay(blink_delay);
        digitalWrite(LED_BUILTIN, LOW);
        delay(blink_delay);
        digitalWrite(LED_BUILTIN, HIGH);
        attempts_counter++;
        sprintf(s, "Connection error occured. Retrying (%d/%d)", attempts_counter, max_tries);
        Serial.println(s);
        if (attempts_counter >= max_tries)
        {
            WiFi.mode(WIFI_OFF);
            digitalWrite(LED_BUILTIN, LOW);
            Serial.println(WiFi.softAP("AWD-Device") ? "\nAccess Point has been created" : "\nAccess Point init failed!");
        }
    }

    // Turn off LED if connected
    if (WiFi.status() == WL_CONNECTED)
    {
        digitalWrite(LED_BUILTIN, HIGH);
        IP_Address = IpAddress2String(WiFi.localIP());
        Serial.println("\nConnected to the network: " + String(STASSID));
        Serial.println("Device is available at IP: " + IP_Address);
    }
    else
    {
        IP_Address = IpAddress2String(WiFi.softAPIP());
    }

    // Running NTPClient
    timeClient.begin();
}

#endif