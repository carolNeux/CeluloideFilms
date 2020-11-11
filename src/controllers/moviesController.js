//---Primero traemos al modelo que queremos usar___Se escribe en singular y con MAyuscula//

const {Movie} = require('../database/models')
const{Op}=require('sequelize')
//const Op = require('sequelize')//


module.exports = {

     all: async(req, res) =>{
        try {
           const movies= await Movie.findAll()
           
           res.render('moviesList',{movies})
         } catch(error) {
            console.log(error);
         }   
     },

 // Aqui comienza el metodo detail ---------////
     detail: async(req,res)=>{
    
        try {
           let movies = await Movie.findByPk(req.params.id)
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
         }
      })
                
       res.render('searchFound',{movies})
      } catch(error) {
       console.log(error);
    }   
   }
}

/*si quiero seleccionar solo uno lo armo fon findOne de la siguiente manera
despues de:
const movieJson =await Movie.findOne({
 attributes:['title', 'length']
   where: {title:'Avatar'}   
})   */