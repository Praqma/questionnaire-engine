var express = require('express')
var router = express.Router();
import * as dataController from '../models/yamlData'
import * as db from '../models/db'

router.get("/:id", function(req, res){
  let id = req.params.id;
  let jsonData = dataController.getQuestionnaireById(id)
  if(jsonData){
    res.json(jsonData)
  } else {
    res.status(501)
    res.json({error: "The requested questionnaire could not be found."})
  }
})

router.post('/:questionnaireID', function (req, res) {
  let questionnaireID = req.params.questionnaireID;
  db.addAnswer(req.body, function(err, result) {
    if (err) {
      res.status(501)
      res.json({error: "The data could not be stored in the database."})
    }
    db.allAnswers(function(err, docs) {
      if (err) {
        res.status(501)
        res.json({error: "All answers cannot be loaded."})
      }
      res.send(docs);
    })
  })
});

export default router;
