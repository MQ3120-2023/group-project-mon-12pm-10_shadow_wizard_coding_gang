const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const MongoStore = require('connect-mongo');
const path = require('path');
app.use(express.static("build"))

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
    subscribers: [String],
});
const User = mongoose.model("users", userSchema);

// Car Schema and Model
const carSchema = new mongoose.Schema({
    carId: Number,
    owner: Number,
    ownership: String,
    brand: String,
    model: String,
    year: String,
    modifications: String,
    images: [String],
});
const Car = mongoose.model("Car", carSchema);

// Post Schema and Model
const postSchema = new mongoose.Schema({
    postId: Number,
    userId: Number,
    carId: Number,
    date: String,
    description: String,
    images: [String],
    likes: Number,
    comments: Number,
});
const Post = mongoose.model("Post", postSchema);

// Post Schema and Model
const eventSchema = new mongoose.Schema({
    eventId: Number,
    userId: Number,
    location: String,
    date: String,
    description: String,
    banner: String,
    attendees: [String],
});
const Event = mongoose.model("Event", eventSchema);

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
        store: MongoStore.create({ mongoUrl: uri }),
        cookie: { secure: false },
    })
);

app.use(bodyParser.json());

//
// Endpoint to fetch Data from MongoDB
//

// Endpoint to get all posts
app.get("/getAllPosts", async (req, res) => {
    try {
        const allPosts = await Post.find({});
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Endpoint to get all users
app.get("/getAllUsers", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Endpoint to get all cars
app.get("/getAllCars", async (req, res) => {
    try {
        const allCars = await Car.find({});
        res.status(200).json(allCars);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Endpoint to get all posts along with their cars and users
app.get("/getPostData", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10; // Number of posts per page

    try {
        const allPosts = await Post.find({})
            .skip((page - 1) * limit)
            .limit(limit);

        const carIds = allPosts.map((post) => post.carId);
        const userIds = allPosts.map((post) => post.userId);

        const allCars = await Car.find({ 'carId': { $in: carIds } });
        const allUsers = await User.find({ 'userId': { $in: userIds } });

        const carMap = {};
        allCars.forEach((car) => {
            carMap[car.carId] = car;
        });

        const userMap = {};
        allUsers.forEach((user) => {
            userMap[user.userId] = user;
        });

        const enrichedPosts = allPosts.map((post) => ({
            ...post._doc,
            car: carMap[post.carId],
            user: userMap[post.userId],
        }));

        res.status(200).json(enrichedPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

// Endpoint to get all profile posts along with their cars and users
app.get("/getProfilePosts", async (req, res) => {
    try {
        // Assuming the currentUser's ID is stored in the session
        const currentUserId = req.session.currentUser.userId;

        // Fetch posts related to the currentUser
        const profilePosts = await Post.find({ 'userId': currentUserId });

        const carIds = profilePosts.map((post) => post.carId);

        // Fetch related cars and users
        const allCars = await Car.find({ 'carId': { $in: carIds } });
        const allUsers = await User.find({ 'userId': currentUserId });

        const carMap = {};
        allCars.forEach((car) => {
            carMap[car.carId] = car;
        });

        const userMap = {};
        allUsers.forEach((user) => {
            userMap[user.userId] = user;
        });

        // Enrich posts with car and user data
        const enrichedProfilePosts = profilePosts.map((post) => ({
            ...post._doc,
            car: carMap[post.carId],
            user: userMap[post.userId],
        }));

        res.status(200).json(enrichedProfilePosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile posts" });
    }
});


// Endpoint to get all cars along with their users
app.get("/getCarData", async (req, res) => {
    try {
        const allCars = await Car.find({});
        const ownerIds = allCars.map((car) => car.owner);

        const allUsers = await User.find({ 'userId': { $in: ownerIds } });

        const userMap = {};
        allUsers.forEach((user) => {
            userMap[user.userId] = user;
        });

        const enrichedCars = allCars.map((car) => ({
            ...car._doc,
            user: userMap[car.owner],
        }));

        res.status(200).json(enrichedCars);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
});

//
// User Authentication
//

// Basic Authentication
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({
            username: username,
            password: password,
        });
        if (user) {
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
                profilepic: "https://res.cloudinary.com/dv8lielzo/image/upload/v1698721019/Users%20Profile%20Pic/Default3PP_efi8gb.png",
                location: "Unknown",
                description: "Hi, I'm new to OnlyCars!",
                cars: 0,
                posts: 0,
                subscribers: "",
            });
            await newUser.save();
            res.status(200).json({ message: "SignUp successful" });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Error during signup" });
    }
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

app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});