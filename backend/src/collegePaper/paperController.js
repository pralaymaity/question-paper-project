const express = require("express");
const QuestionStorage = require("./models/questionStorage");

// In-memory generated paper
let generatedPaper = {
  GroupA: [],
  GroupB: [],
  GroupC: [],
  totaltotal_marks: 0,
};

// Add question controller
const addQuestionToPaper = async (req, res) => {
  try {
    const { eachQuestionId } = req.body;

    const question = await QuestionStorage.findByPk(eachQuestionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const { question_group, total_marks } = question;

    if (question_group === "A" && generatedPaper.GroupA.length >= 10) {
      return res
        .status(400)
        .json({ error: "Group A is full with ( 10 ) questions" });
    }
    if (question_group === "B" && generatedPaper.GroupB.length >= 3) {
      return res
        .status(400)
        .json({ error: "Group B is full with ( 3 )  questions" });
    }
    if (question_group === "C" && generatedPaper.GroupC.length >= 3) {
      return res
        .status(400)
        .json({ error: "Group C is full with ( 3 ) questions" });
    }

    if (generatedPaper.totaltotal_marks + total_marks > 70) {
      return res.status(400).json({ error: "Total 70 marks is filled" });
    }

    if (question_group === "A") generatedPaper.GroupA.push(question);
    if (question_group === "B") generatedPaper.GroupB.push(question);
    if (question_group === "C") generatedPaper.GroupC.push(question);

    generatedPaper.totaltotal_marks += total_marks;

    return res.status(200).json({
      message: "Question added successfully",
      paper: generatedPaper,
    });
  } catch (error) {
    console.error("Add Question Error:", error);
    return res.status(500).json({ error: "Failed to add question" });
  }
};

//  Get generated paper
const getGeneratedPaper = (req, res) => {
  res.status(200).json({ paper: generatedPaper });
};

// Reset on logout
const resetGeneratedPaper = (req, res) => {
  generatedPaper = {
    GroupA: [],
    GroupB: [],
    GroupC: [],
    totaltotal_marks: 0,
  };
  res.status(200).json({ message: "Paper reset successful" });
};

module.exports = {
  addQuestionToPaper,
  getGeneratedPaper,
  resetGeneratedPaper,
};
