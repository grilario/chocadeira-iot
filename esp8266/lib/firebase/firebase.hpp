#ifndef firebase_h
#define firebase_h

#include <Arduino.h>
#include <ArduinoJson.h>
#include <ecs.hpp>
#include <dht.hpp>
#include <movement.hpp>
#include <light.hpp>
#include <fan.hpp>
#include <scrolling.hpp>

namespace components
{

  class Firebase : public Component
  {
  private:
    DHT *dht;
    Movement *movement;
    Light *light;
    Fan *fan;
    Scrolling *scrolling;
    String url;
    unsigned long last_push = 0;
    unsigned long last_sync = 0;
    StaticJsonDocument<128> last_sync_body;

    void push(float data, String path);
    void exclude(String path);
    void handle_command(String path, JsonObject data);
    void handle_scroll_change(String path, JsonArray data);

  public:
    Firebase(unsigned long intervalMs, String url, DHT *dht, Movement *movement, Light *light, Fan *fan, Scrolling *scrolling);

    virtual void setup();
    virtual void update();
    void sync();
  };
}

#endif
