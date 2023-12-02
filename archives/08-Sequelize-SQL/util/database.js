const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Mysql@01213506177', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
