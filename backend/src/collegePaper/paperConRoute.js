const express = require("express");
const paperRoute = express.Router();
const {addQuestionToPaper,getGeneratedPaper,resetGeneratedPaper} = require("./paperController");
    
paperRoute.post("/add-question", addQuestionToPaper);
paperRoute.get("/get-paper", getGeneratedPaper);
paperRoute.post("/reset-paper", resetGeneratedPaper); 

module.exports = paperRoute;