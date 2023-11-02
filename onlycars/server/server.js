const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const MongoStore = require("connect-mongo");
const path = require("path");
app.use(express.static("build"));

// Require and Configure Cloudinary
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dv8lielzo",
    api_key: "634461358736993",
    api_secret: "RHcW0kHba10sh9AUuzp65qDPynM",
    secure: true,
});

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
    subscribers: [Number],
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
    date: Date,
    description: String,
    images: [String],
    likes: [Number],
    comments: Number,
});
const Post = mongoose.model("Post", postSchema);

// Event Schema and Model
const eventSchema = new mongoose.Schema({
    eventId: Number,
    userId: Number,
    title: String,
    location: String,
    date: Date,
    description: String,
    banner: String,
    attendees: [Number],
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
        origin: "*",
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
// Endpoint to upload images to Cloudinary
//

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json({ url: result.secure_url });
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        res.status(500).send("Error uploading image");
    } finally {
        // Delete the uploaded file from the server
        fs.unlinkSync(req.file.path);
    }
});

//
// Endpoints to fetch Data from MongoDB
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

// Endpoint to get latest posts along with their cars and users
app.get("/getHomeLatest", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10; // Number of posts per page

    try {
        // Fetch latest posts
        const latestPosts = await Post.find({})
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const carIds = latestPosts.map((post) => post.carId);
        const userIds = latestPosts.map((post) => post.userId);

        const allCars = await Car.find({ carId: { $in: carIds } });
        const allUsers = await User.find({ userId: { $in: userIds } });

        const carMap = {};
        allCars.forEach((car) => {
            carMap[car.carId] = car;
        });

        const userMap = {};
        allUsers.forEach((user) => {
            userMap[user.userId] = user;
        });

        const enrichedPosts = latestPosts.map((post) => ({
            ...post._doc,
            car: carMap[post.carId],
            user: userMap[post.userId],
        }));

        res.status(200).json(enrichedPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching latest posts" });
    }
});

// Endpoint to get popular posts along with their cars and users
app.get("/getHomePopular", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10; // Number of posts per page

    try {
        // Fetch popular posts
        const popularPosts = await Post.aggregate([
            { $addFields: { likesCount: { $size: "$likes" } } },
            { $sort: { likesCount: -1, date: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ]);

        const carIds = popularPosts.map((post) => post.carId);
        const userIds = popularPosts.map((post) => post.userId);

        const allCars = await Car.find({ carId: { $in: carIds } });
        const allUsers = await User.find({ userId: { $in: userIds } });

        const carMap = {};
        allCars.forEach((car) => {
            carMap[car.carId] = car;
        });

        const userMap = {};
        allUsers.forEach((user) => {
            userMap[user.userId] = user;
        });

        const enrichedPosts = popularPosts.map((post) => ({
            ...post,
            car: carMap[post.carId],
            user: userMap[post.userId],
        }));

        res.status(200).json(enrichedPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching popular posts" });
    }
});

// Endpoint to get all profile posts along with their cars and users
app.get("/getProfilePosts", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10; // Number of posts per page

    try {
        // Assuming the currentUser's ID is stored in the session
        const currentUserId = req.session.currentUser.userId;

        // Fetch posts related to the currentUser
        const profilePosts = await Post.find({ userId: currentUserId })
            .skip((page - 1) * limit)
            .limit(limit);

        // Fetch related cars and users
        const allCars = await Car.find({ carId: { $in: carIds } });
        const allUsers = await User.find({ userId: currentUserId });

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

app.get("/getExplorePosts", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10; // Number of posts per page

    try {
        const allPosts = await Post.find({})
            .skip((page - 1) * limit)
            .limit(limit);

        const carIds = allPosts.map((post) => post.carId);
        const userIds = allPosts.map((post) => post.userId);

        const allCars = await Car.find({ carId: { $in: carIds } });
        const allUsers = await User.find({ userId: { $in: userIds } });

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

// Endpoint to get all users
app.get("/getExploreUsers", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10; // Number of users per page

    try {
        const allUsers = await User.find({})
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// Endpoint to get all cars along with their users
app.get("/getExploreCars", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10; // Number of cars per page

    try {
        const allCars = await Car.find({})
            .skip((page - 1) * limit)
            .limit(limit);
        const userIds = allCars.map((car) => car.userId);

        const allUsers = await User.find({ userId: { $in: userIds } });

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

// Endpoint to get all events along with their users
app.get("/getExploreEvents", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 10; // Number of events per page

    try {
        // Fetch all events with pagination
        const allEvents = await Event.find({})
            .skip((page - 1) * limit)
            .limit(limit);

        // Extract userIds from the events
        const userIds = allEvents.map((event) => event.userId);

        // Fetch all related users
        const allUsers = await User.find({ userId: { $in: userIds } });

        // Create a map for quick lookup of user data
        const userMap = {};
        allUsers.forEach((user) => {
            userMap[user.userId] = user;
        });

        // Enrich events with user data
        const enrichedEvents = allEvents.map((event) => ({
            ...event._doc,
            user: userMap[event.userId],
        }));

        res.status(200).json(enrichedEvents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events" });
    }
});

//
// Creating Data in MongoDB
//

app.post("/createPost", async (req, res) => {
    try {
        // Validate and process the incoming data
        const { description, carId, images, userId } = req.body;
        if (!description || !carId || !images || images.length === 0 || !userId) {
            return res.status(400).send("Invalid post data");
        }

        // Create a new post
        const newPost = new Post({
            userId, // Use the user's ID from the request body
            carId,
            date: new Date(),
            description,
            images,
            likes: [],
            comments: 0, // Initialize with zero comments
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post");
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

app.get("*", function (req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, "../build/") });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});