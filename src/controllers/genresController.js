//---Primero traemos al modelo que queremos usar___Se escribe en singular y con MAyuscula//
const {Genre, Movie} = require('../database/models')


module.exports = {
   all: async(req, res) =>{
      try {
         let genre = await Genre.findByPk(req.params.id,{include:['Movie']});
         let movies = await Movie.findAll();
         res.render('genresList', {genre, movies})
         
      }  catch(error) {
         console.log(error);
      }   
   }
}