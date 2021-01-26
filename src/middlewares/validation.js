const {body} = require ('express-validator');

module.exports = {
    validacion:[
        body('title')
            .notEmpty()
            .withMessage('Tenes que ponerle titulo')
            .bail()
            .isLength({min: 1, max:50})
            .withMessage('Máximo 50 caracteres'),
        body('rating')
            .notEmpty()
            .withMessage('Tenés que poner el rating ')
            .bail()
            .isDecimal({min: 1, max:10})
            .withMessage('Rating minimo 1, máximo 10'),
        body('awards')
            .notEmpty()
            .withMessage('Los premios no pueden estar vacios')
            .bail()
            .isInt({min: 0})
            .withMessage('La cantidad minima de premios es 0'),
        body('release_date')
            .notEmpty()
            .withMessage('Por favor completá la fecha de estreno')
            .bail()
            .isDate({format : 'YYYY-MM-DD'})
            .withMessage('La fecha tiene que ser año, mes y dia'),
        body('length')
            .notEmpty()
            .withMessage('Por favor completá cuanto dura la película')
            .bail()
            .isFloat({min:0})
            .withMessage('La duración debe ser un número'),
        body('genre_id')
            .isLength({min:1})
            .withMessage('Seleccioná un genero'),
        body('actores')
            .isLength({min:1})
            .withMessage('Seleccioná un actor')
    ]

}