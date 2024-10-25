
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
// require('dotenv').config(); loads environment variables from a .env file into process.env.


const Subject = require("./src/subject"); // Import Subject model
const Question = require("./src/questions"); //Import Question model
const ExamForm = require("./src/examForm"); // 
const ExamQuestions = require("./src/examQuestions");


const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',   // Allow requests from the frontend
  credentials: true,                  // Allow credentials (cookies, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Apply CORS middleware before defining routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Handle preflight requests for all routes
// Middleware to parse incoming requests with JSON payloads
app.use(express.json());


// Main API routes
const questionRoutes = require('./src/router');
const examRoutes = require("./src/examRoutes")
const examPaperRoutes = require("./src/examPaperRoutes")
app.use('/api', questionRoutes);
app.use('/api',examRoutes);
app.use('/api',examPaperRoutes);

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
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Define User database table model
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true, // This will be the email
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync database
sequelize.sync();

app.get("/", async (req, res) => {
  res.send("Hello World!!");
});

//app.use('/api', questionRoutes);

// Sign in  route
app.post("/signin", async (req, res) => {
  //console.log("Sign in is working fine.........");

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { username: user.username, name: user.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// sign up route
app.post("/signup", async (req, res) => {
  //console.log("Sign up is working fine.........", req.body);

  try {
    const { name, username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({ name, username, password: hashedPassword });

    res.status(201).send("User created successfully!");
  } catch (error) {
    console.error(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).send("Email already taken.");
    }

    res.status(400).send("Error creating user.");
  }
});

// Protected route
app.get("/protected", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }
    res.json({ message: "Welcome to the protected route", user: decoded });
  });
});
//--------------------------------------------------------------------------------------

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
