const { DataTypes } = require('sequelize');
const config = require('../../config');
const bcrypt = require('bcrypt');

const Admin = require('./admin_model'); // Importez le modèle Admin

const Appointment = config.sequelize.define('appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_meeting: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hour_meeting: {
        type: DataTypes.TIME,
        allowNull: false
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
})

module.exports = Appointment;