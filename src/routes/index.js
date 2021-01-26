var express = require('express');
var router = express.Router();

//------declaro moviesController PASO 1 //


const actorsController =require ('../controllers/actorsControllers')
const genresController = require('../controllers/genresController')
const indexController=require('../controllers/indexController')
/* GET home page. es lo que viene por default
  res.render('index', { title: 'Express' });
}); */


//------PASO 2 ARMO EL ROUTER Y DE AQUI ME VOY AL CONTROLADOR //
router.get('/', indexController.index);
router.get('/actors/:id', actorsController.all);
router.get('/genres/:id', genresController.all);



module.exports = router;
