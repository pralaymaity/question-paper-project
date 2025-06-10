
const  ExamForm  = require('../models/examForm');

const demoExam = async (req, res) => {

  const { subject } = req.params;

  try {
     const exam = await ExamForm.findOne({
    where: { subject }, // ✅ this works since subject exists
  });

  if (!exam) {
    return res.status(404).json({ error: "No exam found for subject" });
  }

  return res.json({
    exam_id: exam.exam_id,
    fullmarks: exam.fullmarks,
    duration: exam.duration,
  });
  } catch (err) {
    console.error("Error fetching demo exam:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { demoExam };
