#ifndef ecs_h
#define ecs_h

#include <vector>

class Component
{
private:
public:
  unsigned long lasExecutedTimeMs = 0;
  unsigned long intervalMs = 0;

  virtual void setup();
  virtual void update();
};

class ComponentManager
{
private:
  std::vector<Component *> components;

public:
  void add_component(Component *component);
  void setup();
  void update();
};

#endif