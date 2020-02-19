const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const alert = require('./view/alertMsg');
const template = require('./view/template');
const wm = require('./weather-module');
const dbModule = require('./db-module');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
const userRouter = require('./userRouter');

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));

app.get('/home', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        dbModule.getCurrentSensor(function(sensor){ 
            dbModule.getCurrentactuator(function(actuator){ 
                wm.getWeather(function(weather) {
                    let navBar = template.navBar(true, weather, req.session.userName);
                    let menuLink = template.menuLink(0);
                    let view = require('./view/home');
                    let html = view.home(navBar, menuLink, sensor, actuator);
                    res.send(html);
                });
            })
        })
    }
});

app.get('/sensor', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let uid = req.session.userId;
        // Arduino 측정값 구하기
        let temp = 23;
        let humid = 34;
        let cds = 70;
        let dist = 14.6;
        // DB에 등록하기
        dbModule.insertSensor(temp, humid, cds, dist, uid, function() {
            // 화면에 보여주기
            dbModule.getCurrentSensor(function(sensor) {
                wm.getWeather(function(weather) {
                    let navBar = template.navBar(false, weather, req.session.userName);
                    let menuLink = template.menuLink(1);
                    let view = require('./view/sensor');
                    let html = view.sensor(navBar, menuLink, sensor);
                    res.send(html);
                });
            });
        });
    }
});

app.get('/actuator', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        dbModule.getCurrentactuator(function(actuator) {
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(2);
                let view = require('./view/actuator');
                let html = view.actuator(navBar, menuLink, actuator );
                res.send(html);
            });
        });
    }
});


app.get('/weather', function(req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let view = require('./view/weather');
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(0);
            wm.weatherObj(function(result) {
                let html = view.weather(navBar, menuLink, result);
                res.send(html);
            });
        });
    }
});

app.use('/user', userRouter);

app.get('/index', function(req, res) {
    res.redirect('/');
});

app.get('*', function(req, res) {
    res.status(404).send('File not found');
});
app.listen(3000);