#include <Arduino.h>
#include <ecs.hpp>

#include <wifi.hpp>

auto componentManager = new ComponentManager();

auto wiFi = new WiFi();

void setup()
{
  Serial.begin(9600);

  componentManager->add_component(wiFi);

  componentManager->setup();
}

void loop()
{
  componentManager->update();
}
