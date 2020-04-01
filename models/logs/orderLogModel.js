const seq = require('sequelize');
const db = require('../../_helpers/dbConnection');

const OrderLog = db.seq.define(
    'orderLog',
    {
      request: {
        type: seq.TEXT
      },
      response: {
        type: seq.TEXT
      }
    },
    {
      timestamps: true
    }
  );
  
  OrderLog.sync({ force: false });
  module.exports = OrderLog;