const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    
   const episode = sequelize.define('Episode', {
       title:DataTypes.STRING,
       number:DataTypes.INTEGER,
       release_dte:DataTypes.DATEONLY, 
       rating:DataTypes.DECIMAL,
       season_id:DataTypes.INTEGER
   }, {                            
    timestamps: false
   })
   return episode
}