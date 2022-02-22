// IMPORTS
require('dotenv').config();
const bcrypt = require('bcrypt');
const joi = require('../middleware/joi');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// INSCRIPTION
exports.signup = (req, res) => {
  console.log('Inscription :', req.body)
  User
  .findOne({ where: { email: req.body.email} })
  .then((user) => {
    if (user) {
      return res.status(401).json({ error: "Email déjà utilisé" })
    } else {
      const resultJoi = joi.validate(req.body);
      console.log(resultJoi);
      if (!resultJoi.error) { // Si aucune erreur de format avec joi
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            User.create({
              email: req.body.email,
              lastName: req.body.lastName,
              firstName: req.body.firstName,
              password: hash,
            });
            res.status(201).json({ user: user, message: 'Utilisateur créé.' });
          })
          .catch((error) => {
            res.status(500).json({ error, message: 'Erreur de cryptage.' })
          })
      } else {
        return res.status(401).json({ error: "Saisie non valide." })
      }
    }
  })
  .catch(error => res.status(500).json({ error: error }));
};

/* P6
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const emailMask2Options = {
        maskWith: "*", 
        unmaskedStartCharactersBeforeAt: 5,
        unmaskedEndCharactersAfterAt: 3,
        maskAtTheRate: false
      };
      const user = new User({
        email: maskData.maskEmail2(req.body.email, emailMask2Options),
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
Fin du P6 */

// CONNEXION
exports.login = (req, res, next) => {
  console.log('Connexion :', req.body);
  User
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) { return res.status(404).json({ error: 'Utilisateur non trouvé' }) }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) { return res.status(401).json({ error: 'Mot de passe incorrect' }) }
          res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            job: user.job,
            url: user.url,
            token: jwt.sign(
              { id: user.id },
              process.env.RANDOM_SECRET_TOKEN,
              { expiresIn: '24h' }
            )
          });
          console.log('Réponse:',res);
        })
        .catch(error => {
          res.status(500).json({ error: 'Erreur API 1' })
        })
    })
    .catch(error => res.status(500).json({ error: 'Erreur API 2' }));
};

// INTERROGATION
exports.getOneUser = (req, res) => {
  console.log('Interrogation', req.body);
  User
    .findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json((user)))
    .catch((error) => res.status(500).json({ error }))
};

// // MISE A JOUR
// exports.updateUser = (req, res) => {
//   const avatar = req.file;
//   // On regarde si la requête contient une photo à modifier
//   if (avatar) {
//     console.log('MAJ du profil avec photo');
//     console.log(req.file);
//     User
//       .findOne({ where: { id: req.params.id } })
//       .then((res2) => {
//         const filename = res2.url.split("/upload/")[1];
//         fs.unlink(`upload/${filename}`, () => {
//           User
//             .update(
//               {
//                 // lastName: req.body.lastName,
//                 // firstName: req.body.firstName,
//                 // job: req.body.job,
//                 url: `${req.protocol}://${req.get("host")}/upload/${ req.file.filename }`,
//               },
//               { where: { id: req.params.id } }
//             )
//             .then(() => res.status(200).json({ message: 'Image et profil modifiés' }))
//             .catch((error) => res.status(400).json({ error }))
//         });
//       })
//       .catch((error) => res.status(500).json({ error }));
//   } else {
//     console.log('MAJ du profil sans photo');
//     User
//       .update(
//         { lastName: req.body.lastName, firstName: req.body.firstName, firstName, job: req.body.job },
//         { where: { id: req.params.id } }
//       )
//       .then(() => res.status(201).json({ message: 'Profil modifié' }))
//       .catch((error) => res.status(500).json({ error }))
//   }
// };

// MISE A JOUR
exports.updateUser = (req, res) => {
  console.log('modification des données utilisateurs en cours');
  var data = "";
  let url = "";
  console.log(req.file);

  if(req.file) {
      console.log('Circuit avec MAJ de la photo');
      url = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
      data = { url: url }
  } else {
      console.log('Circuit sans MAJ de la photo');
      job = req.body.job
      data = { job: job }
  }
  console.log('MAJ du profil');
  console.log(data);
  User.update(data, {where: { id: req.params.id}})
      .then(() => res.status(200).json({ message: 'Votre image de profil a été enregistrée !'}))
      .catch((error) => {
          console.log(error);
          res.status(400).json({ 'error': 'Impossible d\'enregistrer l\'image de profil'})
      })
};

// SUPPRESSION
exports.deleteUser = (req, res) => {
  User
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      const filename = user.url.split("/upload/")[1];
      fs.unlink(`upload/${filename}`, () => {
        User
          .destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};