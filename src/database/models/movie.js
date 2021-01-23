const {sequelize, DataTypes} = require('sequelize');
const actor = require('./actor');

module.exports = (sequelize, DataTypes) => {
    
   const Movie = sequelize.define('Movie', {
       title:DataTypes.STRING,
       rating:DataTypes.INTEGER,
       awards:DataTypes.INTEGER,
       release_date:DataTypes.DATEONLY,
       length:DataTypes.INTEGER,
       genre_id:DataTypes.INTEGER
    });
       Movie.associate = (models=>{
       Movie.belongsTo(models.Genre);
       Movie.belongsToMany(models.Actor, {
           as:'actores', through:'actor_movie'
       });
      })
   ,{ timestamps: false  
        }
   return Movie
}