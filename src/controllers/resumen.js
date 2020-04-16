const mysql = require('mysql');
const key = require('../keys')

const conn = mysql.createConnection(key);

const resumen = {};

function getyyyymmdd(fecha) {
    var y = fecha.getFullYear()
    var m = fecha.getMonth() + 1
    if(m < 10) m = '0' + m
    var d = fecha.getDate()
    if(d < 10) d = '0' + d
    return [y,m,d].join('-')
}

resumen.listar = (req, res) => {
    var f1 = new Date();
    f1.setHours(0);
    f1.setMinutes(0);
    f1.setSeconds(0);
    var f2 = new Date();
    f2.setHours(23);
    f2.setMinutes(59);
    f2.setSeconds(59);

    conn.query('SELECT * FROM tegreso WHERE fecha BETWEEN ? AND ?', [f1.toLocaleString('Es-Pe'), f2.toLocaleString('Es-Pe')], (err1, egresos) => {
        if (err1) console.log(err1);
        conn.query('SELECT B.id_deta, B.id_coma, A.fecha, A.user, B.cant, B.producto, B.costo, B.total FROM tcomanda as A, tdetalle as B WHERE A.fecha BETWEEN ? AND ? and A.id_coma = B.id_coma', [f1.toLocaleString('Es-Pe'), f2.toLocaleString('Es-Pe')], (err, detalles) => {
            if (err) console.log(err);
            res.render('resumen', {
                detalles,
                egresos,
                f1: getyyyymmdd(f1),
                f2: getyyyymmdd(f2),
            });
        });
    });
}
resumen.listarPost = (req, res) => {
    var f1 = req.body.fechaInicio + ' 00:00:00';
    var f2 = req.body.fechaFin + ' 23:59:59'

    conn.query('SELECT * FROM tegreso WHERE fecha BETWEEN ? AND ?', [f1, f2], (err1, egresos) => {
        if (err1) console.log(err1);
        console.log(f1, f2)
        console.log(egresos)
        conn.query('SELECT B.id_deta, B.id_coma, A.fecha, A.user, B.cant, B.producto, B.costo, B.total FROM tcomanda as A, tdetalle as B WHERE A.fecha BETWEEN ? AND ? and A.id_coma = B.id_coma', [f1, f2], (err, detalles) => {
            if (err) console.log(err);
            console.log(detalles);
            res.render('resumen', {
                detalles,
                egresos,
                f1: req.body.fechaInicio,
                f2: req.body.fechaFin,
            });
        });
    });
}
module.exports = resumen;
