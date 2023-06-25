#include <Arduino.h>
#include <ecs.hpp>

void Component::setup(){};

void Component::update(){};

void ComponentManager::add_component(Component *component)
{
  components.push_back(component);
};

void ComponentManager::setup()
{
  for (const auto &component : components)
  {
    component->setup();
  }
};

void ComponentManager::update()
{
  auto now = millis();

  for (const auto &component : components)
  {
    if (now - component->lasExecutedTimeMs >= component->intervalMs)
    {
      component->lasExecutedTimeMs = now;
      component->update();
    }
  }
};
