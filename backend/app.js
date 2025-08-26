require("dotenv").config();
// require('dotenv').config(); loads environment variables from a .env file into process.env.

const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.options("*", cors(corsOptions));  //Handle preflight requests for all routes
app.use(cors(corsOptions));


// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

//models
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./src/loginUser/models/loginUser");
const Subject = require("./src/mcqPaper/models/subject");
const Question = require("./src/mcqPaper/models/questions");
const ExamForm = require("./src/mcqPaper/models/examForm");
const ExamQuestions = require("./src/mcqPaper/models/examQuestions");
const SubjectPaper = require("./src/collegePaper/models/subjectPaper");
const QuestionStorage = require("./src/collegePaper/models/questionStorage");

app.use((req, res, next) => {
  console.log("🔥 Incoming request from:", req.headers.origin);
  next();
});


// Main API routes
const loginRoute = require("./src/loginUser/routes/loginRoute");
const routes = require("./src/mcqPaper/routes/router");
const examRoutes = require("./src/mcqPaper/routes/examRoutes");
const examPaperRoutes = require("./src/mcqPaper/routes/examPaperRoutes");
const questionRoute = require("./src/collegePaper/routes/questionRoute");
const subjectRoute = require("./src/collegePaper/routes/subjectRoute");
const paperRoute = require("./src/collegePaper/routes/paperConRoute");
const sideBarRouter = require("./src/mcqPaper/routes/sideBarRoute");
const subjectsRouter = require("./src/mcqPaper/routes/subjectRoute");

app.use(loginRoute);
app.use("/api", routes);
app.use("/api", examRoutes);
app.use("/api", examPaperRoutes);
app.use("/api", questionRoute);
app.use("/take-subject", subjectRoute);
app.use("/", paperRoute);
app.use("/api",sideBarRouter);
app.use("/api",subjectsRouter);

// Initialize Sequelize
const sequelize = require("./src/config/config");
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
