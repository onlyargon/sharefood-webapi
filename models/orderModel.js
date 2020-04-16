const db = require('../_helper/dbConnection');
const Sequelize = require('sequelize');

const Order = db.seq.define(
    'order',
    {
      userId: {
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.INTEGER
      },
      sellerId: {
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
      },
      orderNumber: {
        type: Sequelize.STRING
      },
      orderStatus: {
        type: Sequelize.STRING,
        defaultValue: "Pending"
      },
      isOrderAccepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isInvoiceGenerated: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      acceptedDate: {
        type: Sequelize.STRING
      },
      deliverOn: {
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
  
  
  Order.sync({ force: false });
  module.exports = Order;