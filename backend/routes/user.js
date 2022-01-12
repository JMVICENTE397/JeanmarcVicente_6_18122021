// IMPORTS
const express = require('express');
const router = express.Router();
const limit = require('../middleware/limiter');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

// ROUTES
router.post('/signup', userCtrl.signup);
router.post('/login', limit.max, userCtrl.login);
// router.get("/:id", auth, userCtrl.getOneUser);
// router.put("/:id", auth, multer, userCtrl.updateUser);
// router.delete("/:id", auth, userCtrl.deleteUser);

// EXPORT
module.exports = router;