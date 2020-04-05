const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const Item = db.seq.define(
    'item',
    {
      userId: {
        type: Sequelize.INTEGER
      },
      foodType: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      preparedOn: {
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
  
  
  Item.sync({ force: false });
  module.exports = Item;