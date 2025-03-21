
const express = require('express');
const router = express.Router();
const ExamForm = require('./models/examForm')
const ExamQuestions = require('./models/examQuestions')
const Question = require('./models/questions')


router.post('/create-exam', async (req, res) => {

  const { selectedQuestionIds, exam_date, subject, duration ,academic_session, fullmarks,  } = req.body;

  if (!exam_date || !academic_session || !fullmarks) {
    return res.status(400).json({ message: 'exam_date, academic_session, and fullmarks are required.' });
  }

  try {
    
    const newExam = await ExamForm.create({
      exam_date,
      subject,
      academic_session,
      duration,
      fullmarks
    });

    
    const examQuestionData = selectedQuestionIds.map((question_id) => ({
      exam_id: newExam.exam_id,
      question_id,
    }));
    
    await ExamQuestions.bulkCreate(examQuestionData);

    
    const selectedQuestions = await Question.findAll({
      where: {
        id: selectedQuestionIds 
      },
      attributes: ['id', 'questions_details'] 
    });

    
    res.status(200).json({
      message: 'Exam created successfully',
      exam: newExam,
      questions: selectedQuestions
    });
    //console.log("Exam created successfully ✔");
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});


router.get('/add-questions/:ids', async (req, res) => {

    
    const { ids } = req.params; 
    console.log(ids);
    

    
    const selectedQuestionIds = ids.split(','); 

    try {
        const questions = await Question.findAll({
            where: {
                id: selectedQuestionIds, 
            },
        });

        
        res.status(200).json(questions);
    } catch (error) {
        
        res.status(500).json({ message: 'Error fetching questions' });
        console.error('Error fetching questions:', error);
    }
});

module.exports = router;
