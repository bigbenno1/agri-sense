#include "DHT.h"
#define DHTPIN 2     // Digital pin connected to the DHT sensor (set to 2 for now)

#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  Serial.println(F("Testing DHT sensor"));
  dht.begin();
}

void loop() {
  // frequency 0.25 seconds
  delay(250);

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