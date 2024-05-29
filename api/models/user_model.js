const { DataTypes } = require('sequelize');
const config = require('../../config');
const bcrypt = require('bcrypt');

const Admin = require('./admin_model'); // Importez le modèle Admin

const User = config.sequelize.define('user', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
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
}, {
    hooks: {
        beforeCreate: (User) => {
            {
                User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 10):""
            }
        },
        beforeUpdate: (User) => {
            {
                User.password = User.password && User.password != "" ? bcrypt.hashSync(User.password, 10):""
            }
        }
    }
})

module.exports = User;