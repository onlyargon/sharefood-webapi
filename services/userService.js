const atob = require("atob");
const btoa = require("btoa");

const User = require("../models/userModel");
const Company = require("../models/companyModel");
const Profile = require("../models/profileModel");
const Address = require("../models/addressModel");
const Item = require("../models/itemModel");
const Rate = require("../models/ratingModel");

// User
module.exports.CreateUser = async user => {
  
  let username = user.basicInfo.username;
  var count = await User.count({
    where: {
      username: username
    }
  });

  if (count > 0) {
    var obj = {
      Code: 1,
      Message: "Username already exist!",
      Data: null
    };

    return obj;
  } else {
    user.basicInfo.password = btoa(user.basicInfo.password);
    user.basicInfo.userType = "Customer";
    var createdUser = await User.create(user.basicInfo);
    if (createdUser) {
      user.profile.userId = createdUser.id;
      user.address.userId = createdUser.id;
      if (createdUser.userType == "Customer") {
        var createdProfile = await Profile.create(user.profile);

        var obj = {
          Code: 0,
          Message: "Please login to continue!",
          Data: null
        };

        return obj;
      } else {
        var createdProfile = await Company.create(user.profile);

        var obj = {
          Code: 0,
          Message: "Please login to continue!",
          Data: null
        };
      }

      var userAddress = await Address.create(user.address);
    } else {
      var obj = {
        Code: 1,
        Message: "Something went wrong!",
        Data: null
      };

      return obj;
    }
  }
};

module.exports.UpdateUser = async (user) => {
  var usr = await User.findOne({
    where: {
      id: user.basicInfo.userId,
    },
  });

  if (usr.userType == "HOUSEHOLD") {
    var updatedProfile = await Profile.update(user.basicInfo, {
      where: {
        userId: user.basicInfo.userId,
      },
    });
  } else {
    var updatedProfile = await Company.update(user.basicInfo, {
      where: {
        userId: user.basicInfo.userId,
      },
    });
  }

  var updateAddress = await Address.update(user.address, {
    where: {
      userId: user.address.userId,
    },
  });

  if (updatedProfile && updateAddress) {
    var obj = {
      Code: 0,
      Message: "User updated!",
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
};

module.exports.DeleteUser = async user => {
  user.basicInfo.isDelete = true;
  user.basicInfo.isActive = false;

  user.profile.isDelete = true;
  user.profile.isActive = false;

  user.address.isDelete = true;
  user.address.isActive = false;

  var _ = await User.update(user.basicInfo, {
    where: {
      userId: user.basicInfo.userId
    }
  });

  var _ = await Profile.update(user.profile, {
    where: {
      userId: user.profile.userId
    }
  });

  var _ = await Address.update(user.address, {
    where: {
      userId: user.address.userId
    }
  });

  var obj = {
    Code: 0,
    Message: "User has deleted!",
    Data: null
  };

  return obj;
};

module.exports.GetUserById = async (user) => {
  var _user = await User.findOne({where : {
    id : user.userId
  }});

  if(_user){
 
      var items = await Item.findAll({where : {
        userId : _user.id,
        isDeleted: false
      },
      attributes: { exclude: ['isDeleted','createdAt','updatedAt'] }});

      var itemsWithRating = [];
      if(items){
      for (const _item of items){
        var _ratings = await Rate.findAll({where : {
          itemId : _item.id
        }});

        var _obj = {
          item : _item,
          rating : _ratings
        }

        itemsWithRating.push(_obj);
      };
    }

    var _res = {
      userInfo : {
        username : _user.username,
        joinedDate : _user.createdAt
      },
      itemsWithRating
    }

    var obj = {
      Code: 0,
      Message: "Success",
      Data: _res
    };
  
    return obj;

  }

  var obj = {
    Code: 1,
    Message: "Failed",
    Data: null
  };

  return obj;
};

module.exports.ValidateUser = async user => {
  let username = atob(user.networkStatus1);
  let password = atob(user.networkStatus2);

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
