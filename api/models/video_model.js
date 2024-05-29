const { DataTypes } = require('sequelize');
const config = require('../../config');

const Admin = require('./admin_model'); // Importez le modèle Admin

const Video = config.sequelize.define('video', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100)
    },
    url: {
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

  module.exports = Video;