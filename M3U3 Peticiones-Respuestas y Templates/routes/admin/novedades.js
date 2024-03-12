var express= require('express');
var router= express.Router();
var novedadesModels= require('./../../models/novedadesModels');


router.get('/', async function(req,res,next){
    var novedades= await novedadesModels.getNovedades();
    res.render('admin/novedades',{
    layout:'admin/layout',  
    usuario: req.session.nombre, novedades  
    });
});

router.get('/eliminar/:id', async(req,res,next)=>{
    const id= req.params.id;

    await novedadesModels.deleteNovedadesById(id);
    res.redirect('/admin/novedades')
})


module.exports= router;