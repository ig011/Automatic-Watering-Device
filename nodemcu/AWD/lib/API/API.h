#ifndef API
#define API

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <LittleFS.h>

#include <GLOBAL.h>

File GetFile(String fileName, const char *option)
{
    File textFile;
    if (LittleFS.exists(fileName))
    {
        textFile = LittleFS.open(fileName, option);
    }
    return textFile;
}

void API_handleGetWifiNetworks(void)
{
    String ssid;
    int32_t rssi;
    uint8_t encryptionType;
    uint8_t *bssid;
    int32_t channel;
    bool hidden;
    int scanResult;
    DynamicJsonDocument doc(1024);
    String response;

    scanResult = WiFi.scanNetworks(false, true);
    if (scanResult)
    {
        JsonArray ssidArray = doc.createNestedArray("ssids");
        for (uint8_t i = 0; i < scanResult; i++)
        {
            WiFi.getNetworkInfo(i, ssid, encryptionType, rssi, bssid, channel, hidden);
            JsonObject ssidInfo = ssidArray.createNestedObject();
            ssidInfo["id"] = i;
            ssidInfo["ssid"] = ssid;
            ssidInfo["signal_strength"] = rssi;
            ssidInfo["channel"] = channel;
            ssidInfo["encryption"] = (encryptionType == ENC_TYPE_NONE) ? false : true;
        }
    }

    serializeJson(doc, response);
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "application/json", response);
}

void API_handleConnectToSpecificNetwork(void)
{
    DynamicJsonDocument post_data(200);
    DynamicJsonDocument jsonBuffer(1024);
    deserializeJson(post_data, server.arg("plain"));

    Serial.println("SSID:" + String(post_data["stassid"]));
    Serial.println("PASS:" + String(post_data["stapsk"]));

    // Read current config file
    File jsonFile = GetFile(CONFIG_FILE, "r");
    if (jsonFile)
    {
        deserializeJson(jsonBuffer, jsonFile);
        jsonBuffer["stassid"] = post_data["stassid"];
        jsonBuffer["stapsk"] = post_data["stapsk"];
        jsonFile.close();
    }

    // // Overwrite actual config file
    jsonFile = GetFile(CONFIG_FILE, "w");
    if (jsonFile)
    {
        serializeJson(jsonBuffer, jsonFile);
        jsonFile.close();
        server.sendHeader("Access-Control-Allow-Origin", "*");
        server.send(202);
        delay(2000);
        ESP.restart();
    }
    else
    {
        server.send(400);
    }
}

void API_handleGetConfigFile(void)
{
    server.sendHeader("Content-Type", "text/plain");
    server.sendHeader("Content-Disposition", "attachment; filename=\"config.cfg\"");
    File file = LittleFS.open(CONFIG_FILE, "r");
    server.streamFile(file, "none");
    file.close();
}

void API_handleGetIndex(void)
{
    String cookie;
    cookie = "DEVICE_IP=" + IP_Address;
    server.sendHeader("Set-Cookie", cookie.c_str());
    File file = LittleFS.open("/index.html", "r");
    server.streamFile(file, "text/html");
    file.close();
}

void API_handleGetFiles(void)
{
    String response;
    DynamicJsonDocument jsonBuffer(1024);
    JsonArray files = jsonBuffer.createNestedArray("files");

    Dir dir = LittleFS.openDir("");
    while (dir.next())
        files.add(dir.fileName());

    FSInfo fs_info;
    LittleFS.info(fs_info);
    jsonBuffer["used"] = String(fs_info.usedBytes);
    jsonBuffer["max"] = String(fs_info.totalBytes);
    serializeJson(jsonBuffer, response);
    server.send(200, "application/json", response);
}

void API_handleRemoveFile(void)
{
    DynamicJsonDocument post_data(200);
    deserializeJson(post_data, server.arg("plain"));
    String file_to_remove;
    file_to_remove = "/" + String(post_data["filename"]);
    LittleFS.remove(file_to_remove.c_str());
    server.send(200);
}

void API_handleOnNotFound()
{
    if (server.method() == HTTP_OPTIONS)
    {
        server.sendHeader("Access-Control-Allow-Origin", "*");
        server.sendHeader("Access-Control-Max-Age", "10000");
        server.sendHeader("Access-Control-Allow-Methods", "PUT,POST,GET,OPTIONS");
        server.sendHeader("Access-Control-Allow-Headers", "*");
        server.send(204);
    }
    else
    {
        server.send(404, "text/plain", "");
    }
}

void API_handleRetryWatering()
{
    Pump_water_level_low = 0;
}

void API_handleGetConfig()
{
    File jsonFile = GetFile(CONFIG_FILE, "r");
    if (jsonFile)
    {
        String response;
        size_t size = jsonFile.size();
        std::unique_ptr<char[]> jsonBuf(new char[size]);
        jsonFile.readBytes(jsonBuf.get(), size);
        DynamicJsonDocument jsonBuffer(1024);
        deserializeJson(jsonBuffer, jsonBuf.get());
        serializeJson(jsonBuffer, response);
        server.sendHeader("Access-Control-Allow-Origin", "*");
        server.send(200, "application/json", response);
    }
    else
    {
        server.send(400);
    }
}

void API_handleGetData()
{
    DynamicJsonDocument doc(1024);
    String response;

    doc["device_name"] = DEVICE_NAME;
    doc["device_ip"] = IP_Address;
    doc["device_id"] = DEVICE_ID;
    doc["firmware_version"] = FIRMWARE_VERSION;
    doc["stassid"] = STASSID;
    doc["device_time"] = timeClient.getFormattedTime();
    doc["humidity"] = Humidity;
    doc["pump_on"] = Pump_on;
    doc["pump_off"] = Pump_off;
    doc["pump_voltage"] = Pump_voltage;
    doc["temperature"] = Temperature;
    doc["pump_status"] = Pump_is_running;
    doc["flower"] = FLOWER;
    doc["img_flower"] = IMG_FLOWER;
    doc["pump_is_active"] = Pump_is_active;
    doc["water_level_low"] = Pump_water_level_low;

    serializeJson(doc, response);
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "application/json", response);
}

void API_handleCheckStatus()
{
    DynamicJsonDocument doc(1024);
    String response;

    doc["status"] = 1;

    serializeJsonPretty(doc, response);
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "application/json", response);
}

void API_handleChangeParameters()
{
    DynamicJsonDocument post_data(1024);
    deserializeJson(post_data, server.arg("plain"));

    // Copy post JSON data to variables
    Pump_on = post_data["pump_on"];
    Pump_off = post_data["pump_off"];
    Pump_voltage = post_data["pump_voltage"];
    Pump_is_active = post_data["pump_is_active"];

    // Change config file
    // if (saveConfig())
    // {
    //     server.sendHeader("Access-Control-Allow-Origin", "*");
    //     server.send(202);
    // }
    // else
    //     server.send(404);
}

void API_handleAnalogWrite()
{
    DynamicJsonDocument post_data(1024);
    deserializeJson(post_data, server.arg("plain"));

    if (post_data["value"] > 0)
        Pump_is_running = 1;
    else
        Pump_is_running = 0;
    analogWrite(PUMP_START_PIN, post_data["value"]);

    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(201);
}

void API_Init_Statics(void)
{
    server.serveStatic(CSS_FILENAME, LittleFS, CSS_FILENAME);
    server.serveStatic(JS_FILENAME, LittleFS, JS_FILENAME);
    server.serveStatic("/favicon.ico", LittleFS, "/favicon.ico");
}

void API_Init(void)
{
    // Initialization endpoints
    server.on("/api/config", HTTP_GET, API_handleGetConfig);
    server.on("/api/data", HTTP_GET, API_handleGetData);
    server.on("/api/retry", HTTP_GET, API_handleRetryWatering);
    server.on("/api/status", HTTP_GET, API_handleCheckStatus);
    server.on("/api/parameters", HTTP_POST, API_handleChangeParameters);
    server.on("/api/value", HTTP_POST, API_handleAnalogWrite);
    server.on("/api/ssids", HTTP_GET, API_handleGetWifiNetworks);
    server.on("/api/ssids/connect", HTTP_POST, API_handleConnectToSpecificNetwork);
    server.on("/", HTTP_GET, API_handleGetIndex);
    server.on("/settings", HTTP_GET, API_handleGetIndex);
    server.on("/api/config/get", HTTP_GET, API_handleGetConfigFile);
    server.on(PSTR("/api/files/get"), HTTP_GET, API_handleGetFiles);

    // Initialization of static files
    API_Init_Statics();

    // Handling Not Found
    server.onNotFound(API_handleOnNotFound);

    // Running server
    server.begin();
}

#endif