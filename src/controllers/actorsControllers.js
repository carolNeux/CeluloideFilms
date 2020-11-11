const {Actor} = require('../database/models')

module.exports = {
     all: async(req, res) =>{
        try {
           const actorsJson = await Actor.findAll()
           const actorsJs = await actorsJson.json()
           res.json(actorsJs)
         } catch(error) {
            console.log(error);
         }   
     }
}