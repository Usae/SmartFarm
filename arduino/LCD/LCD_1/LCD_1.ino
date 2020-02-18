#include "DHT.h"
#define DHT_PIN   8
#define ECHO_PIN  10
#define TRIG_PIN  11
#define CDS_PIN   A0

DHT dht(DHT_PIN, DHT11);
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,16,2);  

void setup() {
  // put your setup code here, to run once:
    Serial.begin(115200);
  // initialize the LCD
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(CDS_PIN, INPUT);
  
  lcd.init();
  // Turn on the blacklight and print a message.
  lcd.backlight();
  dht.begin();
  delay(2000);
}

void loop() {
  // put your main code here, to run repeatedly:
  byte temperature = 0;
  byte humidity = 0;
  
 
  humidity= dht.readHumidity();
  temperature= dht.readTemperature();
  int cds = analogRead(CDS_PIN);
  int dis = ultraSonic();
  
  lcd.setCursor(0,0);
  lcd.print("TMP=");
  lcd.print(temperature);
  lcd.print("C");
  lcd.setCursor(8,0);
  lcd.print("HUM=");
  lcd.print(humidity);
  lcd.print("%");
  lcd.setCursor(0,1);
  lcd.print("cds=");
  lcd.print(cds);
  lcd.setCursor(8,1);
  lcd.print("dis=");
  lcd.print(dis);
  
  // DHT11 sampling rate is 1HZ.
  delay(1500);
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
