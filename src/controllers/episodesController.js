//---Primero traemos al modelo que queremos usar___Se escribe en singular y con MAyuscula//
const {Episode} = require('../database/models')

module.exports = {
     all: async(req, res) =>{
        try {
           const episodesJson = await Episode.findAll()
           const episodesJs = await episodesJson.json()
           res.json(episodeJs)
         } catch(error) {
            console.log(error);
         }   
     }
}