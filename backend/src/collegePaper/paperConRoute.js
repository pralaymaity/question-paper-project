const express = require("express");
const paperRoute = express.Router();
const {
  addQuestionToPaper,
  removeQuestionFromPaper,
  getGeneratedPaper,
  resetGeneratedPaper,
} = require("./paperController");

paperRoute.post("/add-question", addQuestionToPaper);
paperRoute.post("/remove-question", removeQuestionFromPaper);
paperRoute.get("/get-paper", getGeneratedPaper);
paperRoute.post("/reset-paper", resetGeneratedPaper);

module.exports = paperRoute;
