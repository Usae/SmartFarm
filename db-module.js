const sqlite3 = require('sqlite3').verbose(); 

module.exports = {
    getAllDepts: function(callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `SELECT * FROM dept`;
        db.all(sql, function(err, rows) {
            if (err) {
                console.error('getAllDepts DB 오류', err);
                return;
            }
            callback(rows);
        });
        db.close();
    },
    getDept: function(did, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `SELECT * FROM dept where did=?`;
        let stmt = db.prepare(sql);
        stmt.get(did, function(err, row) {
            if (err) {
                console.error('getDept DB 오류', err);
                return;
            }
            callback(row);
        });
        stmt.finalize();
        db.close();
    },
    getAllUsers: function(callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `SELECT l.uid, l.name, r.name deptName, l.tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user l join dept r on l.deptId = r.did`;
        db.all(sql, function(err, rows) {
            if (err) {
                console.error('getAllUsers DB 오류', err);
                return;
            }
            callback(rows);
        });
        db.close();
    },
    getUserInfo: function(uid, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        //let sql = `SELECT l.uid, l.name, r.name deptName, l.tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user l join dept r on l.deptId = r.did where uid=?`;
        let sql = `SELECT * FROM user WHERE uid=?`;
        let stmt = db.prepare(sql);
        stmt.get(uid, function(err, row) {
            if (err) {
                console.error('getUserInfo DB 오류', err);
                return;
            }
            callback(row);
        });
        stmt.finalize();
        db.close();
    },
    registerUser: function(uid, password, name, deptId, tel, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `INSERT INTO user(uid, password, name, deptId, tel) values (?,?,?,?,?)`;
        let stmt = db.prepare(sql);
        stmt.run(uid, password, name, deptId, tel, function(err) {
            if (err) {
                console.error('registerUser DB 오류', err);
                return;
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    updateUser: function(uid, name, deptId, tel, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `UPDATE user SET name=?, deptId=?, tel=? WHERE uid=?`;
        let stmt = db.prepare(sql);
        stmt.run(name, deptId, tel, uid, function(err) {
            if (err) {
                console.error('updateUser DB 오류', err);
                return;
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    deleteUser: function(uid, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `DELETE FROM user SET WHERE uid=?`;
        let stmt = db.prepare(sql);
        stmt.run(name, deptId, tel, uid, function(err) {
            if (err) {
                console.error('deleteUser DB 오류', err);
                return;
            }
            callback();
        });
        stmt.finalize();
        db.close();
    }
}