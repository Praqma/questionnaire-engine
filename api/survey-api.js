var express = require('express')
var router = express.Router();
import { getAllData } from './data-controller'

router.get("/all", function(req, res) {
  getAllData(function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data)
  })
})

module.exports = router;
