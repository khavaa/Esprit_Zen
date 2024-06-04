const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('esprit_zen', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
  sequelize.sync();
  
  const sessionSecret = "keyboard cat";
  
  module.exports = {sequelize, sessionSecret};
