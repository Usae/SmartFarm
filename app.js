const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
const userRouter = require('./userRouter');

app.use('/user', userRouter);
app.use(express.static(__dirname + '/public'));
app.use(favicon('favicon.ico'));

app.get('/', function(req, res) {
    res.send('app.js');
});
app.get('/index', function(req, res) {
    res.send('app.js');
});

app.get('*', function(req, res) {
    res.status(404).send('File not found');
});
app.listen(3000);