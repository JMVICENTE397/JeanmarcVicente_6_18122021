// IMPORT
const joi = require("joi");

// CONFIGURARTION
module.exports = joi
  .object()
  .keys({
    email: joi
      .string()
      .email()
      .required()
      .messages({
        "string.empty": `Vous devez saisir un email.`,
        "string.email": `L'email saisi n'est pas valide.`
      })
      .label("Email"),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required()
      .messages({
        "string.empty": `Vous devez saisir un mot de passe.`,
        "string.pattern.base": `Votre mot de passe doit contenir 8 caractères minimum avec au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.`,
      })
      .label("Mot de passe"),
    lastName: joi
      .string()
      .required()
      .regex(/^[A-Z-a-z-0-9-zàâçéèêëîïôûùüÿñæœ\s]{2,20}$/)
      .messages({
        "string.empty": `Vous devez saisir un nom.`,
        "string.pattern.base": `Votre nom doit comprendre entre 2 et 20 caractères`,
      })
      .label("Nom"),
    firstName: joi
      .string()
      .required()
      .regex(/^[A-Z-a-z-0-9-zàâçéèêëîïôûùüÿñæœ\s]{2,20}$/)
      .messages({
        "string.empty": `Vous devez saisir votre prénom.`,
        "string.pattern.base": `Votre prénom doit comprendre entre 2 et 20 caractères`,
      })
      .label("Prénom")
  })
  .options({ abortEarly: false });