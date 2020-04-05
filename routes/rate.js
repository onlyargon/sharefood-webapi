var express = require("express");
var router = express.Router();
const _service = require("../services/ratingService");

router.post("/create", function (req, res, next) {
  _service.CreateRate(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/update", function (req, res, next) {
  _service.UpdateRate(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/delete", function (req, res, next) {
  _service.DeleteRate(req.body).then((resp) => {
    res.send(resp);
  });
});


router.post("/get-all-active", function (req, res, next) {
  _service.GetAllActiveRates(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/get-all", function (req, res, next) {
  _service.GetAllRating(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/get-by-uid", function (req, res, next) {
  _service.GetRateByUserId(req.body).then((resp) => {
    res.send(resp);
  });
});

router.post("/get-by-ItemId", function (req, res, next) {
  _service.GetRateByItemId(req.body).then((resp) => {
    res.send(resp);
  });
});

module.exports = router;
