#include <dht.hpp>

namespace components
{
  DHT::DHT(unsigned long intervalMs, int dht_pin)
  {
    this->intervalMs = intervalMs;
    this->dht = new ::DHT(dht_pin, DHT12);
  }

  void DHT::setup()
  {
    dht->begin();
  }

  void DHT::update()
  {
    float temperature = dht->readTemperature();
    float humidity = dht->readHumidity();

    this->temperature = isnan(temperature) ? this->temperature : temperature;
    this->humidity = isnan(humidity) ? this->humidity : humidity;

#ifdef COMPONENT_DHT_DEBUG

    Serial.println();
    Serial.println("DEBUG_DHT");
    Serial.print("\t Temperature: ");
    Serial.println(temperature);
    Serial.print("\t Humidity: ");
    Serial.println(humidity);

#endif
  }
}
