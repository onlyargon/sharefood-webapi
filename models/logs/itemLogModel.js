const seq = require('sequelize');
const db = require('../../_helpers/dbConnection');

const ItemLog = db.seq.define(
    'itemLog',
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
  
  ItemLog.sync({ force: false });
  module.exports = ItemLog;