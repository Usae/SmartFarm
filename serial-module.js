const serialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const sp = new serialPort("COM6",{        //dev/ttyACM0
   baudRate: 115200,
   autoOpen: false
   
});
const spp =sp.pipe(new Readline()); // Serial port parser

module.exports = {
    readSensor: function(callback){
    var readyFlag = true;
    sp.open(function(){
        console.log('Serial Port OPEN');
        spp.on("error",function(error){
             console.log("Error :",error.message);
    });
    spp.on('data', function(data){
        if(data.indexOf('Ready') == 0){
            console.log(data);
            if(readyFlag){
                 sp.write('GET\n', function(err){
                    console.log('Write GET');
                     if(err){
                        console.log('Write error:',err);
                     }
                    readyFlag = false;
                }); 
             }
          } else{
            console.log(data);
            var result = JSON.parse(data);
            console.log(result);
            callback(result); 
            sp.close();
        }   
    });
});
    },
    wirteActuator: function(jsonData, callback){
        let message = `PUT ${jsonData}\n`
        sp.open(function(){
            console.log('Serial Port OPEN');
            spp.on("error",function(error){
                console.log("Error :",error.message);
            });
            spp.on('data', function(data){
                if(data.indexOf('Ready') ==0){
                    console.log(data);
                    sp.write(message, function(err){
                        console.log('Write "PUT"');
                        if(err){
                        console.log('Write error:',err);
                        }
                        callback();
                        sp.close();
                    }); 
                } 
            });
        });
    }
}