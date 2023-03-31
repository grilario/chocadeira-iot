#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>

#include "utils.h"

#define LAMP_PIN D1
#define MOTOR_PIN D2
#define FAN_PIN D4
#define DHT_PIN D3

float temperature;
float humidity;

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
  pinMode(MOTOR_PIN, OUTPUT);
}

#define READ_SENSORS 2000
unsigned long lastExecutedSensors = 0;

#define CONTROL_DEVICE 2000
unsigned long lastExecutedDevice = 0;

#define EXECUTE_COMMAND 2000
unsigned long lastExecutedCommand = 0;

#define PERFORM_SCROLL 2000
unsigned long lastExecutedScroll = 0;

// lampTime set: current time + time running
unsigned long lampTime = 0;
unsigned long fanTime = 0;
String lampCommand;
String fanCommand;
bool forceLampTime = false;
bool forceFanTime = false;

// read sensors with hdt-11 and upload to firebase
void handle_read_sensors()
{
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity))
  {
    return;
  }

  Serial.printf("\nTemperature %f", temperature);
  Serial.printf("\nHumidity %f", humidity);

  Utils::pushValue("/operation/temperature", temperature);
  Utils::pushValue("/operation/humidity", humidity);
}

// read the firebase check if exist command and run, clear firebase
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

// read the firebase compare date including time esp delay
void handle_perform_scroll()
{
  FirebaseJsonArray array = Utils::getArray("/operation/scroll");
  FirebaseJsonData result;

  for (size_t i = 0; i < array.size(); i++)
  {
    array.get(result, i);

    String time = result.to<String>();

    // Serial.print("Time: ");
    // Serial.println(time);

    if (time == Utils::getFormattedTime().substring(0, 5))
    {
      Serial.printf("Scroll");
      // SCROLL
    }
  }
}

// check if current millis is smaller what time of the lamp, if true lamp on, if false lamp off
void handle_control_lamp()
{
  if (millis() < lampTime)
  {
    digitalWrite(LAMP_PIN, HIGH);

    return;
  }

  if (forceLampTime)
  {
    digitalWrite(LAMP_PIN, LOW);

    forceLampTime = false;
  }

  if (temperature < 32)
  {
    digitalWrite(LAMP_PIN, HIGH);
  }
  else if (temperature > 38)
  {
    digitalWrite(LAMP_PIN, LOW);
  }
}

// check if current millis is smaller what time of the fan, if true lamp on, if false fan off
void handle_control_fan()
{
  if (millis() < fanTime)
  {
    digitalWrite(FAN_PIN, HIGH);

    return;
  }

  if (forceFanTime)
  {
    digitalWrite(FAN_PIN, LOW);

    forceFanTime = false;
  }

  if (temperature > 65)
  {
    digitalWrite(LAMP_PIN, HIGH);
  }
  else if (temperature < 50)
  {
    digitalWrite(LAMP_PIN, LOW);
  }
}

bool isScrolling = false;

void loop()
{
  unsigned long currentMillis = millis();

  // if (currentMillis - lastExecutedSensors >= READ_SENSORS)
  // {
  //   lastExecutedSensors = currentMillis;
  //   handle_read_sensors();
  // }

  if (currentMillis - lastExecutedCommand >= EXECUTE_COMMAND)
  {
    lastExecutedCommand = currentMillis;
    handle_execute_command();
  }

  // if (currentMillis - lastExecutedDevice >= CONTROL_DEVICE)
  // {
  //   lastExecutedDevice = currentMillis;

  //   handle_control_lamp();
  //   handle_control_fan();
  // }

  // if (currentMillis - lastExecutedScroll >= PERFORM_SCROLL)
  // {
  //   lastExecutedScroll = currentMillis;
  //   handle_perform_scroll();
  // }

  //   if (isScrolling)
  //   {
  //     digitalWrite(MOTOR_PIN, LOW);
  //   }
  //   else
  //   {
  //     digitalWrite(MOTOR_PIN, HIGH);
  //   }

  //   isScrolling = !isScrolling;
  // }
}
