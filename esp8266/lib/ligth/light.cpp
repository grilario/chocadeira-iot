#include <Arduino.h>
#include <light.hpp>

namespace components
{
  Light::Light(unsigned long intervalMs, int light_pin, DHT *dht)
  {
    this->intervalMs = intervalMs;
    this->light_pin = light_pin;
    this->dht = dht;
  }

  void Light::setup()
  {
    pinMode(light_pin, OUTPUT);
  }

  void Light::update()
  {
    if (dht->temperature < 37.8)
    {
      power_on(0);
    }
    else if (dht->temperature > 39)
    {
      power_off(0);
    }
  }

  void Light::power_on(unsigned long time)
  {
    if (!is_on)
    {
      // Return if force is more time
      auto now = millis();
      if (now + time <= force_time)
      {
        return;
      }

      digitalWrite(light_pin, HIGH);
      is_on = true;
      force_time = now + time;

      Serial.println("LIGHT:\t Power On");
    }
  }

  void Light::power_off(unsigned long time)
  {
    if (is_on)
    {
      // Return if force is more time
      auto now = millis();
      if (now + time <= force_time)
      {
        return;
      }

      digitalWrite(light_pin, LOW);
      is_on = false;
      force_time = now + time;

      Serial.println("LIGHT:\t Power Off");
    }
  }
}
