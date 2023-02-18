#ifndef UTILS_HEADER_FILE
#define UTILS_HEADER_FILE

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <WiFiUdp.h>
#include <NTPClient.h>

#endif

namespace Utils
{
  void setupWiFi();
  void setupFirebase();
  void setupTime();
  String getFormattedTime();
  unsigned long getEpochTime();
  void setString(const char *path, String string);
  void pushValue(const char *path, int value);
}