var express = require('express');
var router = express.Router();
var validation = require('../middlewares/validation');


const moviesController = require('../controllers/moviesController')


router.get('/', moviesController.all);
router.get('/detail/:id', moviesController.detail);
router.get('/new', moviesController.newMovie);
router.get('/recommended',moviesController.recommended);
router.post('/search', moviesController.search);

//____ Create_____//
router.get('/create',moviesController.create);
router.post('/create', validation.validacion, moviesController.store);

//____ Modificar Pelicula - Update _____//
router.get('/update/:id', moviesController.update); //---modificar
router.post('/update/:id', validation.validacion, moviesController.change);

//____ Sigo con  borrar//

router.post('/delete/:id', moviesController.delete);



module.exports = router