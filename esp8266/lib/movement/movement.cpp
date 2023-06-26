#include <movement.hpp>

namespace components
{
  Movement::Movement(unsigned long intervalMs, int sensor_pin)
  {
    this->intervalMs = intervalMs;
    this->sensor_pin = sensor_pin;
  }

  void Movement::setup()
  {
    pinMode(sensor_pin, INPUT);
  };

  void Movement::update()
  {
    int motion_detected = digitalRead(sensor_pin);

    if (motion_detected == this->motion_detected)
    {
      return;
    }

    this->motion_detected = motion_detected;

    if (motion_detected == HIGH)
    {
      Serial.println("MOTION:\t Detected");
    }
  };
}
