const express = require("express");
const subjectsRouter = express.Router();

const Subject = require("../models/subject")

subjectsRouter.get("/get-subjects", async (req, res) => {
  try {
    const subjects = await Subject.findAll({
   
      order: [['subject_name', 'ASC']], 
    
    });
    res.json(subjects);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Subject Database error" });
  }
});

module.exports = subjectsRouter;
