var express = require('express')
var router = express.Router();
// import * as dataController from './data-controller'

router.post('/:questionnaireID', function (req, res) {
  let questionnaireID = req.params.questionnaireID;
  res.send(req.body);
});

module.exports = router;
