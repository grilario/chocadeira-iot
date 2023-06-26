#ifndef scrolling_h
#define scrolling_h

#include <Arduino.h>
#include <ecs.hpp>

namespace components
{

  class Scrolling : public Component
  {
  private:
    uint8_t scroll_pin = 0;
    unsigned long time = 0;
    unsigned long last_check = 0;
    bool scrolling = false;


  public:
    std::vector<String> times;

    Scrolling(unsigned long intervalMs, int scroll_pin);

    virtual void setup();
    virtual void update();
    void scroll();
  };
}

#endif