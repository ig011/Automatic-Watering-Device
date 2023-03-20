#ifndef API
#define API

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <LittleFS.h>

#include <FILES.h>
#include <GLOBAL.h>

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
    server.send(200, "application/json", response);
}

void API_handleConnectToSpecificNetwork(void)
{
    DynamicJsonDocument post_data(200);
    DynamicJsonDocument jsonBuffer(1024);
    deserializeJson(post_data, server.arg("plain"));

    Serial.println("SSID:" + String(post_data[FIELD_STA_SSID]));
    Serial.println("PASS:" + String(post_data[FIELD_STA_PSK]));

    // Read current config file
    File jsonFile = GetFile(CONFIG_FILE, "r");
    if (jsonFile)
    {
        deserializeJson(jsonBuffer, jsonFile);
        jsonBuffer[FIELD_STA_SSID] = post_data[FIELD_STA_SSID];
        jsonBuffer[FIELD_STA_PSK] = post_data[FIELD_STA_PSK];
        jsonFile.close();
    }

    // // Overwrite actual config file
    jsonFile = GetFile(CONFIG_FILE, "w");
    if (jsonFile)
    {
        serializeJson(jsonBuffer, jsonFile);
        jsonFile.close();
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

void API_handleDownloadFile(void)
{
    String file_to_download = String(server.arg("filename"));
    Serial.println(file_to_download);

    if (LittleFS.exists(file_to_download))
    {
        String header = "attachment; filename=\"" + file_to_download + "\"";

        server.sendHeader("Content-Type", "text/plain");
        server.sendHeader("Content-Disposition", header.c_str());

        File file = LittleFS.open(file_to_download, "r");
        server.streamFile(file, "none");
        file.close();
        return;
    }
    server.send(404);
}

void API_handleGetDataFile(void)
{
    File jsonFile = GetFile(DATA_LOGGER_FILE, "r");
    if (jsonFile)
    {
        String response;
        DynamicJsonDocument jsonBuffer(4096);
        JsonArray points = jsonBuffer.createNestedArray("data_points");
        while (jsonFile.available())
        {
            auto buffer = jsonFile.readStringUntil('\n');
            points.add(buffer);
        }
        serializeJson(jsonBuffer, response);
        server.send(200, "application/json", response);
    }
    else
    {
        server.send(400);
    }
    jsonFile.close();
}

void API_handleGetIndex(void)
{
    String cookie;
    cookie = "DEVICE_IP=" + IP_Address;
    File file = LittleFS.open("/index.html", "r");
    server.sendHeader("Set-Cookie", cookie.c_str());
    server.streamFile(file, "text/html");
    file.close();
}

void API_handleGetFiles(void)
{
    String response;
    DynamicJsonDocument jsonBuffer(1024);
    DynamicJsonDocument get_data(200);
    JsonArray files = jsonBuffer.createNestedArray("files");
    deserializeJson(get_data, server.arg("plain"));

    String directory = get_data["directory"];
    Serial.println(String(get_data["directory"]));

    Dir dir = LittleFS.openDir(directory.c_str());
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
    file_to_remove = String(post_data["filename"]);
    Serial.println("Removing file " + file_to_remove);
    if (LittleFS.exists(file_to_remove))
    {
        LittleFS.remove(file_to_remove.c_str());
        Serial.println("File " + file_to_remove + " has been removed");
        server.send(200);
        return;
    }
    server.send(400);
}

void API_handleOnNotFound()
{
    if (server.method() == HTTP_OPTIONS)
    {
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
        server.send(200, "application/json", response);
        return;
    }
    server.send(400);
}

void API_handleGetData()
{
    DynamicJsonDocument doc(1024);
    String response;

    doc[FIELD_DEVICE_NAME] = DEVICE_NAME;
    doc[FIELD_DEVICE_IP] = IP_Address;
    doc[FIELD_DEVICE_ID] = DEVICE_ID;
    doc[FIELD_FIRMWARE_VERSION] = FIRMWARE_VERSION;
    doc[FIELD_STA_SSID] = STASSID;
    doc[FIELD_DEVICE_TIME] = timeClient.getEpochTime();
    doc[FIELD_FLOWER] = FLOWER;
    doc[FIELD_FLOWER_IMAGE] = IMG_FLOWER;
    doc[FIELD_HUMIDITY] = Humidity;
    doc[FIELD_TEMPERATURE] = Temperature;
    doc[FIELD_PUMP_ON] = Pump_on;
    doc[FIELD_PUMP_OFF] = Pump_off;
    doc[FIELD_PUMP_MODE] = Pump_working_mode;
    doc[FIELD_PUMP_VOLTAGE] = Pump_voltage;
    doc[FIELD_PUMP_STATUS] = Pump_is_running;
    doc[FIELD_PUMP_IS_ACTIVE] = Pump_is_active;
    doc[FIELD_PUMP_WATER_LEVEL_LOW] = Pump_water_level_low;
    doc[FIELD_CURRENT_PUMP_ANALOG_VALUE] = Current_pump_analog_value;
    doc[FIELD_RAMP_TIME] = Ramp_time;

    serializeJson(doc, response);
    server.send(200, "application/json", response);
}

void API_handleCheckStatus()
{
    DynamicJsonDocument doc(1024);
    String response;

    doc[FIELD_STATUS] = 1;

    serializeJsonPretty(doc, response);
    server.send(200, "application/json", response);
}

void DATA_changeParameterIfNotNone(DynamicJsonDocument input_json_data, String key, int *output_variable)
{
    JsonVariant new_output_variable = input_json_data[key];
    if (!new_output_variable.isNull())
    {
        *output_variable = new_output_variable;
        Serial.println(key + " HAS BEEN CHANGED TO " + String(*output_variable));
    }
}

void API_handleChangeParameters()
{
    DynamicJsonDocument patch_data(1024);
    deserializeJson(patch_data, server.arg("plain"));

    DATA_changeParameterIfNotNone(patch_data, FIELD_PUMP_ON, (int *)&Pump_on);
    DATA_changeParameterIfNotNone(patch_data, FIELD_PUMP_OFF, (int *)&Pump_off);
    DATA_changeParameterIfNotNone(patch_data, FIELD_PUMP_VOLTAGE, (int *)&Pump_voltage);
    DATA_changeParameterIfNotNone(patch_data, FIELD_PUMP_IS_ACTIVE, (int *)&Pump_is_active);
    DATA_changeParameterIfNotNone(patch_data, FIELD_PUMP_MODE, (int *)&Pump_working_mode);
    DATA_changeParameterIfNotNone(patch_data, FIELD_RAMP_TIME, (int *)&Ramp_time);

    if (DATA_saveConfigFileWithCurrentValues())
        server.send(202);
    else
        server.send(400);
}

void API_handleManualPumpMode()
{
    DynamicJsonDocument post_data(1024);
    deserializeJson(post_data, server.arg("plain"));

    uint16_t analog_write = post_data[FIELD_MANUAL_MODE];

    if (!Pump_working_mode)
    {
        server.send(400);
        return;
    }

    if (analog_write > 100)
        analog_write = 100;
    else if (analog_write < 0)
        analog_write = 0;

    if (analog_write > 0)
        Pump_is_running = 1;
    else
        Pump_is_running = 0;

    Pump_target_analog_value = analog_write / 100.0 * 255;
    server.send(200);
}

void API_Init_Statics(void)
{
    server.serveStatic(CSS_FILENAME, LittleFS, CSS_FILENAME);
    server.serveStatic(JS_FILENAME, LittleFS, JS_FILENAME);
    server.serveStatic("/favicon.ico", LittleFS, "/favicon.ico");
}

void API_Init(void)
{
    // Endpoints initialization
    server.on("/api/config", HTTP_GET, API_handleGetConfig);
    server.on("/api/data", HTTP_GET, API_handleGetData);
    server.on("/api/data", HTTP_POST, API_handleChangeParameters);
    server.on("/api/retry", HTTP_GET, API_handleRetryWatering);
    server.on("/api/status", HTTP_GET, API_handleCheckStatus);
    server.on("/api/pump/manual", HTTP_POST, API_handleManualPumpMode);
    server.on("/api/ssids", HTTP_GET, API_handleGetWifiNetworks);
    server.on("/api/ssids/connect", HTTP_POST, API_handleConnectToSpecificNetwork);
    // server.on("/", HTTP_GET, API_handleGetIndex);
    // server.on("/settings", HTTP_GET, API_handleGetIndex);
    server.on("/api/files/config", HTTP_GET, API_handleGetConfigFile);
    server.on("/api/files/download", HTTP_POST, API_handleDownloadFile);
    server.on("/api/chart/data", HTTP_GET, API_handleGetDataFile);
    server.on("/api/files", HTTP_DELETE, API_handleRemoveFile);
    server.on("/api/files", HTTP_POST, API_handleGetFiles);

    // Initialization of static files
    API_Init_Statics();

    // Handling Not Found
    server.onNotFound(API_handleGetIndex);

    // Running server
    server.begin();

    // Enabling CORS
    server.enableCORS(true);
}

#endif