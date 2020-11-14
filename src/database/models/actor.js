const {sequelize, DataTypes} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    //vamos a usar el metodo define//
    //lo que define necesita es primero un string, luego un objeto que representa a cada columna que tenemos en la base de datos en la table de usuraios si traemos'Users' //
   const actor = sequelize.define('Actor', {
       first_name:DataTypes.STRING,
       last_name:DataTypes.STRING,
       rating:DataTypes.DECIMAL,
       favorite_movie_id:DataTypes.INTEGER,
 });
     actor.associate = (models=>{
     actor.belongsToMany(models.Movie,{
     through:'actor_movie'
    });
   });
   { timestamps: false                         /*Opciones si no ponemos created_at y updated_at nos va a tratar de llenar esa columna 
                                     por eso le ponemos el timestamps*/

   }
   return actor;
}
