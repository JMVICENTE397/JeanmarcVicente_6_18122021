// IMPORTS
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// const logger = require('../middleware/logger');
const multer = require('../middleware/multer');
const postCtrl = require('../controllers/post');

// ROUTES
router.post('/', auth, multer, postCtrl.createPost);
// router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, multer, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
// router.post('/:id/like', auth, postCtrl.likePost);
// router.post('/:id/comment', auth, postCtrl.commentPost);
// router.delete('/comment/:id', auth, postCtrl.deleteComment);

// EXPORT
module.exports = router;