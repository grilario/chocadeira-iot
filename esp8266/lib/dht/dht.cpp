#include <dht.hpp>

namespace components
{
  DHT::DHT(unsigned long intervalMs, int dht_pin)
  {
    this->intervalMs = intervalMs;
    this->dht = new ::DHT(dht_pin, DHT22);
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

    Serial.printf("DHT:\t Temperature - %f°C \t Humidity - %f%% \n", temperature, humidity);
  }
}
