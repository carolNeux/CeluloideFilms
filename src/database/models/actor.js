const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
   
   const Actor = sequelize.define('Actor', {
       first_name:DataTypes.STRING,
       last_name:DataTypes.STRING,
       rating:DataTypes.DECIMAL,
       favorite_movie_id:DataTypes.INTEGER.UNSIGNED,
    });
     Actor.associate = (models=>{
        Actor.belongsToMany(models.Movie,{
        as:'peliculas',
        through:'actor_movie'
        });
    });
    { timestamps: false 
    }
   return Actor;
}
