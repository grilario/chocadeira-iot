#ifndef fan_h
#define fan_h

#include <ecs.hpp>
#include <dht.hpp>

namespace components
{

  class Fan : public Component
  {
  private:
    DHT *dht;
    uint8_t fan_pin = 0;
    bool is_on = false;
    unsigned long force_time = 0;

  public:
    Fan(unsigned long intervalMs, int fan_pin, DHT *dht);

    virtual void setup();
    virtual void update();
    void power_off(unsigned long time);
    void power_on(unsigned long time);
  };
}

#endif
