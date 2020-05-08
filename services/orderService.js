const Order = require("../models/orderModel");
const Item = require("../models/itemModel");
const Rate = require("../models/ratingModel");

module.exports.CreateOrder = async (obj) => {
  var count = await Order.count();
  obj.orderNumber = "ORDER00" + (count + 1);
  var order = await Order.create(obj);

  if (order) {
    var orderPlacedItem = await Item.findOne({
      where:{
        id: obj.itemId
      }
    })

    var qty = Number(orderPlacedItem.quantity) - Number(obj.qty);
    var _ = await Item.update({quantity:qty},{where:{
      id:orderPlacedItem.id
    },});

    var resObj = {
      orderId : order.id,
      orderNumber : order.orderNumber
    }
    
    var obj = {
      Code: 0,
      Message: "Success!",
      Data:resObj,
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
    order: [
      ['id', 'DESC'],
    ]
  });

  if (order) {
    var resObj = [];
    for (let ord of order) {

      var item = await Item.findOne({
        where: {
          id: ord.itemId,
        },
      });

      var rate  = await Rate.findOne({
        where:{
          orderId : ord.id
        }
      });

      // var seller = await.

      if (item) {
        // console.log("***** hit ***");
        var o = {
          id: ord.id,
          userId: ord.userId,
          itemId: ord.itemId,
          foodName: item.foodName,
          unitPrice: item.unitPrice,
          itemImage: item.itemImage,
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
          isRated : rate ? true : false,
          rate : rate ? rate : null
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
