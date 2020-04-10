const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const Profile = db.seq.define(
    'profile',
    {
      userId: {
        type: Sequelize.INTEGER
      },
      displayName: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      mobileNumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      }
    },
    {
     timestamps: true
    }
  );
  
  
  Profile.sync({ force: false });
  module.exports = Profile;