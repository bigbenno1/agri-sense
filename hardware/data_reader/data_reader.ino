#include <Wire.h>
#include <BH1750.h>

BH1750 lightMeter;

void setup(void)
{
  // Start serial communication for debugging purposes
  Serial.begin(9600);
  Wire.begin();
  lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE);
}

void loop(void)
{ 
  // Call different reading functions below here
  lightData();

  delay(250);
}

// Function to read and print light data
void lightData(void)
{
  float lux = lightMeter.readLightLevel();

  Serial.print("Light level | Pin: A4/A5 | Units: PPFD | Value: ");
  Serial.println(luxToPPFD(lux));
}

// Function to convert lux to PPFD
float luxToPPFD(float lux)
{
  float kConversionFactor = 0.0185;
  return lux * kConversionFactor;
}








//update water temp
#include <OneWire.h>
#include <DallasTemperature.h>

// Data wire is connected to the Arduino digital pin 4
#define ONE_WIRE_BUS 4

// Setup a OneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass our OneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

void setup(void)
{
  // Start serial communication for debugging purposes
  Serial.begin(9600);

  // Start up the library
  sensors.begin();
}

void loop(void)
{ 
  // Call different reading functions below here
  temperature();

  delay(250);
}

// Example function to read temperature
void temperature(void)
{
  // Request temperature readings from the sensor 
  sensors.requestTemperatures(); 

  float fahrenheitTemp = sensors.getTempFByIndex(0);
  float celsiusTemp   = sensors.getTempCByIndex(0);

  // Print the temperature readings
  Serial.println("Water Temperature | Pin: 4 | Units: Fahrenheit AND Celsius");

  Serial.print("Data: ");
  Serial.print(fahrenheitTemp, 2);
  Serial.print(" °F / ");
  Serial.print(celsiusTemp, 2);
  Serial.println(" °C");

  // Separate data with em dash
  Serial.println("—");
}







