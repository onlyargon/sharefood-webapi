const Rating = require("../models/ratingModel");
const Profile = require("../models/profileModel");
const Item = require("../models/itemModel");

module.exports.CreateRate = async (obj) => {
  var item = await Rating.create(obj);

  var product = await Item.findOne({
    where: {
      id: obj.itemId,
    },
  });

  var profile = await Profile.findOne({
    where: {
      userId: product.userId,
    },
  });

  var totalRatingsForSeller = await Rating.findAll({
    where: {
      sellerId: product.userId,
    },
  });

  var totalRating = 0;
  for (let rate of totalRatingsForSeller) {
    totalRating = totalRating + rate.starRating;
  }

  var userLevel = 0;

  if (totalRating > 100) {
    userLevel = 5;
  } else if (totalRating > 75) {
    userLevel = 4;
  } else if (totalRating > 50) {
    userLevel = 3;
  } else if (totalRating > 25) {
    userLevel = 2;
  } else if (totalRating > 10) {
    userLevel = 1;
  }

  var _up = await Profile.update(
    { level: userLevel },
    {
      where: {
        userId: product.userId,
      },
    }
  );

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

module.exports.UpdateRate = async (obj) => {
  var item = await Rating.update(obj, {
    where: {
      id: obj.id,
    },
  });

  var product = await Item.findOne({
    where: {
      id: obj.itemId,
    },
  });
  var profile = await Profile.findOne({
    where: {
      userId: product.userId,
    },
  });

  var totalRating = Number(profile.level) + item.starRating / 5;

  var _up = await Profile.update(
    { level: totalRating },
    {
      where: {
        userId: obj.userId,
      },
    }
  );

  if (item) {
    var obj = {
      Code: 0,
      Message: "Success!",
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

module.exports.DeleteRate = async (obj) => {
  obj.isActive = false;
  obj.isDeleted = true;

  var item = await Rating.update(obj, {
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

module.exports.GetAllActiveRates = async (obj) => {
  var item = await Rating.findAll({
    where: {
      isActive: true,
      isDeleted: false,
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

module.exports.GetAllRating = async (obj) => {
  var items = await Rating.findAll({
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

module.exports.GetRateByUserId = async (obj) => {
  var items = await Rating.findAll({
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

module.exports.GetRateByItemId = async (obj) => {
  var items = await Rating.findAll({
    where: {
      itemId: obj.itemId,
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
