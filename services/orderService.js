const Order = require("../models/orderModel");

module.exports.CreateOrder = async obj => {

  var count = await Order.count();  
  obj.orderNumber = "ORDER00" + (count+1);
  var order = await Order.create(obj);

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order
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

module.exports.UpdateOrder = async obj => {
  var order = await Order.update(obj, {
    where: {
      orderNumber: obj.orderNumber
    }
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order
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

module.exports.CancelOrder = async obj => {

    obj.isActive = false;
    var order = await Order.update(obj, {
      where: {
        orderNumber: obj.orderNumber
      }
    });
  
    if (order) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: order
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

module.exports.DeleteOrder = async obj => {

    obj.isActive = false;
    obj.isDeleted = true;

    var order = await Order.update(obj, {
      where: {
        orderNumber: obj.orderNumber
      }
    });
  
    if (order) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: order
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

module.exports.GetAllActiveOrders = async obj => {
    
    var order = await Order.findAll({
      where: {
        isActive : true,
        isDeleted : false,
        isOrderAccepted : false
      }
    });
  
    if (order) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: order
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

module.exports.GetAllOrders = async obj => {
    
    var order = await Order.findAll({
      where: {
        isDeleted : false,
      }
    });
  
    if (order) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: order
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

module.exports.GetOrderByUserId = async obj => {
    
    var order = await Order.findAll({
      where: {
        buyerId : obj.userId,
        isActive: true,
        isDeleted : false,
      }
    });
  
    if (order) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: order
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

module.exports.GetOrderByCompanyId = async obj => {
    
    var order = await Order.findAll({
      where: {
        sellerId : obj.sellerId,
        isActive: true,
        isDeleted : false,
      }
    });
  
    if (order) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: order
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
