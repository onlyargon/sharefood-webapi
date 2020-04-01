const seq = require('sequelize');
const db = require('../../_helpers/dbConnection');

const UserLog = db.seq.define(
    'userLog',
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
  
  UserLog.sync({ force: false });
  module.exports = UserLog;