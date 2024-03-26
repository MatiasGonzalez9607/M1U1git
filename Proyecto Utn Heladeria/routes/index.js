var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer')
var saboresModel= require('../models/saboresModel')

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  var sabores= await saboresModel.getsabores();
  res.render('index', { 
    sabores
   });
});

router.post('/', async(req, res, next) => {

  console.log(req.body) //Estoy agarrando los datos ?
  
  var Nombre= req.body.Nombre; //LLamo a los datos 
  var Apellido= req.body.Apellido;
  var Email= req.body.Email;
  var Telefono= req.body.Tel;
  var Mensaje= req.body.Mensaje;


  var obj= {
    to: 'matutegon00@gmail.com',
    subject: 'Mensaje Recibido en Grana Helados',
    html: Nombre +" "+ Apellido + " se contacto desde la web y solicita informacion sobre precios a este correo: "+Email+". <br>  Ademas dejo asentado el siguiente mensaje: "+Mensaje+".<br> Su telefono de contacto es "+ Telefono
  }
  
  
  var transporter= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

  transporter.sendMail(obj, function(err, info) {
    if (err) {
      console.log(err);
      res.render('index', { message: 'Error al enviar el mensaje. Inténtalo de nuevo más tarde.' });
    } else {
      console.log(info);
      res.render('index', { message: '¡Mensaje enviado correctamente!' });
    }
  });
} )

module.exports = router;
