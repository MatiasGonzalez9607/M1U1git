var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async(req, res, next) => {

  console.log(req.body) //Estoy agarrando los datos ?
  
  var Nombre= req.body.Nombre //LLamo a los datos 
  var Apellido= req.body.Apellido
  var Email= req.body.Email
  var Telefono= req.body.Tel
  var Mensaje= req.body.Mensaje


  var obj= {
    to: 'matutegon00@gmail.com',
    subject: 'Contacto desde cerveceria X',
    html: Nombre+" "+Apellido+"se contacto desde la web y quiere mas info a este correo: "+Email+". <br> ademas hizo el siguiente comentario: "+Mensaje+".<br> su tel es "+ Telefono
  }
  
  
  var transporter= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: procces.env.SMTP_PORT,
    auth: {
      user: procces.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });
  
  
  res.render('index',{
  message: 'Mensaje enviado correctamente !',  
  })


} )



module.exports = router;
