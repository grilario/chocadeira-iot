#include <wifi.hpp>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <LittleFS.h>
#include <ArduinoJson.h>

namespace components
{
  ESP8266WebServer server(80);
  String ssid, password;

  void WiFi::setup()
  {
    LittleFS.begin();

    setup_server();

    get_stored_credentials();

    auto success = connect();

    if (success)
    {
      LittleFS.end();

      return;
    }

    ::WiFi.softAP("Brooder");
    server.begin();

    while (true)
    {
      if (ssid.isEmpty() || password.isEmpty())
      {
        server.handleClient();

        continue;
      }

      auto success = connect();

      if (success)
      {
        store_credentials();
        LittleFS.end();

        ::WiFi.softAPdisconnect(true);
        server.stop();

        break;
      }
    }
  };

  bool WiFi::connect()
  {
    ::WiFi.disconnect();
    ::WiFi.begin(ssid.c_str(), password.c_str());

    Serial.println();
    Serial.print("Connecting");

    int time_out = 0;

    while (::WiFi.status() != WL_CONNECTED)
    {
      // Max 15 seconds
      if (++time_out >= 30)
      {
        ssid.clear();
        password.clear();

        return 0;
      }

      delay(500);
      Serial.print(".");
    }

    Serial.println();
    Serial.println("Success!");

    Serial.print("IP Address is: ");
    Serial.println(::WiFi.localIP());

    Serial.println();

    return 1;
  };

  void WiFi::get_stored_credentials()
  {
    auto storage = LittleFS.open("/network", "r");

    ssid = storage.readStringUntil((char)0x03);
    password = storage.readStringUntil((char)0x03);
  };

  void WiFi::store_credentials()
  {
    auto storage = LittleFS.open("/network", "w");

    storage.write(ssid.c_str());
    storage.write((char)0x03);

    storage.write(password.c_str());
    storage.write((char)0x03);
  };

  void handle_request()
  {
    DynamicJsonDocument body(256);
    deserializeJson(body, server.arg("plain"));

    ssid = body["ssid"].as<String>();
    password = body["password"].as<String>();

    server.send(204);
  }

  void WiFi::setup_server()
  {
    server.on("/", handle_request);
  }
}
