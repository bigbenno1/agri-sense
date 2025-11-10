/*********
  Rui Santos
  Complete project details at http://randomnerdtutorials.com  
  Based on the Dallas Temperature Library example
*********/

#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <BH1750.h>

// Data wire is conntec to the Arduino digital pin 4
#define ONE_WIRE_BUS 4

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

void setup(void)
{
  // Start serial communication for debugging purposes
  Serial.begin(9600);
  // Start up the library
  sensors.begin();
  Wire.begin();
  lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE);
}

void loop(void){ 
  // Call different reading functions below here
  temperature();
  lightData();

  delay(250);
}

// Example function to read temperature
void temperature(void) {
  sensors.requestTemperatures(); 
  float farenheitTemp = sensors.getTempFByIndex(0);
  Serial.println(farenheitTemp);
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