const seq = require('sequelize');
const db = require('../../_helpers/dbConnection');

const DesignLog = db.seq.define(
    'designLog',
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
  
  DesignLog.sync({ force: false });
  module.exports = DesignLog;