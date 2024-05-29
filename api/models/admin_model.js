const { DataTypes } = require('sequelize');
const config = require('../../config');
const bcrypt = require('bcrypt');

const Admin = config.sequelize.define('admin', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: (Admin) => {
            {
                Admin.password = Admin.password && Admin.password != "" ? bcrypt.hashSync(Admin.password, 10):""
            }
        },
        beforeUpdate: (Admin) => {
            {
                Admin.password = Admin.password && Admin.password != "" ? bcrypt.hashSync(Admin.password, 10):""
            }
        }
    }
});

module.exports = Admin;