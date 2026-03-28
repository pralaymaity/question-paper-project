require("dotenv").config();


const express = require("express");
const cors = require("cors");
const app = express();

//Cors handle
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));


// Middleware to parse incoming requests with JSON payloads
app.use(express.json());


// app.use((req, res, next) => {
//   console.log("🔥 Incoming request from:", req.headers.origin);
//   next();
// });


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
app.use("/api", subjectRoute);
app.use("/api-clg", paperRoute);
app.use("/api",sideBarRouter);
app.use("/api",subjectsRouter);

// test call
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// DB + Server start
const sequelize = require("./src/config/config");
(async function () {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    await sequelize.sync({ alter: true }); 
    

    console.log("✅ All tables synced");

    app.listen(process.env.PORT, () => {
  console.log(`🔥 Server is running on port ${process.env.PORT}`);
});

  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();




