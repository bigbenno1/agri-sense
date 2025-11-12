#include <OneWire.h>
#include <DallasTemperature.h>

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
}

void loop(void){ 
  // Call different reading functions below here
  temperature();


  delay(250);
}

// Example function to read temperature
void temperature(void) {
  // Request temperature readings from the sensor and convert to farenheit
  sensors.requestTemperatures(); 
  float farenheitTemp = sensors.getTempFByIndex(0);

  // Print the temperature in farenheit to the Serial Monitor
  Serial.print("Farenheit Temperature: ");
  Serial.print(farenheitTemp, 2);
  Serial.println("}");
}