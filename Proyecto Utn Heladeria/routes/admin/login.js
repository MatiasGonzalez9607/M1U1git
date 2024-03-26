var express = require('express');
var router = express.Router();
var usuariosModels = require('./../../models/usuariosModel');

router.get('/', function(req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

router.get('/logout', function(req,res,next){
    req.session.destroy();
    res.render('admin/login',{
        layout: 'admin/layout'
    });
});

router.post('/', async(req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;

        var data = await usuariosModels.getUserAndPassword(usuario, password);

        if (data != undefined) {
            req.session.id_usuario = data.id; //id --> nombre de la columna base de datos
            req.session.nombre = data.usuario;
            req.session.save(() => {
                res.redirect('/admin/sabores');
            });
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/login', {
            layout: 'admin/layout',
            error: true
        });
    }
});

module.exports = router;
