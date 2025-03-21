const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('./models/loginUser')
const router = express.Router();
const authenticate = require("../auth")


// Sign in  route
router.post("/signin", async (req, res) => {
  //console.log("Sign in is working fine.........");

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      
      //user.username refers to the username stored in the database for the logged-in user.
      //user.name is the full name of the user from the database.

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
router.post("/signup", async (req, res) => {
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
router.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Welcome to the protected route", user: req.user });
});

module.exports = router;
