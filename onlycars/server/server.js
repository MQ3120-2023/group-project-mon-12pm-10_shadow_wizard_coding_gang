const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();


// Import Mongoose Schemas and Models
const userSchema = new mongoose.Schema({
    userId: String,
    username: String,
    email: String,
    password: String,
    profilepic: String,
    location: String,
    description: String,
    cars: Number,
    posts: Number,
    subscribers: Number,
});
const User = mongoose.model("User", userSchema);

// Car Schema and Model
const carSchema = new mongoose.Schema({
    carId: String,
    owner: String,
    ownership: String,
    brandModel: String,
    year: String,
    modifications: String,
    img: String,
});
const Car = mongoose.model("Car", carSchema);

// Post Schema and Model
const postSchema = new mongoose.Schema({
    postId: String,
    author: String,
    content: String,
    img: String,
    likes: Number,
    comments: Number,
    shares: Number,
});
const Post = mongoose.model("Post", postSchema);

// MongoDB URI
const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://ShadowWizard:rFBiWdZ4jFRW6RMI@onlycars.rcvamax.mongodb.net/onlycars?retryWrites=true&w=majority";

// Mongoose connection
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error.message);
    });

app.use(cors());
app.use(bodyParser.json());
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "images")));

// Log static file requests
app.use("/images", (req, res, next) => {
    console.log(`Static file request for: ${req.url}`);
    next();
});

// TODO: Replace this with MongoDB data retrieval

// Importing data from data.json
const data = require("./data.json");

// Read users from data.json
const users = data.users;

// Read Posts from JSON file
const posts = data.posts;

// Endpoint to get all posts
app.get("/getPosts", (req, res) => {
    res.status(200).json(posts);
});

// Endpoint to get the current user's info
app.get("/getCurrentUser", (req, res) => {
    const { username } = req.query;
    const user = users.find((u) => u.username === username);
    if (user) {
        res.status(200).json([user]); // Wrap the user object in an array
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// TODO: Replace this with MongoDB-based authentication

// Basic Authentication
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log("Received request:", req.body);
    const user = users.find(
        (u) => u.username === username && u.password === password
    );
    if (user) {
        console.log("Sending response:", { message: "Login successful" });
        res.status(200).json({ message: "Login successful" });
    } else {
        console.log("Sending response:", { message: "Invalid users" });
        res.status(401).json({ message: "Invalid users" });
    }
});

// Credential Creation
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;
    console.log("Received request:", req.body);
    const user = users.find((u) => u.username === username);
    if (user) {
        console.log("Sending response:", {
            message: "Username already exists",
        });
        res.status(409).json({ message: "Username already exists" });
    } else {
        users.push({ username, email, password });
        fs.writeFileSync(
            "./server/data.json",
            JSON.stringify({ users: users, posts: posts })
        );
        console.log("Sending response:", { message: "SignUp successful" });
        res.status(200).json({ message: "SignUp successful" });
    }
});

// Session management
const session = require("express-session");

app.use(
    session({
        secret: "onlycars_secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
