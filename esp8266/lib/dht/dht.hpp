#ifndef dht_h
#define dht_h

#include <ecs.hpp>
#include <Adafruit_Sensor.h>
#include <DHT.h>

namespace components
{

  class DHT : public Component
  {
  private:
    ::DHT *dht;

  public:
    float temperature = 0;
    float humidity = 0;

    DHT(unsigned long intervalMs, int dht_pin);
    virtual void setup();
    virtual void update();
  };
}

#endif
