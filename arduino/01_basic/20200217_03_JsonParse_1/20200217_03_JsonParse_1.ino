#include "DHT.h"
#include <ArduinoJson.h>

#define LED_PIN   13
#define RED_LED   3
#define GREEN_LED 6
#define BLUE_LED  5
#define RELAY_PIN 4
#define DHT_PIN   8
#define ECHO_PIN  10
#define TRIG_PIN  11
#define CDS_PIN   A0

void blinkLED(int);   // blinkled SIGNATURE
float ultraSonic();   // signature, 함수명 리턴타입, 매개변수 타입
DHT dht(DHT_PIN, DHT11);  // Adafruit sensor library
StaticJsonDocument<80> doc;
StaticJsonDocument<80> pDoc;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  
  pinMode(LED_PIN, OUTPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(CDS_PIN, INPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  dht.begin();
  delay(3000);
}

void loop() {
  char buf[80];
  byte len;
  digitalWrite(LED_PIN, HIGH);

  if (Serial.available() > 0){
    len = Serial.readBytes(buf,80);
    buf[len-1] =0;
    Serial.println(buf);
    DeserializationError error = deserializeJson(pDoc, buf);
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.c_str());
      blinkLED(100);
    }
    int red = pDoc["red"];
    int green = pDoc["green"];
    int blue = pDoc["blue"];
    int relay = pDoc["relay"];
    float humidity= dht.readHumidity();
    float temperature= dht.readTemperature();
    float distance=ultraSonic();
    int cds= analogRead(CDS_PIN);
    doc["humidity"]=humidity;
    doc["temperature"]=temperature;
    doc["distance"]=distance;
    doc["cds"]=cds;
    analogWrite(RED_LED, red);
    analogWrite(GREEN_LED, green);
    analogWrite(BLUE_LED, blue);
    digitalWrite(RELAY_PIN, relay);
    serializeJson(doc,Serial);
    Serial.println("\n");
  }
//  serializeJson(doc, Serial);
//  Serial.println("\n");
  delay(1000);
}

void blinkLED(int interval) {
  for (int i=0; i<10; i++) {
    digitalWrite(LED_PIN, digitalRead(LED_PIN)^1);
    delay(interval);
  }
}
float ultraSonic() {
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  unsigned long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = ((float)(340 * duration) / 10000) / 2;
  //return (float)pulseIn(ECHO_PIN, HIGH) / 58;
  return distance;
}
