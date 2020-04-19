const Order = require("../models/orderModel");
const Item = require("../models/itemModel");

module.exports.CreateOrder = async (obj) => {
  var count = await Order.count();
  obj.orderNumber = "ORDER00" + (count + 1);
  var order = await Order.create(obj);

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order.orderNumber,
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

module.exports.UpdateOrder = async (obj) => {
  var order = await Order.update(obj, {
    where: {
      orderNumber: obj.orderNumber,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.CancelOrder = async (obj) => {
  obj.isActive = false;
  var order = await Order.update(obj, {
    where: {
      orderNumber: obj.orderNumber,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.DeleteOrder = async (obj) => {
  obj.isActive = false;
  obj.isDeleted = true;

  var order = await Order.update(obj, {
    where: {
      orderNumber: obj.orderNumber,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.GetAllActiveOrders = async (obj) => {
  var order = await Order.findAll({
    where: {
      isActive: true,
      isDeleted: false,
      isOrderAccepted: false,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.GetAllOrders = async (obj) => {
  var order = await Order.findAll({
    where: {
      isDeleted: false,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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

module.exports.GetOrderByUserId = async (obj) => {
  var order = await Order.findAll({
    where: {
      userId: obj.userId,
      isActive: true,
      isDeleted: false,
    },
  });

  if (order) {
    var resObj = [];
    for (let ord of order) {
      var item = await Item.findOne({
        where: {
          id: ord.itemId,
        },
      });

      if (item) {
        // console.log("***** hit ***");
        var o = {
          id: ord.id,
          userId: ord.userId,
          itemId: ord.itemId,
          unitPrice: item.unitPrice,
          sellerId: ord.sellerId,
          qty: ord.qty,
          orderNumber: ord.orderNumber,
          orderStatus: ord.orderStatus,
          isOrderAccepted: ord.isOrderAccepted,
          isInvoiceGenerated: ord.isInvoiceGenerated,
          acceptedDate: ord.acceptedDate,
          deliverOn: ord.deliverOn,
          isActive: ord.isActive,
          isDeleted: ord.isDeleted,
        };

        resObj.push(o);
      }
    }

    var obj = {
      Code: 0,
      Message: "Success!",
      Data: resObj,
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

module.exports.GetOrderByCompanyId = async (obj) => {
  var order = await Order.findAll({
    where: {
      sellerId: obj.sellerId,
      isActive: true,
      isDeleted: false,
    },
  });

  if (order) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: order,
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
