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
  let id = parseInt(req.params.id);
  let jsonData = dataController.getQuestionnaireById(id)
  if(jsonData){
    res.json(jsonData)
  } else {
    res.json({error: "Something went wrong."})
  }
})

router.post('/forms/:id', function (req, res) {
  let id = req.params.id;
  console.log(id + "\n" + req.body);
  res.send(req.body);
});

module.exports = router;
