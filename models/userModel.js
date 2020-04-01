const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const User = db.seq.define(
    'user',
    {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      userType: {
        type: Sequelize.STRING
      },
    },
    {
     timestamps: true
    }
  );
  
  
  User.sync({ force: false });
  module.exports = User;