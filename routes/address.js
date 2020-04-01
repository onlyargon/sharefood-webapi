var express = require("express");
var router = express.Router();
const _service = require("../services/addressService");

router.post("/address-by-uid", function(req, res, next) {
  _service.GetAddressByUserId(req.body).then(resp => {
    res.send(resp);
  });
});

router.post("/update-address-by-uid", function(req, res, next) {
  _service.UpdateAddressByUserId(req.body).then(resp => {
    res.send(resp);
  });
});

module.exports = router;
