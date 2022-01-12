'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {  // Relations
      models.Post.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }),
      models.Post.hasMany(models.Comment),
      models.Post.hasMany(models.Like)
    }
  };
  Post.init(
    { // Structure
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      // id_user: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull:false },
      content: { type: DataTypes.TEXT, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: true },
      // createdAt: { type: DataTypes.DATE },
      // updatedAt: { type: DataTypes.DATE }
    },
    { // Options
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
}

// cf. https://codebysamgan.com/how-to-create-model-association-in-sequelize-express-js-node-js

// // PLAN B
// module.exports = (sequelize, DataTypes) => {
//   const Post = sequelize.define(
//     'post', // Nom de la table
//     { // Structure
//       id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//       id_user: { type: DataTypes.INTEGER, allowNull: false },
//       title: { type: DataTypes.STRING, allowNull:false },
//       content: { type: DataTypes.TEXT, allowNull: false },
//       url: { type: DataTypes.STRING, allowNull: true },
//       createdAt: { type: DataTypes.DATE },
//       updatedAt: { type: DataTypes.DATE }
//     },
//     { // Options
//       freezeTableName: true,
//       underscored: true
//     }
//   );
//   return Post;
// };

// // `sequelize.define` also returns the model
// console.log(Comment === sequelize.models.Comment); // true


// // METHODE OFFICIELLE :
// // https://sequelize.org/v7/manual/model-basics.html

// // METHODE ALTERNATIVE :
// // https://codebysamgan.com/how-to-create-model-association-in-sequelize-express-js-node-js

// // CES APPELS SONT-ILS NECESSAIRES ?????????????????????????????
// // const { Sequelize, DataTypes, Model } = require('sequelize');
// // const sequelize = new Sequelize('sqlite::memory:');

// // LES ARGUMENTS PASSES DANS CETTE FONCTION/METHODE SONT-ILS CORRECTS ???????????????????
// module.exports = (Sequelize, DataTypes, Model) => {

//   class Message extends Model {
//     // QUEL TYPE D'INFORMATION FAUT-IL RENSEIGNER ICI ? LES ASSOCIATIONS ?????????????????
//     // User.hasMany(Message, {foreignKey: 'id_user'});
//   }

//   Message.init(
//     { // Constructeur, objet, attributs, champs de la table
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       // CLE ETRANGERE CREEE AUTOMATIQUEMENT
//       // id_user: {
//       //   type: DataTypes.INTEGER,
//       //   allowNull: false
//       // },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       content: {
//         type: DataTypes.TEXT,
//         allowNull: false
//       },
//       mediaUrl: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       // INUTILE
//       // like: {
//       //   type: DataTypes.INTEGER,
//       //   defaultValue: 0
//       // },
//       createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false
//       }
//     },
//     { // Options du modèle
//       freezeTableName: true, // Empêche la bdd de renommer les tables
//       underscored: true // GESTION DES UNDERSCORE ???????????
//     }
//   );

//   // Relations
//   Message.belongsTo(User, {foreignKey: 'id_user'});
    
//   // Test
//   console.log(User === sequelize.models.User); // true

// };
