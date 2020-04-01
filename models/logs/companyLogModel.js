const seq = require('sequelize');
const db = require('../../_helpers/dbConnection');

const CompanyLog = db.seq.define(
    'companyLog',
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
  
  CompanyLog.sync({ force: false });
  module.exports = CompanyLog;