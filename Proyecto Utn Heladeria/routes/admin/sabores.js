var express= require('express');
var router= express.Router();
var saboresModel= require('./../../models/saboresModel');
var util= require('util');
var cloudinary= require('cloudinary').v2;
const uploader= util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

router.get('/', async function(req,res,next){
    
    var sabores 
    if(req.query.q === undefined){
        sabores= await saboresModel.getsabores();
    }else
        sabores= await saboresModel.buscarsabores(req.query.q);
    
    sabores = sabores.map(sabor=>{
        if(sabor.img_id){
            const imagen= cloudinary.image(sabor.img_id,{
                width: 50,
                height: 50,
                crop: 'fill'
            });
            return{
                ...sabor,
                imagen
            }
        }else{
            return{
                ...sabor,
                imagen: ''
            }
        }
    } )
    
    res.render('admin/sabores',{
    layout:'admin/layout',  
    usuario: req.session.nombre,
    sabores,
    is_search: req.query.q !==undefined,
    q: req.query.q 
    });
});

router.get('/eliminar/:id', async(req,res,next)=>{
    var id= req.params.id;
    
    let sabor= await saboresModel.getsaboresById(id);
    if(sabor.img_id){
        
        await (destroy(sabor.img_id));
    }
    
    await saboresModel.deletesaboresById(id);
    res.redirect('/admin/sabores')
})

router.get('/agregar', (req,res,next)=>{
    res.render('admin/agregar', {
        layout: 'admin/layout'
    })
})

router.post('/agregar', async (req, res, next) => {
    try {
        var img_id = '';

        if (req.files && req.files.imagen && Object.keys(req.files).length > 0) {
            const imagen = req.files.imagen; 
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.Sabor != "" && req.body.Gustos != "") {
            await saboresModel.insertsabores({
                ...req.body,
                img_id
            });
            res.redirect('/admin/sabores');
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'todos los campos son requeridos'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó el nuevo sabor'
        });
    }
});



router.get('/modificar/:id', async (req, res, next)=> {
    var id= req.params.id;
    var sabores = await saboresModel.getsaboresById(id);
    
    res.render('admin/modificar',{
    layout:'admin/layout',
    sabores
    
    });
    });

router.post('/modificar', async(req,res,next)=>{
    try{ 
        let img_id= req.body.img_original
        let borrar_img_vieja= false;
        if(req.body.img_delete === "1"){
            img_id= null;
            borrar_img_vieja=true;
        } else {
            if(req.files && Object.keys(req.files).length>0){
                imagen= req.files.imagen;
                img_id= (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja= true
            }
        } if(borrar_img_vieja && req.body.img_original){
            await(destroy(req.body.img_original));
        }
        
        
        
        let obj={
            Sabor: req.body.Sabor,
            Gustos: req.body.Gustos,
            img_id
        }

        await saboresModel.modificarsaboresById(obj,req.body.id );
        res.redirect('/admin/sabores')
    }catch (error){
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true, message: 'error al modificar el sabor'
        })
    }
})

module.exports = router;