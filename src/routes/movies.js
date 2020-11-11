var express = require('express');
var router = express.Router();

//------declaro moviesController PASO 1 //
const moviesController = require('../controllers/moviesController')

//------PASO 2 ARMO EL ROUTER Y DE AQUI ME VOY AL CONTROLADOR //

router.get('/', moviesController.all);
router.get('/detail/:id', moviesController.detail);
router.get('/new', moviesController.newMovie);
router.get('/recommended',moviesController.recommended);
router.get('/search', moviesController.searchView);
//router.get('/search', moviesController.search);//
router.post('/search', moviesController.search);

module.exports = router