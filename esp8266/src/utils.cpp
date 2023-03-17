#include "utils.h"

#define WIFI_SSID "Tay sz"
#define WIFI_PASSWORD "88092528"
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

  int getCommandTime(Command command)
  {
    if (command == Command::Lamp)
    {
      Firebase.getInt(fbdo, "/operation/command/lamp");
    }
    else
    {
      Firebase.getInt(fbdo, "/operation/command/fan");
    }

    return fbdo.to<int>();
  }

  void clearCommandTime(Command command)
  {
    if (command == Command::Lamp)
    {
      Firebase.setIntAsync(fbdo, "/operation/command/lamp", 0);
    }
    else
    {
      Firebase.setIntAsync(fbdo, "/operation/command/fan", 0);
    }
  }

  void pushValue(const char *path, float value)
  {
    FirebaseJson json;

    long long unixTime = ((long long)Utils::getEpochTime() + timeOffset) * 1000;

    json.add("time", unixTime);
    json.add("value", value);

    Firebase.RTDB.pushJSONAsync(&fbdo, path, &json);
  };

  FirebaseJsonArray getArray(const char *path)
  {
    FirebaseJsonArray arr;

    Firebase.RTDB.getArray(&fbdo, path);

    arr = fbdo.to<FirebaseJsonArray>();

    return arr;
  }
}