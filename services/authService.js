const User = require("../models/userModel");
const Company = require("../models/companyModel");
const Profile = require("../models/profileModel");

module.exports.ValidateUser = async user => {
  
    var user = await User.findOne({
      where: {
        username: user.networkStatus1,
        password: user.networkStatus2,
        isActive: true,
        isDeleted: false
      }
    });
  
    if (user) {
      if (user.userType == "Customer") {
        var profile = await Profile.findOne({
          where: {
            userId: user.id,
            isActive: true,
            isDeleted: false
          }
        });
  
        if (profile) {
          var obj = {
            Code: 0,
            Message: "Success",
            Data: profile
          };
  
          return obj;
        } else {
          var obj = {
            Code: 1,
            Message: "User not found!",
            Data: null
          };
  
          return obj;
        }
      }
  
      if (user.userType == "Company") {
        var profile = await Company.findOne({
          where: {
            userId: user.id,
            isActive: true,
            isDeleted: false
          }
        });
  
        if (profile) {
          var obj = {
            Code: 0,
            Message: "Success",
            Data: profile
          };
  
          return obj;
        } else {
          var obj = {
            Code: 1,
            Message: "User not found!",
            Data: null
          };
  
          return obj;
        }
      }
    }
  
    var obj = {
      Code: 1,
      Message: "Failed",
      Data: null
    };
  
    return obj;
  };