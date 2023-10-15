
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Read credentials from JSON file
const credentialsData = JSON.parse(fs.readFileSync('./server/credentials.json', 'utf8'));
const credentials = credentialsData.logins;

// Basic Authentication
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received request:', req.body);
  const user = credentials.find(u => u.username === username && u.password === password);
  if (user) {
    console.log('Sending response:', { message: 'Login successful' });
    res.status(200).json({ message: 'Login successful' });
  } else {
    console.log('Sending response:', { message: 'Invalid credentials' });
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received request:', req.body);
    const user = credentials.find(u => u.username === username);
    if (user) {
      console.log('Sending response:', { message: 'Username already exists' });
      res.status(409).json({ message: 'Username already exists' });
    } else {
      credentials.push({ username, email, password });
      fs.writeFileSync('./server/credentials.json', JSON.stringify({ logins: credentials }));
      console.log('Sending response:', { message: 'SignUp successful' });
      res.status(200).json({ message: 'SignUp successful' });
    }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});