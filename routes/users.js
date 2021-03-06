var express = require('express');
var router = express.Router();
const _service = require("../services/userService");


router.post('/create', function(req, res, next) {
  _service.CreateUser(req.body)
  .then(resp =>{
    res.send(resp);
  });
});

router.post('/update', function(req, res, next) {
  _service.UpdateUser(req.body)
  .then(resp =>{
    res.send(resp);
  });
});

router.post('/delete', function(req, res, next) {
  _service.DeleteUser(req.body)
  .then(resp =>{
    res.send(resp);
  });
});

router.post('/user-profile-by-id', function(req, res, next) {
  _service.GetUserById(req.body)
  .then(resp =>{
    res.send(resp);
  });
});

module.exports = router;
