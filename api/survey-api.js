var express = require('express')
var router = express.Router();
import * as dataController from './data-controller'

router.get("/forms/:id", function(req, res){
  let id = req.params.id;
  let jsonData = dataController.getQuestionnaireById(id)
  if(jsonData){
    res.json(jsonData)
  } else {
    res.status(501)
    res.json({error: "The requested questionnaire could not be found."})
  }
})

module.exports = router;
