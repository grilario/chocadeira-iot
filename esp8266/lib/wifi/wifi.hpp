#include <Arduino.h>
#include <ecs.hpp>

#include <tuple>

class WiFi : public Component
{
public:
  virtual void setup();

private:
  void get_stored_credentials();
  void store_credentials();
  bool connect();
  void setup_server();
};
