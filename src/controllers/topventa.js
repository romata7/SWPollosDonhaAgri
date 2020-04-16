const mysql = require('mysql')
const key = require('../keys')

const conn = mysql.createConnection(key);

const topventa = {}


function getyyyymmdd(fecha) {
    var y = fecha.getFullYear()
    var m = fecha.getMonth() + 1
    if (m < 10) m = '0' + m
    var d = fecha.getDate()
    if (d < 10) d = '0' + d
    return [y, m, d].join('-')
}
topventa.listar = (req, res) => {
    var f1 = new Date()
    f1.setHours(0)
    f1.setMinutes(0)
    f1.setSeconds(0)
    var f2 = new Date()
    f2.setHours(23)
    f2.setMinutes(59)
    f2.setSeconds(59)
    conn.query('select D.producto , count(D.producto) as Unidades from tdetalle AS D, tcomanda AS C WHERE C.fecha between ? AND ? and C.id_coma = D.id_coma group by producto order by Unidades desc;', [f1.toLocaleString('Es-Pe'), f2.toLocaleString('Es-Pe')], (err, topventas) => {
        res.render('topventa', {
            topventas: topventas,
            f1: getyyyymmdd(f1),
            f2: getyyyymmdd(f2),
        })
    })
}

topventa.listarPost = (req, res) => {
    var f1 = req.body.fechaInicio + ' 00:00:00';
    var f2 = req.body.fechaFin + ' 23:59:59'
    conn.query('select D.producto , count(D.producto) as Unidades from tdetalle AS D, tcomanda AS C WHERE C.fecha between ? AND ? and C.id_coma = D.id_coma group by producto order by Unidades desc;', [f1, f2], (err, topventas) => {
        res.render('topventa', {
            topventas: topventas,
            f1: req.body.fechaInicio,
            f2: req.body.fechaFin,
        })
    })
}



module.exports = topventa