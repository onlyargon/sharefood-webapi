var express = require("express");
var router = express.Router();
const _service = require("../services/orderService");

router.post("/create", function(req, res, next) {
  _service.CreateOrder(req.body).then(resp => {
    res.send(resp);
  });
});

router.post("/update", function(req, res, next) {
  _service.UpdateOrder(req.body).then(resp => {
    res.send(resp);
  });
});

router.post("/delete", function(req, res, next) {
    _service.DeleteOrder(req.body).then(resp => {
      res.send(resp);
    });
  });

  router.post("/cancel", function(req, res, next) {
    _service.CancelOrder(req.body).then(resp => {
      res.send(resp);
    });
  });

  router.post("/get-all-active", function(req, res, next) {
    _service.GetAllActiveOrders(req.body).then(resp => {
      res.send(resp);
    });
  });


  router.post("/get-all", function(req, res, next) {
    _service.GetAllOrders(req.body).then(resp => {
      res.send(resp);
    });
  });

  router.post("/get-by-uid", function(req, res, next) {
    _service.GetOrderByUserId(req.body).then(resp => {
      res.send(resp);
    });
  });

  router.post("/get-by-comId", function(req, res, next) {
    _service.GetOrderByCompanyId(req.body).then(resp => {
      res.send(resp);
    });
  });


module.exports = router;