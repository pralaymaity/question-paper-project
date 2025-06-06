const Subject = require("../models/subject"); 
const Question = require("../models/questions"); 

const addQuestion = async (req, res) => {
  //   console.log("reques is coming");
  //   console.log('Request body:', req.body);

  const { subject, questionText, marks, difficulty, category, answereOptions } =
    req.body;
  const createdBy = req.user.name;

  //console.log(req.body);

  
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

  
  const marksNumber = Number.parseInt(marks); 

 
  if (isNaN(marksNumber) || marksNumber < 0) {
    //console.log("err 2");
    return res
      .status(400)
      .json({ success: false, message: "Marks must be a positive number." });
  }

  
  const questionDetails = {
    marks: marksNumber,
    category: category,
    answereOptions: answereOptions,
  };
  //console.log("Question details:", questionDetails);

  try {
    
    let subjectRecord = await Subject.findOne({
      where: { subject_name: subject },
    });

    if (!subjectRecord) {
      subjectRecord = await Subject.create({ subject_name: subject });
    }

    
    const question = await Question.create({
      subject_id: subjectRecord.id, 
      question: questionText, 
      difficulty: difficulty, 
      questions_details: questionDetails, 
      created_by: createdBy, 
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
