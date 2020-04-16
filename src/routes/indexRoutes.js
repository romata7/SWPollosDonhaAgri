const express = require('express');
const router = express.Router();
const producto = require('../controllers/producto');
const home = require('../controllers/home');
const key = require('../keys');
const mysql = require('mysql');
const resumen = require('../controllers/resumen');
const egreso = require('../controllers/egreso');
const topventa = require('../controllers/topventa');

const conn = mysql.createConnection(key);

router.get('/producto', producto.list);
router.post('/producto/save', producto.save);
router.post('/producto/del/:id', producto.delete);
router.post('/producto/edit/:id', producto.edit);

router.get('/', home.listar);
router.post('/recibo', home.recibo);
router.post('/comanda/save', home.save);
router.get('/comanda/del/:id_coma', home.delete);
router.get('/detalle/:id_coma', home.detalle);

router.get('/resumen', resumen.listar);
router.post('/resumen/buscar', resumen.listarPost);

router.get('/egreso', egreso.listar);
router.post('/egreso/save', egreso.save);
router.get('/egreso/del/:id_egre', egreso.delete);
router.post('/egreso/edit/:id_egre', egreso.edit);

router.get('/topventas', topventa.listar)
router.post('/topventas/buscar', topventa.listarPost)

router.get(/Hermitcrab.gif/, (req, res) => {
    res.send('/img/Hermitcrab.gif');
})

router.all('/*', (req, res) => {
    res.redirect('/');
})

module.exports = router;