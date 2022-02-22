'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {  // Relations
      models.User.hasMany(models.Post)
      models.User.hasMany(models.Comment)
      models.User.hasMany(models.Like)
    }
  };
  User.init(
    { // Structure
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING(60), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(255), allowNull: false }, // Hash
      lastName: { type: DataTypes.STRING(60), allowNull: false },
      firstName: { type: DataTypes.STRING(60), allowNull: false },
      job: { type: DataTypes.STRING(100), allowNull: true },
      url: { type: DataTypes.STRING(255), allowNull: true, defaultValue: "../upload/Sample_User_Icon.png" },
      admin: { type: DataTypes.BOOLEAN, defaultValue:false },
      active: { type: DataTypes.BOOLEAN, defaultValue: true },
      // createdAt: { type: DataTypes.DATE }, // Champ créé automatiquement dans MySQL
      // updatedAt: { type: DataTypes.DATE }, // Champ créé automatiquement dans MySQL
    },
    { // Options
      sequelize,
      modelName: 'User',
    }
  );
  return User;
}

// cf. https://codebysamgan.com/how-to-create-model-association-in-sequelize-express-js-node-js




// // PLAN B
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     "user", // Nom de la table
//     { // Structure
//       id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//       email: { type: DataTypes.STRING(60), allowNull: false, unique: true },
//       password: { type: DataTypes.STRING(255), allowNull: false }, // Hash
//       lastName: { type: DataTypes.STRING(60), allowNull: false },
//       firstName: { type: DataTypes.STRING(60), allowNull: false },
//       admin: { type: DataTypes.BOOLEAN, defaultValue:false },
//       active: { type: DataTypes.BOOLEAN, defaultValue: true },
//       createdAt: { type: DataTypes.DATE },
//       updatedAt: { type: DataTypes.DATE }
//     },
//     { // Options
//       freezeTableName: true,
//       underscored: true
//     }
//   );
//   return User;
// };


// // METHODE OFFICIELLE :
// // https://sequelize.org/v7/manual/model-basics.html

// // METHODE ALTERNATIVE :
// // https://codebysamgan.com/how-to-create-model-association-in-sequelize-express-js-node-js

// // CES APPELS SONT-ILS NECESSAIRES ?????????????????????????????
// // const { Sequelize, DataTypes, Model } = require('sequelize');
// // const sequelize = new Sequelize('sqlite::memory:');
// const { Model } = require('sequelize');
// // LES ARGUMENTS PASSES DANS CETTE FONCTION/METHODE SONT-ILS CORRECTS ???????????????????
// module.exports = (sequelize, DataTypes) => {

//   class User extends Model {
//     // QUEL TYPE D'INFORMATION FAUT-IL RENSEIGNER ICI ? LES ASSOCIATIONS ?????????????????
//     // User.hasMany(Message, {foreignKey: 'id_user'});
//     static associate(models) {
//       // define association here
//         // Relations
//   this.Message = models.User.hasMany(models.Message, {
//     foreignKey: 'id_user',
//     as: 'message',
//     onDelete: 'cascade'
//   });
//     }
//   }

//   User.init(
//     { // Constructeur, objet, attributs, champs de la table
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       email: {
//         type: DataTypes.STRING(60),
//         allowNull: false,
//         unique: true
//       },
//       password: {
//         type: DataTypes.STRING(255), // hash
//         allowNull: false
//       },
//       lastName: {
//         type: DataTypes.STRING(60),
//         allowNull: false
//       },
//       firstName: {
//         type: DataTypes.STRING(60),
//         allowNull: false
//       },
//       admin: {
//         type: DataTypes.BOOLEAN,
//         defaultValue:false
//       },
//       active: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true
//       },
//       createdAt: {
//         type : DataTypes.DATE
//       },
//       updatedAt: {
//         type: DataTypes.DATE
//       }
//     },
//     { // Options du modèle
//       sequelize,
//       modelName: 'User',
//       freezeTableName: true, // Empêche la bdd de renommer les tables
//       underscored: true // GESTION DES UNDERSCORE ???????????
//     }
//   );
  
// return User;
  
//   // Test
//   console.log(User === sequelize.models.User); // true

// };