#ifndef FILES
#define FILES

#include <Arduino.h>
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

bool DATA_saveConfigFileWithCurrentValues()
{
    DynamicJsonDocument jsonBuffer(1024);

    jsonBuffer[FIELD_DEVICE_NAME] = DEVICE_NAME;
    jsonBuffer[FIELD_STA_SSID] = STASSID;
    jsonBuffer[FIELD_STA_PSK] = STAPSK;
    jsonBuffer[FIELD_FLOWER] = FLOWER;
    jsonBuffer[FIELD_FLOWER_IMAGE] = IMG_FLOWER;
    jsonBuffer[FIELD_FLOWER_IMAGE] = CSS_FILENAME;
    jsonBuffer[FIELD_FLOWER_IMAGE] = JS_FILENAME;
    jsonBuffer[FIELD_FLOWER_IMAGE] = NTP_SERVER;
    jsonBuffer[FIELD_PUMP_ON] = Pump_on;
    jsonBuffer[FIELD_PUMP_OFF] = Pump_off;
    jsonBuffer[FIELD_PUMP_VOLTAGE] = Pump_voltage;
    jsonBuffer[FIELD_PUMP_MODE] = Pump_working_mode;
    jsonBuffer[FIELD_PUMP_IS_ACTIVE] = Pump_is_active;
    jsonBuffer[FIELD_RAMP_TIME] = Ramp_time;

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

uint8_t DATA_count_logged_lines(String fileName = DATA_LOGGER_FILE)
{
    uint8_t lineCounter = 0;
    if (LittleFS.exists(fileName))
    {
        File loggerFile = LittleFS.open(fileName, "r");
        Serial.println("\nStarting line counter...");
        while (loggerFile.available())
        {
            auto buffer = loggerFile.readStringUntil('\n');
            lineCounter++;
        }
        loggerFile.close();
        Serial.println("Counted Lines: " + String(lineCounter));
    }
    return lineCounter;
}

void DATA_remove_lines(uint8_t no_lines_to_leave, String fileName = DATA_LOGGER_FILE)
{
    uint8_t numberOfLines = DATA_count_logged_lines(fileName);
    String fileBuffer[numberOfLines];

    if (LittleFS.exists(fileName) && numberOfLines > no_lines_to_leave)
    {
        File loggerFile = LittleFS.open(fileName, "r");
        for (uint8_t i = 0; i < numberOfLines; i++)
        {
            fileBuffer[i] = loggerFile.readStringUntil('\n') + "\n";
        }
        loggerFile.close();

        loggerFile = LittleFS.open(fileName, "w");
        for (uint8_t i = (numberOfLines - no_lines_to_leave); i < numberOfLines; i++)
        {
            auto bytes_written = loggerFile.write(fileBuffer[i].c_str());
        }
        loggerFile.close();
    }
}

void DATA_handle_Data_Logging(uint8_t humidity, int16_t temperature, uint8_t pump_is_active, uint16_t sampling_rate = SAMPLE_TIME)
{
    static uint32_t last_millis = 0;
    if ((millis() - last_millis) >= sampling_rate)
    {
        char write_string[50];
        sprintf(write_string, "%lu;%d;%d;%d\n", timeClient.getEpochTime(), humidity, temperature, pump_is_active);
        DATA_remove_lines(99, DATA_LOGGER_FILE);
        File loggerFile = LittleFS.open(DATA_LOGGER_FILE, "a");
        auto bytes_written = loggerFile.write(String(write_string).c_str());
        Serial.println("Attempting to write data...");
        if (bytes_written)
        {
            Serial.println("Data written");
        }
        loggerFile.close();
        last_millis = millis();
    }
}

#endif