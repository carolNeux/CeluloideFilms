const {sequelize, DataTypes} = require('sequelize');
const moment = require ('moment');

module.exports = (sequelize, DataTypes) => {
    
   const Movie = sequelize.define('Movie', {
       title:DataTypes.STRING,
       rating:DataTypes.INTEGER,
       awards:DataTypes.INTEGER,
       release_date:{
          type:DataTypes.DATEONLY,
          get() {
            return moment(this.getDataValue('release_date')).add(3, 'hours').format('YYYY-MM-DD');
         }},
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