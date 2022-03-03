// IMPORTS
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const db = require('./models');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const app = express();

// SYNCHRONISATION DE LA BASE DE DONNEES
// db.sequelize.sync({alter: true});

// db.sync()
//   .then(() => console.log('La connexion a la BDD a fonctionné.'))
//   .catch(() => error => console.log('La connexion à la BDD a échoué.'))

// https://sequelize.org/v7/manual/getting-started.html
// Constructeur
// const sequelize = new Sequelize (
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   { host: 'localhost', dialect: 'mysql' }
// );
// Test de connexion
const dbConnectCheck = async function () {
  try {
    await db.sequelize.authenticate();
    console.log('Connexion réussie avec la BDD.');
  } catch (error) {
    console.log('Echec de connexion avec la BDD.', error);
  }
}
dbConnectCheck();
// sequelize
//   .authenticate()
//   .then(() => console.log('Connexion réussie avec la BDD.'))
//   .catch((err) => console.log('Echec de connexion avec la BDD.', err));
// Synchronisation des tables



// sequelize
//   .User.sync({ alter: true })
//   .then( () => {
//     console.log('La table des utilisateurs a été synchronisée.');
//   })
//   .catch( (error) => {
//     console.log ('La synchronisation de la table des utilisateurs a échoué.', error)
//   });
// sequelize
//   .Message.sync({ alter: true })
//   .then( () => {
//     console.log('La table des utilisateurs a été synchronisée.');
//   })
//   .catch( (error) => {
//     console.log ('La synchronisation de la table des utilisateurs a échoué.', error)
//   });
// Message.sync({ alter: true });
// console.log('La table des posts a été synchronisée avec le modèle.');
// Comment.sync({ alter: true });
// console.log('La table des commentaires a été synchronisée avec le modèle.');
// Like.sync({ alter: true });
// console.log('La table des likes a été synchronisée avec le modèle.');





// FONCTIONNALITES DU SERVEUR EXPRESS

  // Sécurisation des en-têtes htpp
  app.use(helmet());
  app.use(cors());

  // Paramétrage des en-têtes
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // Pour parser les objets json
  app.use(express.json());

  // Pour la gestion des fichiers images
  app.use('/upload', express.static(path.join(__dirname, 'upload')));

  // Routes
  app.use('/api/auth', userRoutes);
  app.use('/api/post', postRoutes);
 
// EXPORT
module.exports = app;