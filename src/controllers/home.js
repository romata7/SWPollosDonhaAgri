const mysql = require('mysql');
const key = require('../keys');

const conn = mysql.createConnection(key);

const home = {};

home.listar = (req, res) => {
    var f1 = new Date();
    f1.setHours(0);
    f1.setMinutes(0);
    f1.setSeconds(0);
    f1 = f1.toLocaleString("Es-Pe");

    conn.query('SELECT * FROM tproducto', [], (err, prods) => {
        conn.query('SELECT * FROM tcomanda', [], (err, comas) => {
            var id_coma = 0;
            if (comas.length == 0) {
                id_coma = 1;
            } else {
                id_coma = comas[comas.length - 1].id_coma + 1;
            }
            res.render('home', {
                prods: prods,
                id_coma: id_coma,
                comas: comas,
            });
        })
    })
}

home.recibo = (req, res) => {
    var datos = req.body;
    res.render('recibo', {
        datos: datos,
        detallado: JSON.parse(datos.detallado),
    });
}

home.save = (req, res) => {
    var data = req.body;
    //trata de datos
    var data_comanda = {
        id_coma: data.id_coma,
        user: data.user,
        fecha: new Date(data.fecha),
        total: data.total
    }

    conn.query('INSERT INTO tcomanda SET ?', [data_comanda], (err, result) => {
        if (err) console.log(err);

        var detallado = JSON.parse(data.detallado);

        var sql_first = 'INSERT INTO tdetalle SET ?';
        var sql_last = '; INSERT INTO tdetalle SET ?';
        var sql = "";
        for (let i = 0; i < detallado.length; i++) {
            if (i == 0) sql = sql + sql_first;
            else sql = sql + sql_last;
        }
        conn.query(sql, detallado, (err1, result) => {
            res.send('ok');
        })
    })

}

home.detalle = (req, res) => {
    var id_coma = req.params.id_coma;
    conn.query('SELECT * FROM tdetalle WHERE id_coma = ?', [id_coma], (err, detalles) => {
        if (err) console.log(err);
        res.render('detalle', {
            detalles: detalles,
        });
    })
}

home.delete = (req, res) => {
    var id_coma = req.params.id_coma;
    conn.query('DELETE FROM tcomanda WHERE id_coma = ?', [id_coma], (err, result) => {
        if (err) console.log(err)
        res.redirect('/');
    })
}

module.exports = home;