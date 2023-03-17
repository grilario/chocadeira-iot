
#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <Stepper.h>
#include <DHT.h>

#include "utils.h"

#define LAMP_PIN 16
#define FAN_PIN 5
#define DHT_PIN 15

float temperature;
float humidity;

#define STEPPER_PIN_1 D0
#define STEPPER_PIN_2 D1
#define STEPPER_PIN_3 D2
#define STEPPER_PIN_4 D3

const int stepsPerRevolution = 2038;

Stepper stepper(stepsPerRevolution, STEPPER_PIN_1, STEPPER_PIN_2, STEPPER_PIN_3, STEPPER_PIN_4);

#define DHT_TYPE DHT22
DHT dht(DHT_PIN, DHT_TYPE);

void setup()
{
  Serial.begin(9600);

  // Utils::setupWiFi();
  // Utils::setupFirebase();
  // Utils::setupTime();

  dht.begin();

  // pinMode(LAMP_PIN, OUTPUT);
  // pinMode(FAN_PIN, OUTPUT);

  stepper.setSpeed(1);
}

#define READ_SENSORS 2000
unsigned long lastExecutedSensors = 0;

#define EXECUTE_COMMAND 2000
unsigned long lastExecutedCommand = 0;

#define PERFORM_SCROLL 2000
unsigned long lastExecutedScroll = 0;

// lampTime set: current time + time running
unsigned long lampTime = 0;
unsigned long fanTime = 0;
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
  int lamp = Utils::getCommandTime(Command::Lamp);
  int fan = Utils::getCommandTime(Command::Fan);

  if (lamp > 0)
  {
    lampTime = millis() + lamp;
    forceLampTime = true;
    Utils::clearCommandTime(Command::Lamp);
  }

  if (fan > 0)
  {
    fanTime = millis() + fan;
    forceFanTime = true;
    Utils::clearCommandTime(Command::Fan);
  }
}

// read the firebase compare date including time esp delay
void handle_perform_scroll()
{
  FirebaseJsonArray array = Utils::getArray("/operation/scroll");
  FirebaseJsonData result;

  for (size_t i = 0; i < array.size(); i++) {
    array.get(result, i);

    long long time = result.to<long long>();

    if (time >= millis() && time + 3000 <= millis()) {

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

  if(temperature < 32) {
    digitalWrite(LAMP_PIN, HIGH);
  } else if (temperature > 38) {
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

  if(temperature > 65) {
    digitalWrite(LAMP_PIN, HIGH);
  } else if (temperature < 50) {
    digitalWrite(LAMP_PIN, LOW);
  }
}

void loop()
{
  // unsigned long currentMillis = millis();

  // stepper.step(stepsPerRevolution);
  digitalWrite(D0, HIGH);
  digitalWrite(D1, HIGH);
  digitalWrite(D2, HIGH);
  digitalWrite(D3, HIGH);
  // delay(10000);
  // digitalWrite(D0, LOW);
  // delay(10000);

  // if (currentMillis - lastExecutedSensors >= READ_SENSORS)
  // {
  //   lastExecutedSensors = currentMillis;
  //   handle_read_sensors();
  // }

  // if (currentMillis - lastExecutedCommand >= EXECUTE_COMMAND)
  // {
  //   lastExecutedCommand = currentMillis;
  //   handle_execute_command();
  // }

  // if (currentMillis - lastExecutedScroll >= PERFORM_SCROLL)
  // {
  //   lastExecutedScroll = currentMillis;
  //   handle_perform_scroll();
  // }
}
