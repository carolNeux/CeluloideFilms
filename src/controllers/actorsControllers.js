const {Actor} = require('../database/models')


module.exports = {
   all: async(req, res) =>{
      try {
         let actor = await Actor.findByPk(req.params.id,{include:['peliculas']});
         res.render('actorsList', {actor})
      }  catch(error) {
         console.log(error);
      }   
   }
}