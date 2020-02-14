const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const alert = require('./view/alertMsg');
const template = require('./view/template');
const wm = require('./weather-module');

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
    wm.getWeather(function(weather){
        let navBar = template.navBar(true,weather, req.session.userName);
        let menuLink = template.menuLink(0);
        let view = require('./view/home');
        let html = view.home(navBar, menuLink);
        res.send(html);
    });
});
app.use('/user', userRouter);

app.get('/index', function(req, res) {
    res.redirect('/');
});

app.get('*', function(req, res) {
    res.status(404).send('File not found');
});
app.listen(3000);