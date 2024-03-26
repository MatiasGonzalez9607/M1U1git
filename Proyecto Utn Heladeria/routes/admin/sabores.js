var express= require('express');
var router= express.Router();
var saboresModel= require('./../../models/saboresModel');

router.get('/', async function(req,res,next){
    
    var sabores= await saboresModel.getsabores();
    
    res.render('admin/sabores',{
    layout:'admin/layout',  
    usuario: req.session.nombre,
    sabores 
    });
})

router.get('/eliminar/:id', async(req,res,next)=>{
    const id= req.params.id;

    await saboresModel.deletesaboresById(id);
    res.redirect('/admin/sabores')
})

module.exports = router;