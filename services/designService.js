const Design = require("../models/designModel");

module.exports.CreateDesign = async obj => {
  var design = await Design.create(obj);

  if (design) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: design
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

module.exports.UpdateDesign = async obj => {
  var design = await Design.update(obj, {
    where: {
      id: obj.id,
      userId : obj.userId
    }
  });

  if (design) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: design
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

module.exports.DeleteDesign = async obj => {
  obj.isActive = false;
  obj.isDeleted = true;

  var design = await Design.update(obj, {
    where: {
      id:obj.id,
      userId:obj.userId
    }
  });

  if (design) {
    var obj = {
      Code: 0,
      Message: "Success!",
      Data: null
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

module.exports.GetAllDesign = async obj => {
    
    var design = await Design.findAll({
      where: {
        isDeleted : false,
        isActive : true,
        userId : obj.userId
      }
    });
  
    if (design) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: design
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

module.exports.GetDesignById = async obj => {
    
    var design = await Design.findOne({
      where: {
        isDeleted : false,
        isActive : true,
        id : obj.id
      }
    });
  
    if (design) {
      var obj = {
        Code: 0,
        Message: "Success!",
        Data: design
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


