const seq = require('sequelize');
const db = require('../../_helpers/dbConnection');

const AddressLog = db.seq.define(
    'addressLog',
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
  
  AddressLog.sync({ force: false });
  module.exports = AddressLog;