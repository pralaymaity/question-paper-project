const express = require("express");
const router = express.Router();

const {ExamForm, ExamQuestions, Question} = require("./associations")

router.get("/exam/:exam_id", async (req, res) => {

  
  const { exam_id } = req.params;

  if (!exam_id) {
    return res.status(400).json({ error: "Exam ID is required" });
  }

  try {
    const exam = await ExamForm.findOne({
      where: { exam_id: exam_id },
      include: [
        {
          model: Question,
          through: {
            model: ExamQuestions,
            attributes: [], 
          },
          attributes: ['question', 'questions_details'], 
        },
      ],
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Send the exam form details along with questions and answer options
    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ error: "Failed to fetch exam" });
  }
});

module.exports = router;
