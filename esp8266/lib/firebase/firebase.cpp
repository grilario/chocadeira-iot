#include <firebase.hpp>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

unsigned long FIVE_MINUTES_IN_MILLIS = 1000 * 60 * 5;
unsigned long TEN_SECONDS_IN_MILLIS = 1000 * 10;

WiFiClientSecure socket;
HTTPClient https;

WiFiClientSecure socket_stream;
HTTPClient https_stream;

namespace components
{
  Firebase::Firebase(unsigned long intervalMs, String url, DHT *dht, Movement *movement, Light *light, Fan *fan, Scrolling *scrolling)
  {
    this->intervalMs = intervalMs;
    this->url = url;
    this->dht = dht;
    this->movement = movement;
    this->light = light;
    this->fan = fan;
    this->scrolling = scrolling;
  }

  void Firebase::setup()
  {
    socket.setInsecure();
    socket.setBufferSizes(512, 512);

    socket_stream.setInsecure();
    socket_stream.setBufferSizes(512, 512);

    https_stream.begin(socket_stream, url + "/control.json");
    https_stream.addHeader("Accept", "text/event-stream");

    https_stream.GET();
  }

  void Firebase::update()
  {
    {
      auto stream = https_stream.getStreamPtr();

      if (stream->available())
      {
        auto event = stream->readStringUntil('\n');
        auto data = stream->readStringUntil('\n');

        stream->readStringUntil('\n');

        if (event == "event: put")
        {
          DynamicJsonDocument json(256);

          deserializeJson(json, data.substring(5));

          auto path = json["path"].as<String>();

          if (path == "/")
          {
            return handle_scroll_change(path, json["data"]["scroll"].as<JsonArray>());
          }

          if (path == "/scroll")
          {
            return handle_scroll_change(path, json["data"].as<JsonArray>());
          }

          if (path != "/")
          {
            return handle_command(path, json["data"].as<JsonObject>());
          }
        }
      }
    }

    auto now = millis();

    if (now - last_sync >= TEN_SECONDS_IN_MILLIS)
    {
      last_sync = now;

      sync();
    }

    if (now - last_push >= FIVE_MINUTES_IN_MILLIS)
    {
      last_push = now;

      push(dht->temperature, "/data/temperature.json");
      push(dht->humidity, "/data/humidity.json");
    }
  }

  void Firebase::push(float data, String path)
  {
    https.begin(socket, url + path);

    StaticJsonDocument<JSON_OBJECT_SIZE(3)> body;

    body["time"][".sv"] = "timestamp";
    body["value"] = data;

    String payload;
    serializeJson(body, payload);

    https.POST(payload);
    https.end();
  };

  void Firebase::sync()
  {
    StaticJsonDocument<128> body;

    if (last_sync_body["temperature"].as<float>() != dht->temperature)
    {
      body["temperature"] = dht->temperature;
      last_sync_body["temperature"] = dht->temperature;
    }

    if (last_sync_body["humidity"].as<float>() != dht->humidity)
    {
      body["humidity"] = dht->humidity;
      last_sync_body["humidity"] = dht->humidity;
    }

    if (last_sync_body["light"].as<bool>() != light->is_on)
    {
      body["light"] = light->is_on;
      last_sync_body["light"] = light->is_on;
    }

    if (last_sync_body["fan"].as<bool>() != fan->is_on)
    {
      body["fan"] = fan->is_on;
      last_sync_body["fan"] = fan->is_on;
    }

    if (last_sync_body["movement"].as<bool>() != movement->motion_detected)
    {
      body["movement"] = movement->motion_detected;
      last_sync_body["movement"] = movement->motion_detected;
    }

    String payload;
    serializeJson(body, payload);

    if (payload == "null")
    {
      return;
    }

    https.begin(socket, url + "/current.json");
    https.PATCH(payload);
    https.end();
  }

  void Firebase::handle_command(String path, JsonObject data)
  {
    auto time = data["time"].as<unsigned int>();
    auto value = data["value"].as<bool>();

    if (path == "/light" && time > 0)
    {
      if (value)
      {
        light->power_on(time);
      }
      else
      {
        light->power_off(time);
      }

      exclude("/control/light.json");
    }

    if (path == "/fan" && time > 0)
    {
      if (value)
      {
        fan->power_on(time);
      }
      else
      {
        fan->power_off(time);
      }

      exclude("/control/fan.json");
    }
  }

  void Firebase::handle_scroll_change(String path, JsonArray data)
  {
    scrolling->times.clear();

    for (auto time : data)
    {
      scrolling->times.push_back(time.as<String>());
    }
  }

  void Firebase::exclude(String path)
  {
    https.begin(socket, url + path);
    auto status = https.DELETE();
    Serial.println(https.errorToString(status));
    https.end();
  }
}
