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

// CREER OU SUPPRIMER UN LIKE OU UN DISLIKE
// exports.likeSauce = (req, res, next) => {
//   if (req.body.like === 1) {  // J'aime
//       Sauce.updateOne( {_id:req.params.id}, { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } })
//         .then(() => res.status(200).json({ message: 'Like ajouté !'}))
//         .catch(error => res.status(400).json({ error }));
//   } else if (req.body.like === -1) {  // Je n'aime pas
//       Sauce.updateOne( {_id:req.params.id}, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } })
//         .then(() => res.status(200).json({ message: 'Dislike ajouté !'}))
//         .catch(error => res.status(400).json({ error }));
//   } else {  // Je n'ai plus d'avis
//       Sauce.findOne({ _id: req.params.id })
//         .then(sauce => {
//           if (sauce.usersLiked.includes(req.body.userId)) {
//             Sauce.updateOne( {_id:req.params.id}, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
//               .then(() => res.status(200).json({ message: 'Like supprimé !'}))
//               .catch(error => res.status(400).json({ error }))
//           } else if (sauce.usersDisliked.includes(req.body.userId)) {
//             Sauce.updateOne( {_id:req.params.id}, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
//               .then(() => res.status(200).json({ message: 'Dislike supprimé !'}))
//               .catch(error => res.status(400).json({ error }))
//           }
//         })
//         .catch(error => res.status(400).json({ error }));
//   }
// };

// INTERROGER TOUS LES POSTS
exports.getAllPosts = (req, res) => {
  Post
    .findAll({

      // where:{ _id: req.params.id },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "url"],
        },
        
        // {model: Comment},
        // {model: Like}
      ],
              // Will order by a nested associated model's createdAt simple association objects.
    // [{model: Task, as: 'Task'}, {model: Project, as: 'Project'}, 'createdAt', 'DESC']
    order: [
      // [User,'id', 'DESC']
      ['id', 'DESC']
    ],
    })
    .then(console.log(JSON.stringify(res.body)))
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

// INTERROGER UN POST
exports.getOnePost = (req, res) => {
  Post.findAll({
      where:{ _id: req.params.id },
      // include: [
      //   {model: User},
      //   {model: Comment},
      //   {model: Like}
      // ]
    })
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

// // MODIFIER UNE SAUCE
// exports.modifySauce = (req, res, next) => {
//   const sauceObject = req.file ?
//     {
//       ...JSON.parse(req.body.sauce),
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };
//   Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//     .catch(error => res.status(400).json({ error }));
// };

// EFFACER UN POST
exports.deletePost = (req, res) => { Post
  .destroy({ where: { id: req.params.id } })
  .then(() => res.status(200).json({ message: "Post supprimé" }))
  .catch((error) => res.status(400).json({ error }));
  };
