const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const Address = db.seq.define(
    'address',
    {
      userId: {
        type: Sequelize.INTEGER
      },
      addressLine1: {
        type: Sequelize.STRING
      },
      addressLine2: {
        type: Sequelize.STRING
      },
      addressLine3: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
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
  
  
  Address.sync({ force: false });
  module.exports = Address;