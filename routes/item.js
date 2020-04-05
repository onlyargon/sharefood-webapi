var express = require("express");
var router = express.Router();
const _service = require("../services/itemService");

router.post("/create", function (req, res, next) {
  _service.CreateItem(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/update", function (req, res, next) {
  _service.UpdateItem(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/delete", function (req, res, next) {
  _service.DeleteItem(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/get-all-active", function (req, res, next) {
  _service.GetAllActiveItem(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/get-all", function (req, res, next) {
  _service.GetAllItem(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/get-by-uid", function (req, res, next) {
  _service.GetItemsByUserId(req.body).then((resp) => {
    res.send(resp);
  });
});

module.exports = router;
