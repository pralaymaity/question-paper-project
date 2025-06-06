
const express = require('express');
const router = express.Router();
const { addQuestion } = require('../controllers/addQuestions');
const authenticate = require('../../middleware/auth');

const Question = require('../models/questions'); 
const Subject = require('../models/subject');


router.post('/add-question',  authenticate, addQuestion);

router.get('/get-question', authenticate, async (req, res) => {
    try {
      const questions = await Question.findAll({
        include: {
          model: Subject,
          attributes: ['subject_name'],  
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

