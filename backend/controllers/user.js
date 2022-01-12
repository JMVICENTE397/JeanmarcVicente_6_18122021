// IMPORTS
require('dotenv').config();
const bcrypt = require('bcrypt');
// const maskData = require('maskdata');
const joi = require('../middleware/joi');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// INSCRIPTION -- QUID DE LA FONCTION FIND AND CREATE ????
exports.signup = (req, res) => {
  // const resultJoi = joi.validate(req.body);
  console.log(req.body);
  // if (!resultJoi.error) {
    // bcrypt
      // .hash(req.body.password,10)
      // .then((hash) => {
        User.create({
            email: req.body.email,
            password: req.body.password,
            lastName: req.body.lastName,
            firstName: req.body.firstName
          })
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(() => res.status(400).json({ error: 'Cet email est déjà utilisé.' }))
      // })
  // } else {
  //   res.status(402).json({ error: resultSchema.error.details });
  // }
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
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) { return res.status(401).json({ error: 'Utilisateur non trouvé !' }); }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) { return res.status(401).json({ error: 'Mot de passe incorrect !' }); }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.RANDOM_SECRET_TOKEN,
              { expiresIn: '48h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};