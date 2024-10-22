const Subject = require("./subject"); // Adjust path
const Question = require("./questions"); // Adjust path

const addQuestion = async (req, res) => {
  //   console.log("reques is coming");
  //   console.log('Request body:', req.body);

  const { subject, questionText, marks, difficulty, category, answereOptions } =
    req.body;
  const createdBy = req.user.name;

  //console.log(req.body);

  // Validate inputs
  if (
    !subject ||
    !questionText ||
    !difficulty ||
    !category ||
    !answereOptions ||
    !createdBy
  ) {
    return res
      .status(401)
      .json({ success: false, message: "All fields are required." });
  }

  // Convert marks to a number
  const marksNumber = Number.parseInt(marks); // Or use parseInt(marks, 10);

  // Validate that marks is a valid number
  if (isNaN(marksNumber) || marksNumber < 0) {
    //console.log("err 2");
    return res
      .status(400)
      .json({ success: false, message: "Marks must be a positive number." });
  }

  // 2. Prepare question details for the question_details column
  const questionDetails = {
    marks: marksNumber,
    category: category,
    answereOptions: answereOptions,
  };
  //console.log("Question details:", questionDetails);

  try {
    // 1. Store the subject in the Subjects table
    let subjectRecord = await Subject.findOne({
      where: { subject_name: subject },
    });

    if (!subjectRecord) {
      subjectRecord = await Subject.create({ subject_name: subject });
    }

    // 3. Store the question in the Questions table
    const question = await Question.create({
      subject_id: subjectRecord.id, // Store subject_id from Subjects table
      question: questionText, // Store question_text in the 'question' column
      difficulty: difficulty, // Store difficulty in the 'difficulty' column
      questions_details: questionDetails, // Store JSON data (marks, category, answereOptions) in the 'question_details' column
      created_by: createdBy, // Store the logged-in user's name in the 'created_by' column
      status: "active",
    });

    res.status(200).json({
      success: true,
      message: "Question added successfully",
      question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add question" });
  }
};

module.exports = { addQuestion };
