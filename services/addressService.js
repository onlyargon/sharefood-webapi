const Address = require("../models/addressModel");

module.exports.GetAddressByUserId = async obj => {
  var address =  await Address.findOne({
    where: {
      userId: obj.userId,
      isActive: true,
      isDeleted: false
    }
  });

  if(address){
    var obj = {
        Code: 0,
        Message: "Success!",
        Data: address
      };
    
      return obj;
  } else {
    var obj = {
        Code: 1,
        Message: "Something went wrong!",
        Data: null
      };
    
      return obj;
  }
  
};

module.exports.UpdateAddressByUserId = async obj => {
  var address =  await Address.update(obj, {
    where: {
      userId: obj.userId,
      isActive: true,
      isDeleted: false
    }
  });

  if(address){
    var obj = {
        Code: 0,
        Message: "Success!",
        Data: address
      };
    
      return obj;
  } else {
    var obj = {
        Code: 1,
        Message: "Something went wrong!",
        Data: null
      };
    
      return obj;
  }
};
