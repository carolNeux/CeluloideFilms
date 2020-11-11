var express = require('express');
var router = express.Router();

//------declaro moviesController PASO 1 //

const moviesController = require('../controllers/moviesController')
const actorsController =require ('../controllers/actorsControllers')
const episodesController = require('../controllers/episodesController')
const indexController=require('../controllers/indexController')
/* GET home page. es lo que viene por default
  res.render('index', { title: 'Express' });
}); */


//------PASO 2 ARMO EL ROUTER Y DE AQUI ME VOY AL CONTROLADOR //
router.get('/', indexController.index);
router.get('/movies', moviesController.all);
router.get('/actor', actorsController.all);
router.get('/episode', episodesController.all);

module.exports = router;
