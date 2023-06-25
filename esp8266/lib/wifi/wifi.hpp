#include <Arduino.h>
#include <ecs.hpp>

#include <tuple>
namespace components
{

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
}
