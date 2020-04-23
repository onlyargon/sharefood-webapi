const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const Rating = db.seq.define(
    'rating',
    {
      userId: {
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.STRING
      },
      sellerId: {
        type: Sequelize.STRING
      },
      orderId:{
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      starRating: {
        type: Sequelize.INTEGER
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
  
  
  Rating.sync({ force: false });
  module.exports = Rating;