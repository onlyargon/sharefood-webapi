const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const Company = db.seq.define(
    'company',
    {
      userId: {
        type: Sequelize.INTEGER
      },
      companyName: {
        type: Sequelize.STRING
      },
      brNumber: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      mobileNumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
  
  
  Company.sync({ force: false });
  module.exports = Company;