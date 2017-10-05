import * as formDB from '../models/formDB'
import * as responseData from '../models/formDB'
import express from 'express'
let router = express.Router();

router.get("/:id", function(req, res){
  let questionnaireID = req.params.id;

  formDB.getAllAnswersById(questionnaireID, (err, results) => {
    if (err) {
      res.status(501)
      return res.json({error: "The requested questionnaire could not be found."})
    }
    res.json(results)
  })

})

export default router;
