const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const loggedUser = "00000001";

// Middleware
app.use(cors());
app.use(bodyParser.json());
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "images")));

// Log static file requests
app.use("/images", (req, res, next) => {
    console.log(`Static file request for: ${req.url}`);
    next();
});


// Read Posts from JSON file
const data = JSON.parse(fs.readFileSync('./server/data.json', 'utf8'));
const users = data.Users;
const cars = data.Cars;
const posts = data.Posts;

// Endpoint to get all posts
app.get('/getPosts', (req, res) => {
  res.status(200).json(posts);
});

// Endpoint to get the current user's info
app.get('/getCurrentUser', (req, res) => {
  const { userId } = loggedUser;
  const user = users.find(u => u.userId === userId);
  if (user) {
    res.status(200).json([user]);  // Wrap the user object in an array
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Basic Authentication
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received request:', req.body);
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    console.log('Sending response:', { message: 'Login successful' });
    res.status(200).json({ message: 'Login successful' });
  } else {
    console.log('Sending response:', { message: 'Invalid credentials' });
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Credential Creation
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received request:', req.body);
    const user = users.find(u => u.username === username);
    if (user) {
      console.log('Sending response:', { message: 'Username already exists' });
      res.status(409).json({ message: 'Username already exists' });
    } else {
      users.push({ username, email, password });
      //fs.writeFileSync('./server/credentials.json', JSON.stringify({ logins: credentials }));
      console.log('Sending response:', { message: 'SignUp successful' });
      res.status(200).json({ message: 'SignUp successful' });
    }
});

// Session management
const session = require('express-session');

app.use(session({
  secret: 'onlycars_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});