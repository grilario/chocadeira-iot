#include "utils.h"

#define WIFI_SSID "Vanessa"
#define WIFI_PASSWORD "8024b97c"

#define DATABASE_URL "chocadeira-68d24-default-rtdb.firebaseio.com"
#define DATABASE_SECRET "ZEDhLBWUUx2BMjnuzptjkEKsjz87rIkPrkgvZ0wq"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

int timeOffset = 3600 * 3;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "a.ntp.br", -timeOffset);

namespace Utils
{
  void setupWiFi()
  {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    Serial.println();
    Serial.print("Connecting");
    while (WiFi.status() != WL_CONNECTED)
    {
      delay(500);
      Serial.print(".");
    }

    Serial.println("\nSuccess!");
    Serial.print("IP Address is: ");
    Serial.println(WiFi.localIP());
    Serial.println();
  }

  void setupFirebase()
  {
    Serial.printf("Firebase Client v%s \n", FIREBASE_CLIENT_VERSION);

    config.database_url = DATABASE_URL;
    config.signer.tokens.legacy_token = DATABASE_SECRET;

    Firebase.reconnectWiFi(true);

    Firebase.begin(&config, &auth);

    Serial.print("Firebase connected! \n\n");
  }

  void setupTime()
  {
    timeClient.begin();
    Serial.print("Time initialized! \n\n");
  }

  String getFormattedTime()
  {
    timeClient.update();
    return timeClient.getFormattedTime();
  }

  unsigned long getEpochTime()
  {
    timeClient.update();
    return timeClient.getEpochTime();
  }

  void setString(const char *path, String string)
  {
    Firebase.setStringAsync(fbdo, path, string);
  }

  void pushValue(const char *path, int value)
  {
    FirebaseJson json;

    long long unixTime = ((long long)Utils::getEpochTime() + timeOffset) * 1000;

    json.add("time", unixTime);
    json.add("value", value);

    Firebase.RTDB.pushJSONAsync(&fbdo, path, &json);
  };
}