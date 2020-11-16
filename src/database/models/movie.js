const {sequelize, DataTypes} = require('sequelize');
const actor = require('./actor');

//const {DataTypes, where} = require('sequelize/types')Lo digo todo junto arriba

module.exports = (sequelize, DataTypes) => {
    //vamos a usar el metodo define//
    //lo que define necesita es primero un string, luego un objeto que representa a cada columna que tenemos en la base de datos en la table de usuraios si traemos'Users' //
   const Movie = sequelize.define('Movie', {
       title:DataTypes.STRING,
       rating:DataTypes.INTEGER,
       awards:DataTypes.INTEGER,
       release_date:DataTypes.DATEONLY, //only es sin hora//
       length:DataTypes.INTEGER,
       genre_id:DataTypes.INTEGER
 });
       Movie.associate = (models=>{
       Movie.belongsTo(models.Genre);
       Movie.belongsToMany(models.Actor, {
           as:'actores', through:'actor_movie'
       });
      })
   
        ,{   timestamps: false                         /*Opciones si no ponemos created_at y updated_at nos va a tratar de llenar esa columna 
                                     por eso le ponemos el timestamps*/
 
        }
   return Movie
}