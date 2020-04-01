const seq = require('sequelize');
const db = require('../../_helpers/dbConnection');

const ProfileLog = db.seq.define(
    'profileLog',
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
  
  ProfileLog.sync({ force: false });
  module.exports = ProfileLog;