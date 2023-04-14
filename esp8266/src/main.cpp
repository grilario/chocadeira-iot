#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>

#include "utils.h"

#define LAMP_PIN D1
#define MOTOR_PIN D2
#define FAN_PIN D5
#define DHT_PIN D3

float temperature = 0;
float humidity = 0;

#define DHT_TYPE DHT22
DHT dht(DHT_PIN, DHT_TYPE);

void setup()
{
  Serial.begin(9600);

  Utils::setupWiFi();
  Utils::setupFirebase();
  Utils::setupTime();

  dht.begin();

  pinMode(LAMP_PIN, OUTPUT);
  pinMode(FAN_PIN, OUTPUT);
  pinMode(MOTOR_PIN, OUTPUT);
}

#define READ_SENSORS 5000
unsigned long lastExecutedSensors = 0;

#define CONTROL_DEVICE 1000
unsigned long lastExecutedDevice = 0;

#define EXECUTE_COMMAND 1000
unsigned long lastExecutedCommand = 0;

#define PERFORM_SCROLL 10000
unsigned long lastExecutedScroll = 0;

unsigned long lampTime = 0;
unsigned long fanTime = 0;
unsigned long scrollTime = 0;

String lampCommand;
String fanCommand;

bool forceLampTime = false;
bool forceFanTime = false;

void handle_read_sensors()
{
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity))
  {
    return;
  }

  Serial.printf("Temperature %f \n", temperature);
  Serial.printf("Humidity %f \n", humidity);

  Utils::pushValue("/operation/temperature", temperature);
  Utils::pushValue("/operation/humidity", humidity);
}

void handle_execute_command()
{
  auto [lampCommandTime, lampCommandType] = Utils::getCommandTime(Command::Lamp);
  auto [fanCommandTime, fanCommandType] = Utils::getCommandTime(Command::Fan);

  if (lampCommandTime > 0)
  {
    lampTime = millis() + lampCommandTime;
    lampCommand = lampCommandType;
    forceLampTime = true;
    Utils::clearCommandTime(Command::Lamp);

    Serial.printf("Comando da Lampada: Time - %i,   Type: %s \n", lampCommandTime, lampCommandType.c_str());
  }

  if (fanCommandTime > 0)
  {
    fanTime = millis() + fanCommandTime;
    fanCommand = fanCommandType;
    forceFanTime = true;
    Utils::clearCommandTime(Command::Fan);
    Serial.printf("Comando da Fan: Time - %i,   Type: %s \n", fanCommandTime, fanCommandType.c_str());
  }
}

void handle_perform_scroll()
{
  FirebaseJsonArray array = Utils::getArray("/operation/scroll");
  FirebaseJsonData result;

  for (size_t i = 0; i < array.size(); i++)
  {
    array.get(result, i);

    String time = result.to<String>();

    if (time == Utils::getFormattedTime().substring(0, 5))
    {
      if (scrollTime > millis())
      {
        return;
      }

      int oneMinuteInMillis = 1000 * 60;
      scrollTime = millis() + oneMinuteInMillis;
    }
  }
}

void handle_control_lamp()
{
  if (millis() < lampTime)
  {
    if (lampCommand == "on")
    {
      Serial.println("Light is on!");
      digitalWrite(LAMP_PIN, HIGH);
      Utils::pushValue("/operation/light", 1);

      return;
    }

    Serial.println("Light is off!");
    digitalWrite(LAMP_PIN, LOW);
    Utils::pushValue("/operation/light", 0);

    return;
  }

  if (forceLampTime)
  {
    Serial.println("Light is off!");
    digitalWrite(LAMP_PIN, LOW);
    Utils::pushValue("/operation/light", 0);

    forceLampTime = false;
  }

  if (temperature < 37.8)
  {
    Serial.println("Light is on!");
    digitalWrite(LAMP_PIN, HIGH);
    Utils::pushValue("/operation/light", 1);
  }
  else if (temperature > 39)
  {
    Serial.println("Light is off!");
    digitalWrite(LAMP_PIN, LOW);
    Utils::pushValue("/operation/light", 0);
  }
}

void handle_control_fan()
{
  if (millis() < fanTime)
  {
    if (fanCommand == "on")
    {
      Serial.println("Fan is on!");
      pinMode(FAN_PIN, INPUT);
      // digitalWrite(FAN_PIN, HIGH);
      Utils::pushValue("/operation/fan", 1);

      return;
    }

    Serial.println("Fan is off!");
    pinMode(FAN_PIN, OUTPUT);
    // digitalWrite(FAN_PIN, LOW);
    Utils::pushValue("/operation/fan", 0);

    return;
  }

  if (forceFanTime)
  {
    Serial.println("Fan is off!");
    pinMode(FAN_PIN, OUTPUT);
    // digitalWrite(FAN_PIN, LOW);
    Utils::pushValue("/operation/fan", 0);

    forceFanTime = false;
  }

  if (humidity > 65)
  {
    Serial.println("Fan is on!");
    pinMode(FAN_PIN, INPUT);
    // digitalWrite(FAN_PIN, HIGH);
    Utils::pushValue("/operation/fan", 1);
  }
  else if (temperature < 50)
  {
    Serial.println("Fan is off!");
    pinMode(FAN_PIN, OUTPUT);
    // digitalWrite(FAN_PIN, LOW);
    Utils::pushValue("/operation/fan", 0);
  }
}

void handle_control_scroll()
{
  if (millis() < scrollTime)
  {
    Serial.println("Running scroll");
    digitalWrite(MOTOR_PIN, HIGH);
    return;
  }
  Serial.println("Stop scroll");
  digitalWrite(MOTOR_PIN, LOW);
}

void loop()
{
  unsigned long currentMillis = millis();

  if (currentMillis - lastExecutedSensors >= READ_SENSORS)
  {
    lastExecutedSensors = currentMillis;
    handle_read_sensors();
  }

  if (currentMillis - lastExecutedCommand >= EXECUTE_COMMAND)
  {
    lastExecutedCommand = currentMillis;
    handle_execute_command();
  }

  if (currentMillis - lastExecutedDevice >= CONTROL_DEVICE)
  {
    lastExecutedDevice = currentMillis;

    handle_control_lamp();
    handle_control_fan();
    handle_control_scroll();
  }

  if (currentMillis - lastExecutedScroll >= PERFORM_SCROLL)
  {
    lastExecutedScroll = currentMillis;
    handle_perform_scroll();
  }
}
