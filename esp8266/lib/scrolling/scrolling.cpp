#include <WiFiUdp.h>
#include <NTPClient.h>
#include <scrolling.hpp>

WiFiUDP socket_udp;
NTPClient ntp(socket_udp, "a.ntp.br", -(3600 * 3));

namespace components
{
  unsigned long TEN_SECONDS_IN_MILLIS = 1000 * 10;

  Scrolling::Scrolling(unsigned long intervalMs, int scroll_pin)
  {
    this->intervalMs = intervalMs;
    this->scroll_pin = scroll_pin;
  };

  void Scrolling::setup()
  {
    ntp.begin();
    pinMode(scroll_pin, OUTPUT);
  }

  void Scrolling::update()
  {

    auto now = millis();

    if (now - last_check >= TEN_SECONDS_IN_MILLIS)
    {
      last_check = now;

      ntp.update();

      auto current_time = ntp.getFormattedTime().substring(0, 5);

      for (auto time : times)
      {
        if (time == current_time)
        {
          scroll();
        }
      }
    }

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
    if (scrolling)
    {
      return;
    }

    auto now = millis();

    if (now > time)
    {
      int ONE_MINUTE_IN_MILLIS = 1000 * 60;
      time = now + ONE_MINUTE_IN_MILLIS;
    }
  }
}
