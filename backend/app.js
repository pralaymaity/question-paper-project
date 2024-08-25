const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors());

// Initialize Sequelize
const sequelize = new Sequelize('question-paper', 'pralay', 1234, {
  host: 'postgres',
  dialect: 'postgres'  
});
(async function() {
  try {
      await sequelize.authenticate();
      // await sequelize.sync({ force: false });
      console.log('Database Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
})()

// Define User model
const User = sequelize.define('User', {
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

app.get('/', async (req, res) => {
  res.send("Hello World!!")
});

// Sign in  route
app.post('/signin', async (req, res) => {
  console.log("Sign in is working fine.........");

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username: user.username, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// sign up route
app.post('/signup', async (req, res) => {
  console.log("Sign up is working fine........." , req.body);
  
  try {
    const { name, username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({ name, username, password: hashedPassword });

    res.status(201).send('User created successfully!');
  } catch (error) {
    console.error(error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send('Email already taken.');
    }
    
    res.status(400).send('Error creating user.');
  }
});

// Protected route
app.get('/protected', (req, res) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }
    res.json({ message: 'Welcome to the protected route', user: decoded });
  });
});

app.listen(9000, () => {
  console.log('Server is running on port 9000');
});

