const SubjectPaper = require("../models/subjectPaper");
const QuestionStorage = require("../models/questionStorage");

const storeQuestion = async (req, res) => {
  const { subject, questionText, difficulty, marks, group } = req.body;
  const createdBy = req.user.name;

  //console.log(req.body);

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
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let foundSubject = await SubjectPaper.findOne({ where: { subject_name: subject } });
    if (!foundSubject) {
      // If not found, create it
      foundSubject = await SubjectPaper.create({ subject_name: subject });
    }
    //console.log(foundSubject);
    

    const subjectId = foundSubject.id;
    //console.log(subjectId);
    

    // Split the questions by line
    const subQuestions = questionText
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q);
    

    // Split the marks string and convert to numbers
    const marksArray = marks.split("+").map((m) => parseInt(m.trim()));

    // Check if questions and length are match
    if (subQuestions.length !== marksArray.length) {
      return res.status(400).json({
        error: `Number of subquestions (${subQuestions.length}) and marks (${marksArray.length}) do not match.`,
      });
    }

    // Combine subquestions with marks
    const sub_question_marks = subQuestions.map((question, idx) => ({
      subquestion: question,
      marks: marksArray[idx],
    }));

    // Total marks
    const totalMarks = marksArray.reduce((acc, val) => acc + val, 0);

  
    await QuestionStorage.create({
      subject_id: subjectId,
      question: questionText,
      difficulty: difficulty,
      question_group: group,
      total_marks: totalMarks,
      sub_question_marks: sub_question_marks,
      created_by: createdBy,
    });

    res.status(201).json({ message: "College Question stored successfully." });
  } catch (error) {
    console.error("Error saving question:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = storeQuestion;
