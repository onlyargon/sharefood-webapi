var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const _service = require("../services/authService");

router.post('/validate', function(req, res, next) {
  _service.ValidateUser(req.body)
  .then(resp =>{
    if(resp.Code == 0){
        jwt.sign({ data: resp }, 'argons-web-apis', { expiresIn: '12h' }, (err, token) => {
            res.json({
              token : token,
              data :resp
            });
          });
    } else {
        res.send(false);
    }
  });
});

module.exports = router;