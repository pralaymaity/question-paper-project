
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
    // Step 1: Create a new exam form
    const newExam = await ExamForm.create({
      exam_date,
      subject,
      academic_session,
      duration,
      fullmarks
    });

    // Step 2: Link selected questions to the new exam in ExamQuestions table
    const examQuestionData = selectedQuestionIds.map((question_id) => ({
      exam_id: newExam.exam_id,
      question_id,
    }));
    
    await ExamQuestions.bulkCreate(examQuestionData);

    // Step 3: Fetch questions along with their answer options from the Questions table
    const selectedQuestions = await Question.findAll({
      where: {
        id: selectedQuestionIds // Fetch all questions by their IDs
      },
      attributes: ['id', 'questions_details'] // Bring question details (including options)
    });

    // Step 4: Return both the exam form details and the selected questions with options
    res.status(200).json({
      message: 'Exam created successfully',
      exam: newExam,
      questions: selectedQuestions
    });
    console.log("Exam created successfully ✔");
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

// Route to get multiple questions by their IDs
router.get('/add-questions/:ids', async (req, res) => {

    // Use req.params instead of req.query to get ids from the path
    const { ids } = req.params; 

    // Split the string into an array of IDs
    const selectedQuestionIds = ids.split(','); 

    try {
        const questions = await Question.findAll({
            where: {
                id: selectedQuestionIds, // Match the IDs in the question table
            },
        });

        // Return the questions as a JSON response
        res.status(200).json(questions);
    } catch (error) {
        
        res.status(500).json({ message: 'Error fetching questions' });
        console.error('Error fetching questions:', error);
    }
});

module.exports = router;
