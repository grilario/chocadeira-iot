#ifndef light_h
#define light_h

#include <ecs.hpp>
#include <dht.hpp>

namespace components
{

  class Light : public Component
  {
  private:
    DHT *dht;
    uint8_t light_pin = 0;
    bool is_on = false;
    unsigned long force_time = 0;

  public:
    Light(unsigned long intervalMs, int light_pin, DHT *dht);

    virtual void setup();
    virtual void update();
    void power_off(unsigned long time);
    void power_on(unsigned long time);
  };
}

#endif
