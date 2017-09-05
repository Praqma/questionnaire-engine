var express = require('express')
var router = express.Router();
import * as dataController from './data-controller'

router.get("/forms", function(req, res) {
  let allData = dataController.getAllQuestionnaire();
  if (allData && allData.length > 0) {
    res.json(allData);
  } else {
    res.json({error: "Something went wrong."})
  }
})

router.get("/forms/:id", function(req, res){
  console.log('Getting form with id: ' + req.params.id);

})

module.exports = router;
