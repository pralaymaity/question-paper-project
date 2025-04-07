const express = require("express");
const subjectRoute = express.Router();
const SubjectPaper = require("./models/subjectPaper");

subjectRoute.get("/" , async (req , res)=>{

    try{
        const subjectPaper = await SubjectPaper.findAll()
        res.json(subjectPaper)

    }catch (err){
        console.log("error fetching subject",err);
        res.status(500).json({ error: "Failed to fetch subjects" });
    }
    
})
module.exports = subjectRoute;