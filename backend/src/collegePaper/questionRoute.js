
const express = require('express');
const router = express.Router();

const authenticate = require('../auth')
const storeQuestion = require('./storeQuestion');
const QuestionStorage = require('./models/questionStorage');
const SubjectPaper = require('./models/subjectPaper');


router.post( "/store-question" , authenticate , storeQuestion  )

router.get('/take-question', authenticate, async (req, res) => {
    try {
      const questions = await QuestionStorage.findAll({
        include: {
          model: SubjectPaper,
          attributes: ['subject_name'],  // Only include subject_name from SubjectPaper table
        },
        order: [['question', 'ASC']],
      }); 
      res.json(questions);
      //console.log(questions);
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;