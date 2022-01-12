'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) { // Relations
      models.Comment.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' }),
      models.Comment.belongsTo(models.Post, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
    }
  };
  Comment.init(
    { // Structure
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      // id_message: { type: DataTypes.INTEGER, allowNull: false },
      // id_user: { type: DataTypes.INTEGER, allowNull: false },
      comment: { type: DataTypes.TEXT, allowNull: false },
      // createdAt: { type: DataTypes.DATE, allowNull: false },
      // updatedAt: { type: DataTypes.DATE, allowNull: false }
    },
    { // Options
      sequelize,
      modelName: 'Comment',
    }
  );
  return Comment;
}

// cf. https://codebysamgan.com/how-to-create-model-association-in-sequelize-express-js-node-js

// // PLAN B
// module.exports = (sequelize, DataTypes) => {
//   const Comment = sequelize.define(
//     'comment',  // Nom
//     { // Structure
//       id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//       id_message: { type : DataTypes.INTEGER, allowNull: false },
//       id_user: { type : DataTypes.INTEGER, allowNull: false },
//       comment: { type: DataTypes.TEXT, allowNull: false },
//       createdAt: { type: DataTypes.DATE, allowNull: false },
//       updatedAt: { type: DataTypes.DATE, allowNull: false }
//     },
//     { // Options
//       freezeTableName: true,
//       underscored: true
//     }
//   );
//   return Comment;
// };

// // `sequelize.define` also returns the model
// console.log(Comment === sequelize.models.Comment); // true