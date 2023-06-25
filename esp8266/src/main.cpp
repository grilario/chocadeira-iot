#include <Arduino.h>

#include <ecs.hpp>
#include <wifi.hpp>
#include <dht.hpp>
#include <light.hpp>

auto componentManager = new ComponentManager();

auto wiFi = new components::WiFi();
auto dht = new components::DHT(3000, D0);
auto light = new components::Light(500, D1, dht);

void setup()
{
  Serial.begin(9600);

  componentManager->add_component(wiFi);
  componentManager->add_component(dht);
  componentManager->add_component(light);

  componentManager->setup();
}

void loop()
{
  componentManager->update();
}
