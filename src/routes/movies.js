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
router.post('/search', moviesController.search);

//____ Sigo con create_____//
router.get('/create',moviesController.create);
router.post('/create', moviesController.store);

//____ Sigo con  update_____//
router.get('/update/:id', moviesController.update); //---modificar
router.post('/update/:id', moviesController.change);

//____ Sigo con  borrar//

router.post('/delete/:id', moviesController.delete);



module.exports = router