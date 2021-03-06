#define RELAY_PIN 4
#define CDS_PIN   A0

int relay = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(CDS_PIN, INPUT);
}


void loop() {
  // put your main code here, to run repeatedly:
  int val;
  char buf[4];
  byte len;
  
  val = analogRead(CDS_PIN);
  Serial.write(val);

  if(Serial.available() > 0){
    len=Serial.readBytes(buf,4);
    if(buf[0] == '0' && buf[1] == 'K'){
      relay ^=1; // relay값을 1과 0으로 toggle
      digitalWrite(RELAY_PIN , relay);
    }
  }
  
  delay(1000);
}
