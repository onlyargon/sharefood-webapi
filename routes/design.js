var express = require("express");
var router = express.Router();
const _service = require("../services/designService");

router.post("/create", function(req, res, next) {
    _service.CreateDesign(req.body).then(resp => {
      res.send(resp);
    });
  });

  router.post("/update", function(req, res, next) {
    _service.UpdateDesign(req.body).then(resp => {
      res.send(resp);
    });
  });


  router.post("/delete", function(req, res, next) {
    _service.DeleteDesign(req.body).then(resp => {
      res.send(resp);
    });
  });

  router.post("/get-all", function(req, res, next) {
    _service.GetAllDesign(req.body).then(resp => {
      res.send(resp);
    });
  });

  router.post("/get-by-id", function(req, res, next) {
    _service.GetAllDesignById(req.body).then(resp => {
      res.send(resp);
    });
  });

  module.exports = router;

