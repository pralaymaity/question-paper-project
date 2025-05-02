const express = require("express");
require("dotenv").config();
// require('dotenv').config(); loads environment variables from a .env file into process.env.

const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./src/loginUser/models/loginUser");
const Subject = require("./src/mcqPaper/models/subject");
const Question = require("./src/mcqPaper/models/questions");
const ExamForm = require("./src/mcqPaper/models/examForm");
const ExamQuestions = require("./src/mcqPaper/models/examQuestions");
const SubjectPaper = require("./src/collegePaper/models/subjectPaper");
const QuestionStorage = require("./src/collegePaper/models/questionStorage");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests for all routes

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Main API routes
const loginRoute = require("./src/loginUser/loginRoute");
const routes = require("./src/mcqPaper/router");
const examRoutes = require("./src/mcqPaper/examRoutes");
const examPaperRoutes = require("./src/mcqPaper/examPaperRoutes");
const questionRoute = require("./src/collegePaper/questionRoute");
const subjectRoute = require("./src/collegePaper/subjectRoute");
const paperRoute = require("./src/collegePaper/paperConRoute");

app.use(loginRoute);
app.use("/api", routes);
app.use("/api", examRoutes);
app.use("/api", examPaperRoutes);
app.use("/api", questionRoute);
app.use("/take-subject", subjectRoute);
app.use("/", paperRoute);

// Initialize Sequelize
const sequelize = new Sequelize("question-paper", "pralay", 1234, {
  host: "postgres",
  dialect: "postgres",
});
(async function () {
  try {
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully.");
    await User.sync();
    await Subject.sync();
    await Question.sync();
    await ExamForm.sync();
    await ExamQuestions.sync();
    await SubjectPaper.sync();
    await QuestionStorage.sync(); //{ force: true } if u want later update the table
    //console.log("🔁 QuestionStorage table dropped and recreated successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
sequelize.sync();

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
