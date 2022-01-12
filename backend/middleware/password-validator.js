// IMPORT
const passwordSchema = require('../models/Password');

// EXPORT
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(400).json({ message: "Le mot de passe doit contenir entre 8 et 15 caractères, avec au moins une majuscule, une minuscule et un chiffre." });
    } else {
        next();
    }
};