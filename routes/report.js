var express = require('express');
var router = express.Router();

const _service = require("../services/reportService");

router.post('/get-month-end-sales', function(req, res, next) {
    _service.getMonthendSalesReport(req.body)
    .then(resp =>{
        res.send(resp);
  });
});

module.exports = router;