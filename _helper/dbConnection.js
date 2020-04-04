const Sequelize = require('sequelize');

const sequelize = new Sequelize('argonw_sharefood_db', 'argonw_admin_sf', 'j=.%ok~4J_Dh', {
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