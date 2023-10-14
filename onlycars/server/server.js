
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
  const { email, password } = req.body;
  console.log('Received request:', req.body);
  const user = credentials.find(u => u.email === email && u.password === password);
  if (user) {
    console.log('Sending response:', { message: 'Login successful' });
    res.status(200).json({ message: 'Login successful' });
  } else {
    console.log('Sending response:', { message: 'Invalid credentials' });
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});