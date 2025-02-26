
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
// require('dotenv').config(); loads environment variables from a .env file into process.env.

const User = require("./src/loginUser/models/loginUser");
const Subject = require("./src/mcqPaper/models/subject"); 
const Question = require("./src/mcqPaper/models/questions"); 
const ExamForm = require("./src/mcqPaper/models/examForm"); 
const ExamQuestions = require("./src/mcqPaper/models/examQuestions");
const SubjectPaper = require("./src/collegePaper/models/subjectPaper");
const QuestionStorage = require("./src/collegePaper/models/questionStorage");


const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',   // Allow requests from the frontend
  credentials: true,                  // Allow credentials (cookies, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));   // Apply CORS middleware before defining routes
app.options('*', cors(corsOptions));  // Handle preflight requests for all routes

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());


// Main API routes
const loginRoute = require("./src/loginUser/loginRoute")
const routes = require('./src/mcqPaper/router');
const examRoutes = require("./src/mcqPaper/examRoutes")
const examPaperRoutes = require("./src/mcqPaper/examPaperRoutes")
const questionRoute = require('./src/collegePaper/questionRoute')

app.use(loginRoute)
app.use('/api', routes);
app.use('/api',examRoutes);
app.use('/api',examPaperRoutes);
app.use('/api',questionRoute)

// Initialize Sequelize
const sequelize = new Sequelize("question-paper", "pralay", 1234, {
  host: "postgres",
  dialect: "postgres",
});
(async function () {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: false });
    console.log("Database Connection has been established successfully.");
    await User.sync(); // create  User table on postgres db
    await Subject.sync(); // Sync Subject table
    await Question.sync(); // Sync Question table
    await ExamForm.sync();
    await ExamQuestions.sync();
    await SubjectPaper.sync();
    await QuestionStorage.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
sequelize.sync();

app.get("/", async (req, res) => {
  res.send("Hello World!!");
});



// Sync database



//--------------------------------------------------------------------------------------

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
