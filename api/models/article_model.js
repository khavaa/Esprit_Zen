const { DataTypes } = require('sequelize');
const config = require('../../config');

const Admin = require('./admin_model'); // Importez le modèle Admin

const Article = config.sequelize.define('article', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100)
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
    }
  });


  module.exports = Article