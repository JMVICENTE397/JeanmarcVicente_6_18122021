'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// CONNEXION A LA BASE DE DONNEES
const sequelize = new Sequelize (
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: 'localhost', dialect: 'mysql' }
);

// fs
//   .readdirSync(__dirname)
//   .filter((file) => { return (file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"); })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

Object
  .keys(db)
  .forEach((modelName) => {
    if (db[modelName].associate) { db[modelName].associate(db); }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;



// // // IMPORTS
// const sequelize = require('./util/database');
// const User = require('User');
// const Message = require('Message');
// // // const { Sequelize, ForeignKeyConstraintError } = require('sequelize/dist');



// // // RELATIONS
// User.hasMany(Message, {foreignKey: 'id_user'});
// Message.belongsTo(User);
// // Message.hasMany(Comment);
// // Message.hasMany(Like);

// // // SYNCHRONISATION DES TABLES
// // Sequelize
// // // .sync()g
// // // Option 1 : Crée les tables dans la BDD ssi elles n'existent pas
// // // .sync({force:true})
// // // Option 2 : Crée ou remplace les tables existantes dans la BDD
// // .sync({alter:true})
// // // Option 3 :Modifie les tables de la BDD si la structure ou le format est différent du modèle 
// // .then( () => {
// //     console.log('Synchronisation réussie.');
// // })
// // .catch( (error) => {
// //     console.log('La synchronisation a échoué.', error);
// // });

// // CONNEXION A LA BASE DE DONNEES
// // https://sequelize.org/v7/manual/getting-started.html
// // Constructeur
// const sequelize = new Sequelize (
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     { host: 'localhost', dialect: 'mysql' }
//   );
//   // Test de connexion
//   // try {   // POURQUOI MARCHE PAS ??
//   //   await sequelize.authenticate();
//   //   console.log('Connexion réussie avec la BDD.');
//   // } catch (error) {
//   //   console.log('Echec de connexion avec la BDD.', err);
//   // }
// //   sequelize
// //     .authenticate()
// //     .then(() => console.log('Connexion réussie avec la BDD.'))
// //     .catch((err) => console.log('Echec de connexion avec la BDD.', err));
  
// //   // Synchronisation des tables
// //   sequelize
// //     .User.sync({ alter: true })
// //     .then( () => {
// //       console.log('La table des utilisateurs a été synchronisée.');
// //     })
// //     .catch( (error) => {
// //       console.log ('La synchronisation de la table des utilisateurs a échoué.', error)
// //     });
// //   sequelize
// //     .Message.sync({ alter: true })
// //     .then( () => {
// //       console.log('La table des utilisateurs a été synchronisée.');
// //     })
// //     .catch( (error) => {
// //       console.log ('La synchronisation de la table des utilisateurs a échoué.', error)
// //     });
//   // Message.sync({ alter: true });
//   // console.log('La table des posts a été synchronisée avec le modèle.');
//   // Comment.sync({ alter: true });
//   // console.log('La table des commentaires a été synchronisée avec le modèle.');
//   // Like.sync({ alter: true });
//   // console.log('La table des likes a été synchronisée avec le modèle.');