const mysql = require('mysql');
const key = require('../keys');

const producto = {};
const conn = mysql.createConnection(key);

producto.list = (req, res) => {
    conn.query('SELECT * FROM tproducto', [], (err, prods) => {
        if (err) console.log(err);
        else res.render('producto', { prods });
    });
}
producto.save = (req, res) => {
    conn.query('INSERT INTO tproducto SET ?', [req.body], (err, result) => {
        res.redirect('/producto');
    })
}
producto.delete = (req, res) => {
    conn.query('DELETE FROM tproducto WHERE id = ?', [req.params.id], (err, result) => {
        res.redirect('/producto');
    })
}
producto.edit = (req, res) => {
    conn.query('UPDATE tproducto SET ? WHERE id = ?', [req.body, req.params.id], (err, result) => {
        if (err) console.log(err);
        res.redirect('/producto');
    })
}


module.exports = producto;