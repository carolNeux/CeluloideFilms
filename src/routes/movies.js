var express = require('express');
var router = express.Router();


const moviesController = require('../controllers/moviesController')


router.get('/', moviesController.all);
router.get('/detail/:id', moviesController.detail);
router.get('/new', moviesController.newMovie);
router.get('/recommended',moviesController.recommended);
router.post('/search', moviesController.search);

//____ Create_____//
router.get('/create',moviesController.create);
router.post('/create', moviesController.store);

//____ Update_____//
router.get('/update/:id', moviesController.update); //---modificar
router.post('/update/:id', moviesController.change);

//____ Sigo con  borrar//

router.post('/delete/:id', moviesController.delete);



module.exports = router