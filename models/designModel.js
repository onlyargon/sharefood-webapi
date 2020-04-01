const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const Design = db.seq.define(
    'design',
    {
      userId: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      occasion: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      sole: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      lace: {
        type: Sequelize.STRING
      },
      attachment: {
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
  
  
  Design.sync({ force: false });
  module.exports = Design;