const { DataTypes } = require('sequelize');
const config = require('../../config');

const Admin = require('./admin_model'); // Importez le modèle Admin
const User = require('./user_model'); // Importez le modèle Admin

const Comment = config.sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT
    },
    // Clé étrangère pour référencer la table Admin
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Admin,
            key: 'id'
        }
    },
    // Clé étrangère pour référencer la table User
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    }
  });


  module.exports = Comment;