const express = require('express');
const dbModule = require('./db-module');
const alert = require('./view/alertMsg');

const router = express.Router();
router.get('/list', function(req, res) {
    dbModule.getAllUsers(function(rows) {
        let view = require('./view/listUser');
        let html = view.listUser(rows);
        //console.log(rows);
        res.send(html);
    });
});
router.get('/register', function(req, res) {
    dbModule.getAllDepts(function(rows) {
        let view = require('./view/registerUser');
        let html = view.registerUser(rows);
        //console.log(rows);
        res.send(html);
    });
});
router.post('/register', function(req, res) {
    let uid = req.body.uid;
    let pswd = req.body.pswd;
    let pswd2 = req.body.pswd2;
    let name = req.body.name;
    let deptId = parseInt(req.body.dept);
    let tel = req.body.tel;
    //console.log(uid, pswd, pswd2, deptId, tel);
    dbModule.getUserInfo(uid, function(row) {
        //console.log(row);
        if (row === undefined) {
            if (pswd.length < 4) {
                let html = alert.alertMsg('패스워드 길이가 너무 작습니다.', '/user/register');
                res.send(html);
            } else if (pswd === pswd2) {
                dbModule.registerUser(uid, pswd, name, deptId, tel, function() {
                    res.redirect('/user/list');
                });
            } else {
                let html = alert.alertMsg('패스워드가 일치하지 않습니다.', '/user/register');
                res.send(html);
            }
        } else {
            let html = alert.alertMsg(`${uid} 아이디가 중복입니다.`, '/user/register');
            res.send(html);
        }
    });
});
router.get('/update/uid/:uid', function(req, res) {
    let uid = req.params.uid;
    dbModule.getAllDepts(function(depts) {
        dbModule.getUserInfo(uid, function(user) {
            console.log(user);
            let view = require('./view/updateUser');
            let html = view.updateUser(depts, user);  // depts, user
            res.send(html);
        });
    });
});
router.post('/update', function(req, res) {
    let uid = req.body.uid;
    let name = req.body.name;
    let deptId = parseInt(req.body.dept);
    let tel = req.body.tel;
    dbModule.updateUser(uid, name, deptId, tel, function() {
        res.redirect('/user/list');
    });
});
router.get('/password/uid/:uid', function(req, res) {
    res.send('password');
});
router.get('/delete/uid/:uid', function(req, res) {
    let uid = req.params.uid;
    let view = require('./view/deleteUser');
    let html = view.deleteUser(uid); 
    res.send(html);
});
router.post('/delete', function(req, res) {
    let uid = req.body.uid;
    let name = req.body.name;
    let deptId = parseInt(req.body.dept);
    let tel = req.body.tel;
    dbModule.deleteUser(uid, function() {
        res.redirect('/user/list');
    });
});


module.exports = router;