#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,20,4);

void setup() {                 // initialize the lcd 
  lcd.init();
  lcd.backlight();
  
  
  
}

void loop() {
 // lcd.setCursor(0,0);
  // lcd.print("0123456789012345");
  lcd.setCursor(0,0);
  lcd.print("Temp:20C Hmd:32%");
  lcd.setCursor(0,1);
  lcd.print("CDS:100 Dst:20");
 
}
