
const express = require('express');
const router = express.Router();
const { addQuestion } = require('./addQuestions');
const authenticate = require('../auth');

const Question = require('./models/questions'); // Ensure you import the Question model
const Subject = require('./models/subject');


router.post('/add-question',  authenticate, addQuestion);

router.get('/add-question', authenticate, async (req, res) => {
    try {
      const questions = await Question.findAll({
        include: {
          model: Subject,
          attributes: ['subject_name'],  // Only include subject_name from Subject table
        },
        order: [['question', 'ASC']],
      }); // Fetch all questions from the database
      res.json(questions);
      //console.log(questions);
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;

