const Sequelize = require('sequelize');

const sequelize = new Sequelize('argonw_happyfeet_db', 'argonw_admin', 'knEi2peETejs', {
  host: 'mysql1006.mochahost.com',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports.seq = sequelize;