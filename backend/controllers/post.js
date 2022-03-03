// IMPORTS
const { Post } = require('../models');
const { Comment } = require ('../models');
const { Like } = require ('../models');
const { User } = require ('../models');
const fs = require('fs');

// CREATION DE POST
exports.createPost = (req, res) => {
  let media = null;
  if (req.file) { media = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}` };
  console.log('Requête : ', req.body);
  Post
    .create({
      UserId: req.body.UserId,
      title: req.body.title,
      content: req.body.content,
      url: media,
    })
    .then(() => res.status(201).json({ message: "Post créé" }))
    .catch((error) => res.status(400).json({ error }));
};

// MODIFIER UN POST
exports.updatePost = (req, res) => {
  console.log('Requête MAJ de post : ', req.body);
  let media = null;
  if (req.file) { media = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}` };
    const data = {
    UserId: req.body.UserId,
    title: req.body.title,
    content: req.body.content,
    url: media,
  }
  Post
    .update(data, {where: { id: req.params.id}})
    .then(() => res.status(201).json({ message: "Post créé" }))
    .catch((error) => res.status(400).json({ error }));
};

// LIRE TOUS LES POSTS
exports.getAllPosts = (req, res) => {
  Post
    .findAll({
      include: [
          {
            model: User,
            required: true,
            attributes: ['firstName', 'lastName', 'url', 'id']
        },
        {
            model: Comment,
            required: false,
            include: {
                model: User,
                required: true,
                attributes: ['firstName', 'lastName', 'url', 'id']
            },
        }
      ],
      order: [['createdAt', 'DESC']],
    })
    .then(console.log(JSON.stringify(res.body)))
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

// INTERROGER UN POST
exports.getOnePost = (req, res) => {
  console.log('Contenu de la requête getOnePost : ', req.body);
  Post
    .findOne({
      where: { id: req.params.id },
      // include: [
      //   {model: User},
      // ]
    })
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

// EFFACER UN POST
exports.deletePost = (req, res) => { Post
  .destroy({ where: { id: req.params.id } })
  .then(() => res.status(200).json({ message: "Post supprimé" }))
  .catch((error) => res.status(400).json({ error }));
  };

// CREER UN COMMENTAIRE
exports.createComment = (req, res) => {
  if (!req.body.comment) { return res.status(400).json({ message: 'Commentaire vide'}) }
  console.log("Contenu de la requête :", req.body)
  Comment
    .create ({
      PostId: req.body.PostId,  
      UserId: req.body.UserId,
      comment: req.body.comment
    })
    .then(() => res.status(201).json({ message: "Commentaire créé" }))
    .catch((error) => res.status(400).json({ error: "Commentaire non créé" }));
};

// METTRE A JOUR UN COMMENTAIRE
exports.updateOneComment = (req, res) => {
  if (!req.body.comment) { return res.status(400).json({ message: 'Commentaire vide'}) }
  const CommentId = req.params.id
  console.log("Numéro du commentaire :", CommentId)
  console.log("Contenu de la requête de MAJ :", req.body)
  const data = {
    UserId: req.body.UserId,
    PostId: req.body.PostId,
    comment: req.body.comment,
  }
  Comment
    .update(data, {where: { id: req.params.id}})
    .then(() => res.status(201).json({ message: "Commentaire modifié" }))
    .catch((error) => res.status(400).json({ error: "Commentaire non modifié" }));
};

// EFFACER UN COMMENTAIRE
exports.deleteComment = (req, res) => {
  console.log('Vous allez supprimer le commentaire')
  Comment.destroy({ where: { id: req.params.id}})
      .then(() => res.status(200).json({ message: 'commentaire supprimé'}))
      .catch(err => res.status(400).json({ err: 'Impossible de supprimer le commentaire'}))
};

// LIRE LES COMMENTAIRES
exports.getAllComments = (req, res) => {
  Comment
    .findAll({
      where: { postId: req.params.id},
      include: {
          model: User,
          required: true,
          attributes: ['firstname', 'name']
      },
    })
    .then((comments) => { res.status(200).json(comments) })
    .catch(err => res.status(400).json({ err: 'impossible d\'afficher les commentaires'}))
};

// LIRE UN COMMENTAIRE
exports.getOneComment = (req, res) => {
  console.log('Interrogation', req.body);
  Comment
    .findOne({ where: { id: req.params.id} })
    .then((comments) => { res.status(200).json(comments) })
    .catch(err => res.status(400).json({ err: 'impossible d\'afficher les commentaires'}))
};