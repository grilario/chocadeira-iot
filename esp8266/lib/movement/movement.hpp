#ifndef movement_h
#define movement_h

#include <Arduino.h>
#include <ecs.hpp>

namespace components
{

  class Movement : public Component
  {
  private:
    uint8_t sensor_pin;

  public:
    bool motion_detected = false;

    Movement(unsigned long intervalMs, int sensor_pin);

    virtual void setup();
    virtual void update();
  };
}

#endif
