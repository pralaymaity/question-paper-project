const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize");
const ExamForm = require("./examForm");
const Question = require("./questions");

const ExamQuestions = sequelize.define(
  "ExamQuestions",
  {
    exam_id: {
      type: DataTypes.UUID,
      references: {
        model: ExamForm,
        key: "exam_id",
      },
      primaryKey: true,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Question, // Assuming Question model exists
        key: "id",
      },
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable timestamps if you don't need them
  }
);

module.exports = ExamQuestions;
