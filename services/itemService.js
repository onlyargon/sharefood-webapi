const Item = require("../models/itemModel");

module.exports.CreateItem = async obj => {

  var item = await Item.create(obj);

  if (item) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: item
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

module.exports.UpdateItem = async obj => {
  var item = await Item.update(obj, {
    where: {
      orderNumber: obj.id
    }
  });

  if (item) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: item
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

module.exports.DeleteItem = async obj => {

    obj.isActive = false;
    obj.isDeleted = true;

    var item = await Item.update(obj, {
      where: {
        id: obj.id
      }
    });
  
    if (item) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: item
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

module.exports.GetAllActiveItem = async obj => {
    
    var item = await Item.findAll({
      where: {
        isActive : true,
        isDeleted : false,
      }
    });
  
    if (item) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: item
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

module.exports.GetAllItem = async obj => {
    
    var items = await Item.findAll({
      where: {
        isDeleted : false,
      }
    });
  
    if (items) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: items
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

module.exports.GetItemsByUserId = async obj => {
    
    var items = await Item.findAll({
      where: {
        userId : obj.userId,
        isActive: true,
        isDeleted : false,
      }
    });
  
    if (items) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: items
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
