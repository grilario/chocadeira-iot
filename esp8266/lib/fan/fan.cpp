#include <Arduino.h>
#include <fan.hpp>

namespace components
{
  Fan::Fan(unsigned long intervalMs, int fan_pin, DHT *dht)
  {
    this->intervalMs = intervalMs;
    this->fan_pin = fan_pin;
    this->dht = dht;
  }

  void Fan::setup()
  {
    pinMode(fan_pin, OUTPUT);
  }

  void Fan::update()
  {
    if (dht->humidity > 65)
    {
      power_on(0);
    }
    else if (dht->humidity < 50)
    {
      power_off(0);
    }
  }

  void Fan::power_on(unsigned long time)
  {
    if (!is_on)
    {
      // Return if force is more time
      auto now = millis();
      if (now + time <= force_time && time == 0)
      {
        return;
      }

      digitalWrite(fan_pin, HIGH);
      is_on = true;
      force_time = now + time;

      Serial.println("FAN:\t Power On");
    }
  }

  void Fan::power_off(unsigned long time)
  {
    if (is_on)
    {
      // Return if force is more time
      auto now = millis();
      if (now + time <= force_time && time == 0)
      {
        return;
      }

      digitalWrite(fan_pin, LOW);
      is_on = false;
      force_time = now + time;

      Serial.println("FAN:\t Power Off");
    }
  }
}
