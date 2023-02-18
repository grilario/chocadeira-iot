#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include "utils.h"

void setup()
{
  Serial.begin(9600);

  Utils::setupWiFi();
  Utils::setupFirebase();
  Utils::setupTime();
}

void loop()
{
  delay(1000);

  Serial.println(Utils::getFormattedTime());
}