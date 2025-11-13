#include <Wire.h>
#include <BH1750.h>
#include "DHT.h"
#include <OneWire.h>
#include <DallasTemperature.h>

// Data wire is connected to the Arduino digital pin 4
#define ONE_WIRE_BUS 4

// Setup a OneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass our OneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

#define DHTPIN 2     // Digital pin connected to the DHT sensor (set to 2 for now)

#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);

BH1750 lightMeter;

void setup(void)
{
  // Start serial communication for debugging purposes
  Serial.begin(9600);
  Wire.begin();
  lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE);
  dht.begin();
  sensors.begin();
}

void loop(void)
{ 
  // Call different reading functions below here
  lightData();
  //ph();
  humidity();
  water_temperature();

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

void humidity(void)
{
  // Placeholder for humidity reading function

  // Sensor readings may also be up to 2 seconds

  float h = dht.readHumidity();

  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // CODE FOR HEAT INDEX IN CASE
  // Compute heat index in Fahrenheit (the default)
  //float hif = dht.computeHeatIndex(f, h);

  // Compute heat index in Celsius (isFahreheit = false)
  //float hic = dht.computeHeatIndex(t, h, false);

  Serial.println(F("Humidity: "));
  Serial.print(h);
  Serial.print(F(" %"));
  Serial.println("---");
  Serial.println(F("Air temperature: "));
  Serial.print(t);
  Serial.print(F(" °C / "));
  Serial.print(f);
  Serial.print(F(" °F"));
  Serial.println("---");

  //HEAT INDEX OUTPUT
  /*
  Serial.println(F("Heat index: "));
  Serial.print(hic);
  Serial.print(F(" °C / "));
  Serial.print(hif);
  Serial.print(F(" °F"));
  */
}

// Example function to read temperature
void water_temperature(void)
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