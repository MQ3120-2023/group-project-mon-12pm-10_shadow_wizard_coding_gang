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

// Endpoint to get all posts
app.get("/getPosts", async (req, res) => {
    try {
        const allPosts = await Post.find({});
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
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
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.find({ Users: { $type: 4 } });
        {
            Users: {
                username: username;
                password: password;
            }
        }
        if (user) {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid users" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error during authentication" });
    }
});

// Credential Creation
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            res.status(409).json({ message: "Username already exists" });
        } else {
            const newUser = new User({ username, email, password });
            await newUser.save();
            res.status(200).json({ message: "SignUp successful" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error during signup" });
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
