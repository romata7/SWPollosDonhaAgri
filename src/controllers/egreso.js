const mysql = require('mysql');
const key = require('../keys');

const conn = mysql.createConnection(key);

const egreso = {};

egreso.listar = (req, res) => {
    conn.query('SELECT * FROM tegreso', [], (err, egresos) => {
        if (err) console.log(err);
        res.render('egreso', {
            egresos: egresos,
        });
    })
}

egreso.save = (req, res) => {
    conn.query('INSERT INTO tegreso SET ?', [req.body], (err, result) => {
        if (err) console.log(err);
        res.redirect('/egreso');
    })
}

egreso.delete = (req, res) => {
    conn.query('DELETE FROM tegreso WHERE id_egre = ?', [req.params.id_egre], (err, result) => {
        if (err) console.log(err);
        res.redirect('/egreso');
    })
}
egreso.edit = (req, res) => {
    conn.query('UPDATE  tegreso SET ? WHERE id_egre = ?', [req.body, req.params.id_egre], (err, result) => {
        if (err) console.log(err);
        res.redirect('/egreso');
    })
}

module.exports = egreso;