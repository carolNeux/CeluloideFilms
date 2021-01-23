const db= require('../dataBase/models');
const {Movie, Genre, Actor} = require('../database/models')
const{Op}=require('sequelize');



module.exports = {
  all: async(req, res) =>{
      try {
           const movies= await Movie.findAll({include:['Genre']});
           res.render('moviesList',{movies})
         } catch(error){
            res.send('Hubo un error');
            console.log(error)
        }  
     },
   detail: async(req,res)=>{
      try {
           let movies = await Movie.findByPk(req.params.id)
           include:[{association:'Genre'},{association:'Actor'} ]
           res.render('movieDetail', {movies})
         } catch(error){
            res.send('Hubo un error');
            console.log(error)
        }  
           
     },
     newMovie: async(req,res)=>{
      try{ const movies = await Movie.findAll(
         { order:
         [['release_date','DESC']],
            limit:5,
         }
      )
       res.render('newMovie',{movies})
      } catch(error){
         res.send('Hubo un error');
         console.log(error)
     }  
   },
   recommended: async(req,res)=>{
      try{ const movies = await Movie.findAll({
         where:{
            rating:{[Op.gt]:8}
         }
      })
       res.render('recommended',{movies})
      } catch(error){
         res.send('Hubo un error');
         console.log(error)
     }    
   },
   search: async (req,res) =>{
         try {
             let {search, order} = req.body
             if(order == 'titledesc' ) {
               let movies = await Movie.findAll({
                  where: {
                     title: {[Op.like] : '%' + search + '%'}
                     },
                     order: [['title', 'DESC']]
                 })
                 res.render('searchFound', {movies});
             } else if(order == 'ratingasc'){
               let movies = await Movie.findAll({
                  where: {
                      title: {[Op.like] : '%' + search + '%'}
                         },
                         order: [['rating', 'ASC']]               
                  })
                  res.render('searchFound', {movies});
             } else if(order == 'ratingdesc'){
               let movies = await Movie.findAll({
                     where: {
                        title: {[Op.like] : '%' + search + '%'}
                           },
                            order: [['rating', 'DESC'] ]
                  })
                    res.render('searchFound', {movies});                       
             } else if(order == 'dateasc'){
               let movies = await Movie.findAll({
                      where: {
                         title: {[Op.like] : '%' + search + '%'}
                           },
                           order: [['release_date', 'ASC']] 
                    })
                     res.render('searchFound', {movies});
             } else if(order == 'datedesc'){
                 let movies = await Movie.findAll({
                       where: {
                         title: {[Op.like] : '%' + search + '%'}
                           },
                            order: [['release_date', 'DESC']]
                    })
                     res.render('searchFound', {movies});
             } else {
                 if(search == ''){
                     res.redirect('/movies');
                 } else{
                     let movies = await Movie.findAll({
                         where: {
                             title: {[Op.like] : '%' + search + '%'}
                         },
                         order: [['title', 'ASC']]
                     })
                     if(movies.length == 0){
                         res.render('searchNotFound');                   
                     }else{
                      res.render('searchFound', {movies});
                     }
                } 
             }           
            } catch(error){
               res.send('Hubo un error');
               console.log(error)
           } 
   },

 create: async(req,res)=>{
   try{    
      const generos = await Genre.findAll()
      const actores = await Actor.findAll()
       res.render('createMovie', {generos,actores});
      } catch(error){
         res.send('Hubo un error');
         console.log(error)
     } 
   },

store: async(req,res)=>{
  try{ 
     let newMovie= await Movie.create(req.body)
     await newMovie.addActores(req.body.actores)
      res.redirect('/movies');
   } catch(error){
      res.send('Hubo un error');
      console.log(error)
  } 
},

 update: async(req,res)=>{
     const movieId =req.params.id;
     const toEdit = await Movie.findByPk(movieId,{include:['Genre','actores']});
     const generos = await Genre.findAll()
     const actores = await Actor.findAll()
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
      } catch(error){
         res.send('Hubo un error');
         console.log(error)
     }
 }
}

