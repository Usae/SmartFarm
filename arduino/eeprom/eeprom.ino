  
#include <EEPROM.h>

int randomNumber;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println("Writing data into EEPROM...");
  for (int i=128; i<192; i++) {
    randomNumber = random(256);
    EEPROM.write(i, randomNumber);
    //delay(100);
  }
  Serial.println();
  Serial.println("Reading data from EEPROM...");
  for (int i=128; i<192; i++) {
    randomNumber = EEPROM.read(i);
    Serial.println("EEPROM Address : " + String(i) + "\t Value : " + randomNumber);
    //delay(100);
  }

  while(true);
}
