const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const session = require("express-session");
const currentUser = require("./middleware/currentUser"); // Make sure the path is correct
const app = express();

// Import Mongoose Schemas and Models
const userSchema = new mongoose.Schema({
    userId: Number,
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
const User = mongoose.model("users", userSchema);

// Car Schema and Model
const carSchema = new mongoose.Schema({
    carId: Number,
    owner: Number,
    ownership: String,
    brandModel: String,
    year: String,
    modifications: String,
    img: String,
});
const Car = mongoose.model("Car", carSchema);

// Post Schema and Model
const postSchema = new mongoose.Schema({
    postId: Number,
    author: Number,
    content: String,
    img: String,
    likes: Number,
    comments: Number,
    shares: Number,
});
const Post = mongoose.model("Post", postSchema);

// MongoDB URI
const uri =
    "mongodb+srv://ShadowWizard:rFBiWdZ4jFRW6RMI@onlycars.rcvamax.mongodb.net/OnlyCars?retryWrites=true&w=majority";

// Mongoose connection
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error.message);
    });

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// Use the middleware for session management
app.use(
    session({
        secret: "onlycars_secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use(bodyParser.json());
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static("build"))
// Log static file requests
app.use("/images", (req, res, next) => {
    console.log(`Static file request for: ${req.url}`);
    next();
});

// Endpoint to get all posts
app.get("/getAllPosts", async (req, res) => {
    try {
        const allPosts = await Post.find({});
        res.status(200).json(allPosts);
        console.log(allPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Basic Authentication
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({
            username: username,
            password: password,
        });
        console.log(user);
        if (user) {
            console.log("currentUser: " + user);
            req.currentUser = user;
            req.session.currentUser = user;
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
        const existingUser = await User.findOne({ Users: { $type: 4 } });
        {
            Users: {
                username: username;
                email: email;
            }
        }
        if (existingUser) {
            console.log(existingUser);
            res.status(409).json({ message: "Username/Email already exists" });
        } else {
            // Create a new user
            const newUser = new User({
                username,
                email,
                password, // Note: In a real-world application, make sure to hash the password before storing it
                profilepic: "car01.jpg",
                location: "Unknown",
                description: "Hi, I'm new to OnlyCars!",
                cars: 0,
                posts: 0,
                subscribers: 0,
            });
            await newUser.save();
            res.status(200).json({ message: "SignUp successful" });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Error during signup" });
    }
});

// Use the middleware to inject currentUser
app.use(currentUser);

// Use the middleware to set req.session.user
app.use((req, res, next) => {
    if (req.session && req.session.user) {
        req.session.user = req.session.user;
    } else {
        req.session.user = null;
    }
    next();
});

// Endpoint to get the current user based on the session
app.get("/currentUser", (req, res) => {
    if (req.session && req.session.currentUser) {
        res.status(200).json(req.session.currentUser);
    } else {
        res.status(401).json({ message: "No user is currently logged in" });
    }
});

// Logout endpoint
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Could not log out" });
        } else {
            return res.status(200).json({ message: "Logged out" });
        }
    });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});