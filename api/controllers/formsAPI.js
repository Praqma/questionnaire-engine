var express = require('express')
var router = express.Router();
import * as yalmData from '../models/yamlData'
import * as formDB from '../models/formDB'

router.get("/:questionnaireID", function(req, res){
  let questionnaireID = req.params.questionnaireID;
  let jsonData = yalmData.getQuestionnaireById(questionnaireID)

  if (jsonData){
    res.json(jsonData)
  } else {
    res.status(501)
    res.json({error: "The requested questionnaire could not be found."})
  }
})

router.post('/:questionnaireID', function (req, res) {
  let questionnaireID = req.params.questionnaireID;
  let formResponse = req.body;

  if (!formResponse) {
    req.status(400);
    res.json({error: "Did not receive payload."})
  }

  formDB.insertFormResponse(questionnaireID, formResponse, (err, result) => {
    if (err) {
      res.status(501)
      res.json({error: "The data could not be stored in the database."})
    } else {
      res.json({status: 100, message: "Successfuly inserted data."})
    }
  })

});

export default router;
