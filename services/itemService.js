const Item = require("../models/itemModel");
const Favorite = require("../models/favoritesModel");
const { Op } = require("sequelize");

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
        expiryDate : {
          [Op.gt] : new Date()
        }
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

module.exports.GetItemDetailsByItemId = async obj => {
    
  var item = await Item.findOne({
    where: {
      id : obj.itemId,
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


// Favorites
module.exports.AddFavorite = async obj => {

  var fav = await Favorite.create(obj);

  if (fav) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: fav
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

module.exports.RemoveFavorite = async obj => {

  var fav = await Favorite.destroy({
    where :{
      userId : obj.userId,
      itemId : obj.itemId
    }
  });

  if (fav) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: fav
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

module.exports.GetFavItemList = async obj => {

  var fav = await Favorite.findAll({
    where:{
      userId:obj.userId
    }
  });

  var itemList = [];
  for(const favItem of fav){
    var item = await Item.findOne({
      where:{
        id : favItem.itemId
      }
    });

    if(item){
      itemList.push(item);
    }
  };

  if (itemList) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: itemList
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