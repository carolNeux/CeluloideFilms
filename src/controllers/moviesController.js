//---Primero traemos al modelo que queremos usar___Se escribe en singular y con MAyuscula//
const db= require('../dataBase/models');
const {Movie, Genre, Actor} = require('../database/models')
const{Op}=require('sequelize')
//const Op = require('sequelize')//


module.exports = {

     all: async(req, res) =>{
        try {
           const movies= await Movie.findAll({include:['Genre']});
           // res.json(movies); 
           
          res.render('moviesList',{movies})
         } catch(error) {
            console.log(error);
         }   
     },

 // Aqui comienza el metodo detail ---------////
     detail: async(req,res)=>{
    
        try {
           let movies = await Movie.findByPk(req.params.id)
           include:[{association:'Genre'},{association:'Actor'} ]
           res.render('movieDetail', {movies})
        } catch(error) {
         console.log(error);
      }   
           
   },

     //Aqui comienza el metodo newMovie ---------////
     newMovie: async(req,res)=>{
      try{ const movies = await Movie.findAll(
         { order:
         [
            ['release_date','DESC']
         ],
            limit:5,

         }
      )
       res.render('newMovie',{movies})
      } catch(error) {
       console.log(error);
    }   
   },

    //Aqui comienza el metodo recommended ---------////
   recommended: async(req,res)=>{
      try{ const movies = await Movie.findAll({
         where:{
            rating:{[Op.gt]:8}
         }
      })
       res.render('recommended',{movies})
      } catch(error) {
       console.log(error);
    }   
   },

      // Aqui comienza el metodo search  le mando un avista primero ---------////

      searchView:(req,res)=>{
                
        res.render('search')
      },
   
   
   // Ahora busco la peli ---------////

    // falta ordenar---------////
   search: async(req,res)=>{
      console.log(req.body)
      try{ const movies = await Movie.findAll({
         where:{
           title:{[Op.like]:'%'+req.body.title+'%'}
         },
         //falta poner codigo para ordenar //
      })
                
       res.render('searchFound',{movies})
      } catch(error) {
       console.log(error);
    }   
   },

/** Aqui comienza el TP 2 */

create: async(req,res)=>{
   try{    
  const generos = await Genre.findAll()
  const actores = await Actor.findAll()

   res.render('createMovie', {generos,actores});
      }catch(error) {
      console.log(error)
      }
},

store: async(req,res)=>{
 try{ let newMovie= await Movie.create(req.body)
   await newMovie.addActores(req.body.actores)

   res.redirect('/movie');
   }catch(error) {
   console.log(error)
   }  },
// no lo esta redireccionando, agrega la peli, pero no me muestra la pagina de lista de pelis
//pero si voy a movies la peli esta agregada

update: async(req,res)=>{
 
const movieId =req.params.id;
const toEdit = await Movie.findByPk(movieId,{include:['Genre','actores']});
const generos = await Genre.findAll()
const actores = await Actor.findAll()

//res.redirect('movieList' + req.params.id)
//quiero que me mande al detalle de la pelicula que modifique
res.render('updateMovie',{toEdit, generos, actores});
},


change: async(req,res)=>{   
 const movieId =req.params.id;
 const changedMovie = await Movie.findByPk(movieId,{include:['Genre','actores']})
 await changedMovie.removeActores(changedMovie.actores);
 await changedMovie.addActores(req.body.actores);
await changedMovie.update(req.body)

   res.redirect('/movies')
},

delete: async (req,res) => {
   try {
       const movieId = req.params.id;
       const toDelete = await Movie.findByPk(movieId,{include:['Genre','actores']});
       
       await toDelete.removeActores(toDelete.actores);
      await toDelete.destroy();
       res.redirect('/movies')
   } catch (error) {
       res.send('Oopss direccion equivocada');
       console.log(error)
   }
}

}

