const User = require("../models/userModel");
const Company = require("../models/companyModel");
const Profile = require("../models/profileModel");

const atob = require("atob");
const btoa = require("btoa");

module.exports.ValidateUser = async (user) => {
  var user = await User.findOne({
    where: {
      username: atob(user.networkStatus1),
      password: atob(user.networkStatus2),
      isActive: true,
      isDeleted: false,
    },
  });

  if (user) {
    // if (user.userType == "HOUSEHOLD") {
      var profile = await Profile.findOne({
        where: {
          userId: user.id,
          isActive: true,
          isDeleted: false,
        },
      });

      if (profile) {
        var passObj = {
          userId: user.id,
          username: user.username,
          isProfileCompleted: true,
        };
        var obj = {
          Code: 0,
          Message: "Success",
          Data: passObj,
        };

        return obj;
      } else {
        var passObj = {
          userId: user.id,
          username: user.username,
          isProfileCompleted: false,
        };
        var obj = {
          Code: 0,
          Message: "Success",
          Data: passObj,
        };

        return obj;
      }
    // }

    // if (user.userType == "BUSINESS") {
    //   var profile = await Company.findOne({
    //     where: {
    //       userId: user.id,
    //       isActive: true,
    //       isDeleted: false,
    //     },
    //   });

    //   if (profile) {
    //     var passObj = {
    //       userId: user.id,
    //       username: user.username,
    //       isProfileCompleted: true,
    //     };
    //     var obj = {
    //       Code: 0,
    //       Message: "Success",
    //       Data: passObj,
    //     };

    //     return obj;
    //   } else {
    //     var passObj = {
    //       userId: user.id,
    //       username: user.username,
    //       isProfileCompleted: false,
    //     };
    //     var obj = {
    //       Code: 0,
    //       Message: "Success",
    //       Data: passObj,
    //     };

    //     return obj;
    //   }
    // }
  }

  var obj = {
    Code: 1,
    Message: "Failed",
    Data: null,
  };

  return obj;
};

module.exports.CreateUser = async (user) => {
  let username = atob(user.basicInfo.networkStatus1);
  var count = await User.count({
    where: {
      username: username,
    },
  });

  if (count > 0) {
    var obj = {
      Code: 1,
      Message: "Username already exist!",
      Data: null,
    };

    return obj;
  } else {
    console.log(user);
    user.basicInfo.username = atob(user.basicInfo.networkStatus1);
    user.basicInfo.password = atob(user.basicInfo.networkStatus2);

    var createdUser = await User.create(user.basicInfo);
    console.log(createdUser);
    if (createdUser) {
      var obj = {
        Code: 0,
        Message: "Please login to continue!",
        Data: null,
      };

      return obj;
    } else {
      var obj = {
        Code: 1,
        Message: "Something went wrong!",
        Data: null,
      };

      return obj;
    }
  }
};
