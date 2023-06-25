#include <Arduino.h>

#include <ecs.hpp>
#include <wifi.hpp>
#include <dht.hpp>

auto componentManager = new ComponentManager();

auto wiFi = new components::WiFi();
auto dht = new components::DHT(3000, D0);

void setup()
{
  Serial.begin(9600);

  componentManager->add_component(wiFi);
  componentManager->add_component(dht);

  componentManager->setup();
}

void loop()
{
  componentManager->update();
}
