// IMPORTS
require('dotenv').config();
const bcrypt = require('bcrypt');
// const maskData = require('maskdata');
const joi = require('../middleware/joi');
const models = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// INSCRIPTION
exports.signup = (req, res) => {
  const userExist = models.User.findOne({
    attributes: ['email'],
    where: { email: req.body.email}
  });
  // On vérifie que l'email n'est pas déjà utilisé
  if (!userExist){
    const resultJoi = joi.validate(req.body);
    console.log(req.body);
    // On vérifie que les données saisies sont conformes
    if (!resultJoi.error) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = models.User.create({
            email: req.body.email,
            password: hash,
            lastName: req.body.lastName,
            firstName: req.body.firstName
          });
          res.status(201).json({ user: user, message: 'Utilisateur créé' });
        })
        .catch((error) => {
          res.status(500).json({ error, message: 'L\'encryptage a échoué' })
        })
    } else {
      res.status(401).json({ error: resultJoi.error.details });
    }
  } else {
    res.status(401).json({ message: 'Email déjà utilisé'});
  }
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
exports.login = (req, res) => {
  console.log('Connexion', req.body);
  models.User
    .findOne({ where:{ email: req.body.email } })
    .then((user) => {
      if (!user) { return res.status(401).json({ error: 'Utilisateur non trouvé !' }); }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) { return res.status(401).json({ error: 'Mot de passe incorrect !' }); }
          res.status(200).json({
            userId: user.id,
            admin: user.admin,
            token: jwt.sign(
              { userId: user.id, admin: user.admin },
              process.env.RANDOM_SECRET_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => {
          res.status(500).json({ error })
        })
    })
    .catch(error => res.status(500).json({ error }));
};

// INTERROGATION
exports.getOneUser = (req, res) => {
  console.log('Interrogation', req.body);
  models.User
    .findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json((user)))
    .catch((error) => res.status(500).json({ error }))
};

// MISE A JOUR
exports.updateUser = (req, res) => {
  const avatar = req.file;
  // On regarde si la requête contient une photo à modifier
  if (avatar) {
    models.User
      .findOne({ where: { id: req.params.id } })
      .then((res2) => {
        const filename = res2.url.split("/upload/")[1];
        fs.unlink(`upload/${filename}`, () => {
          models.User
            .update(
              {
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                url: `${req.protocol}://${req.get("host")}/upload/${ req.file.filename }`,
              },
              { where: { id: req.params.id } }
            )
            .then(() => res.status(200).json({ message: 'Image et profil modifiés' }))
            .catch((error) => res.status(400).json({ error }))
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    models.User
      .update(
        { lastName: req.body.lastName, firstName: req.body, firstName },
        { where: { id: req.params.id } }
      )
      .then(() => res.status(201).json({ message: 'Profil modifié' }))
      .catch((error) => res.status(500).json({ error }))
  }
};

// SUPPRESSION
exports.deleteUser = (req, res) => {
  models.User
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      const filename = user.url.split("/upload/")[1];
      fs.unlink(`upload/${filename}`, () => {
        models.User
          .destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};