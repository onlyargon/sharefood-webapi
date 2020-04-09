const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const Favorite = db.seq.define(
    'favorite',
    {
      userId: {
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.STRING
      },
      isItem: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
  
  
  Favorite.sync({ force: false });
  module.exports = Favorite;