const SubjectPaper = require("./models/subjectPaper");
const QuestionStorage = require("./models/questionStorage");

const storeQuestion = async (req, res) => {
  const { subject, questionText, difficulty, marks, group } = req.body;
  const createdBy = req.user.name;

  console.log(req.body);
  
  // Assuming req.user is set by authentication middleware

  // Validate inputs
  if (
    !subject ||
    !questionText ||
    !difficulty ||
    !marks ||
    !group ||
    !createdBy
  ) {
    return res
      .status(401)
      .json({ success: false, message: "All fields are required." });
  }

  const calculateTotalMarks = (marksStr) => {
    return marksStr
      .split("+") // Split by '+'
      .map((num) => parseInt(num.trim(), 10)) // Convert each part to an integer
      .reduce((acc, curr) => acc + curr, 0); // Sum the values
  };

  const totalMarks = calculateTotalMarks(marks);
  console.log("📌 Total Marks Calculated:", totalMarks);

  try {
    let subjectRecord = await SubjectPaper.findOne({
      where: { subject_name: subject },
    });

    if (!subjectRecord) {
      subjectRecord = await SubjectPaper.create({ subject_name: subject });
    }

    const question_details = { marks: totalMarks, group: group  };
    console.log("📝 Question Details Before Inserting:", question_details);
    console.log("✅ Type of question_details:", typeof question_details);

    // 🔹 Store the Question in QuestionStorage Table
    const question = await QuestionStorage.create({
      subject_id: subjectRecord.id,
      question: questionText,
      difficulty: difficulty,
      questions_details: question_details,
      created_by: createdBy,
    });

    res.status(200).json({
      success: true,
      message: "Question added successfully",
      question,
    });
  } catch (error) {
    console.error("Error storing question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = storeQuestion;
