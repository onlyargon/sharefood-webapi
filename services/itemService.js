const Item = require("../models/itemModel");
const Favorite = require("../models/favoritesModel");
const User = require("../models/userModel");
const Rate = require("../models/ratingModel");
const { Op } = require("sequelize");

const moment = require("moment");

module.exports.CreateItem = async (obj) => {
  var exdate = moment(obj.expiryDate).format("YYYY-MM-DD");
  var ppdate = moment(obj.preparedOn).format("YYYY-MM-DD");

  obj.expiryDate = exdate;
  obj.preparedOn = ppdate;

  var item = await Item.create(obj);

  if (item) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: item,
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

module.exports.UpdateItem = async (obj) => {
  var exdate = moment(obj.expiryDate).format("YYYY-MM-DD");
  var ppdate = moment(obj.preparedOn).format("YYYY-MM-DD");

  obj.expiryDate = exdate;
  obj.preparedOn = ppdate;

  var item = await Item.update(obj, {
    where: {
      id: obj.id,
    },
  });

  if (item) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: item,
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

module.exports.DeleteItem = async (obj) => {
  obj.isActive = false;
  obj.isDeleted = true;

  var item = await Item.update(obj, {
    where: {
      id: obj.id,
    },
  });

  if (item) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: item,
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

module.exports.GetAllActiveItem = async (obj) => {
  var date = moment(new Date()).subtract(1, "days");
  date = date.format("YYYY-MM-DD");

  var expItemList = await Item.findAll({
    where: {
      isActive: true,
      expiryDate: {
        [Op.lte]: date,
      }
    },
  });

  console.log(expItemList.length);

  if (expItemList.length > 0) {
    for (let item of expItemList) {
      await Item.update(
        { isActive: false },
        {
          where: {
            id: item.id,
          },
        }
      );
      console.log(item);
    }
  }

  var item = await Item.findAll({
    where: {
      isDeleted: false,
      isActive: true,
      userLocation: obj.userLocation
    },
    order: [["id", "DESC"]],
  });

  if (item) {
    var res = [];
    for (let i of item) {
      var fav = await Favorite.findOne({
        where: {
          userId: obj.userId,
          itemId: i.id,
        },
      });

      var o = {
        id: i.id,
        userId: i.userId,
        foodType: i.foodType,
        foodName: i.foodName,
        quantity: i.quantity,
        description:i.description,          
        unitPrice: i.unitPrice,
        itemImage: i.itemImage,
        preparedOn: i.preparedOn,
        expiryDate: i.expiryDate,
        isActive: i.isActive,
        userLocation:i.userLocation,
        isDeleted: i.isDeleted,
        isFavorite: fav ? true : false,
        favId : fav?  fav.id : false
      };

      res.push(o);
    }

    var obj = {
      Code: 0,
      Message: "Success!",
      Data: res,
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

module.exports.GetItemDetailsByItemId = async (obj) => {
  var item = await Item.findOne({
    where: {
      id: obj.itemId,
      isActive: true,
      isDeleted: false,
    },
  });

  if (item) {
    var user = await User.findOne({
      where: {
        id: item.userId,
      },
    });

    console.log("********************");
    console.log(user.username);
    console.log("********************");

    var response = {
      id: item.id,
      userId: item.userId,
      username: user.username,
      foodType: item.foodType,
      foodName: item.foodName,
      quantity: item.quantity,
      description: item.description,
      itemImage: item.itemImage,
      unitPrice: item.unitPrice,
      preparedOn: item.preparedOn,
      expiryDate: item.expiryDate,
      isActive: item.isActive,
      isDeleted: item.isDeleted,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };

    var obj = {
      Code: 0,
      Message: "Success!",
      Data: response,
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

module.exports.GetAllItem = async (obj) => {
  var items = await Item.findAll({
    where: {
      isDeleted: false,
    },
  });

  if (items) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: items,
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

module.exports.GetItemsByUserId = async (obj) => {
  var items = await Item.findAll({
    where: {
      userId: obj.userId,
      isActive: true,
      isDeleted: false,
    },
  });

  if (items) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: items,
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

// Favorites
module.exports.AddFavorite = async (obj) => {
  var fav = await Favorite.create(obj);

  if (fav) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: fav,
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

module.exports.RemoveFavorite = async (obj) => {
  var fav = await Favorite.destroy({
    where: {
      userId: obj.userId,
      itemId: obj.itemId,
    },
  });

  if (fav) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: fav,
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

module.exports.GetFavItemList = async (obj) => {
  var fav = await Favorite.findAll({
    where: {
      userId: obj.userId,
    },
  });

  var itemList = [];
  for (const favItem of fav) {
    var item = await Item.findOne({
      where: {
        id: favItem.itemId,
      },
    });

    if (item) {
      itemList.push(item);
    }
  }

  if (itemList) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: itemList,
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
