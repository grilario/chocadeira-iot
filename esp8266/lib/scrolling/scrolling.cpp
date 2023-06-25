#include <scrolling.hpp>

namespace components
{
  Scrolling::Scrolling(unsigned long intervalMs, int scroll_pin)
  {
    this->intervalMs = intervalMs;
    this->scroll_pin = scroll_pin;
  };

  void Scrolling::setup()
  {
    pinMode(scroll_pin, OUTPUT);
  }

  void Scrolling::update()
  {
    auto now = millis();

    if (!scrolling && now < time)
    {
      digitalWrite(scroll_pin, HIGH);
      scrolling = true;
      Serial.println("SCROLL:\t Power On");
    }
    else if (scrolling && now > time)
    {
      digitalWrite(scroll_pin, LOW);
      scrolling = false;
      Serial.println("SCROLL:\t Power Off");
    }
  }

  void Scrolling::scroll()
  {
    auto now = millis();

    if (now > time)
    {
      int ONE_MINUTE_IN_MILLIS = 1000 * 60;
      time = now + ONE_MINUTE_IN_MILLIS;
    }
  }
}
