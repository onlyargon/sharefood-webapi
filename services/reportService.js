const Item = require("../models/itemModel");
const Profile = require("../models/profileModel");

module.exports.getMonthendSalesReport = async () =>{
    var items = await Item.findAll({
        where: {
          isDeleted: false,
        },
        order:[['userId']]
      });
      
      if (items) {

        var profiles = await Profile.findAll({
            where:{
                isDeleted : false,
            }
        });

        var resp = [];

        for(let prof of profiles){
            for(let item of items){

                if(prof.userId == item.userId){
                    var objx = {
                        userId : item.userId,
                        displayName:prof.displayName,
                        foodType:item.foodType,
                        itemId:item.id,
                        foodName : item.foodName,
                        quantity : item.quantity,
                        description:item.description,
                        unitPrice:item.unitPrice,
                        preparedOn:item.preparedOn,
                        expiryDate:item.expiryDate,
                        userLocation:item.userLocation,
                    }

                    resp.push(objx);
                }

            }
        }

        var obj = {
          Code: 0,
          Message: "Success!",
          Data: resp,
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