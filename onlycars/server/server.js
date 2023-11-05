const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const MongoStore = require("connect-mongo");
const path = require("path");
const bcrypt = require("bcrypt");
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
    gender: String,
    language: String,
    darkmode: Boolean,
});
const User = mongoose.model("users", userSchema);

// Car Schema and Model
const carSchema = new mongoose.Schema({
    carId: Number,
    userId: Number,
    ownership: String,
    brand: String,
    model: String,
    year: Number,
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

// Comment Schema and Model
const commentSchema = new mongoose.Schema({
    commentId: Number,
    postId: Number,
    userId: Number,
    date: Date,
    description: String,
});
const Comment = mongoose.model("Comment", commentSchema);

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

// Endpoint to get cars owned by the current user
app.get("/getUserCars", async (req, res) => {
    try {
        // Get the userId from the query parameter instead of the session
        const currentUserId = req.query.userId;

        if (!currentUserId) {
            return res.status(400).json({ message: "No userId provided" });
        }

        const userCars = await Car.find({ userId: currentUserId });
        res.status(200).json(userCars);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user's cars" });
    }
});

// Endpoint to get users that the current user is subscribed to
app.get("/getUserSubs", async (req, res) => {
    try {
        const currentUserId = req.query.userId;

        if (!currentUserId) {
            return res.status(400).json({ message: "No userId provided" });
        }

        // Find all users where the currentUserId is in their subscribers list
        const subscriptions = await User.find({
            subscribers: currentUserId
        });

        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user's subscriptions" });
    }
});

// Endpoint to get comments for a post
app.get("/getComments/:postId", async (req, res) => {
    try {
        const postId = parseInt(req.params.postId);
        const postComments = await Comment.find({ postId: postId }).sort({ date: -1 });

        // Fetch user data for each comment
        const userIds = postComments.map((comment) => comment.userId);
        const users = await User.find({ userId: { $in: userIds } });

        // Create a map for users
        const userMap = {};
        users.forEach((user) => {
            userMap[user.userId] = user;
        });

        // Enrich comments with user data
        const enrichedComments = postComments.map((comment) => ({
            ...comment._doc,
            user: userMap[comment.userId],
        }));

        res.status(200).json(enrichedComments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" });
    }
});

// Endpoint to get latest posts along with their cars and users
app.get("/getHomeLatest", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const userId = req.query.userId; // Get the userId from the query parameter
    const limit = 10; // Number of posts per page

    try {
        if (!userId) {
            return res.status(400).json({ message: "No userId provided" });
        }

        // Fetch users who have the given userId in their subscribers
        const subscribedUsers = await User.find({ subscribers: { $elemMatch: { $eq: userId } } });
        const subscribedUserIds = subscribedUsers.map(user => user.userId);

        // Fetch latest posts from subscribed users
        const latestPosts = await Post.find({ userId: { $in: subscribedUserIds } })
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const carIds = latestPosts.map((post) => post.carId);

        // Assuming you still want to fetch all cars related to the posts
        const allCars = await Car.find({ carId: { $in: carIds } });

        const carMap = {};
        allCars.forEach((car) => {
            carMap[car.carId] = car;
        });

        const userMap = {};
        subscribedUsers.forEach((user) => {
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
    const userId = req.query.userId; // Get the userId from the query parameter
    const limit = 10; // Number of posts per page

    try {
        if (!userId) {
            return res.status(400).json({ message: "No userId provided" });
        }

        // Fetch users who have the given userId in their subscribers
        const subscribedUsers = await User.find({ subscribers: { $elemMatch: { $eq: userId } } });
        const subscribedUserIds = subscribedUsers.map(user => user.userId);

        // Fetch popular posts from subscribed users
        const popularPosts = await Post.aggregate([
            { $match: { userId: { $in: subscribedUserIds } } }, // Filter posts by subscribed users
            { $addFields: { likesCount: { $size: "$likes" } } },
            { $sort: { likesCount: -1, date: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ]);

        const carIds = popularPosts.map((post) => post.carId);

        const allCars = await Car.find({ carId: { $in: carIds } });
        const allUsers = await User.find({ userId: { $in: subscribedUserIds } }); // Fetch only subscribed users

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

// Endpoint to get all posts for the current user, sorted by date
app.get("/getProfileLatest", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const userId = req.query.userId; // Get the userId from the query parameter
    const limit = 10; // Number of posts per page

    try {
        if (!userId) {
            return res.status(400).json({ message: "No userId provided" });
        }

        // Fetch posts related to the provided userId
        const profilePosts = await Post.find({ userId: userId })
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const carIds = profilePosts.map((post) => post.carId);

        // Fetch related cars
        const allCars = await Car.find({ carId: { $in: carIds } });

        // Fetch the user data for the userId
        const user = await User.findOne({ userId: userId });

        const carMap = {};
        allCars.forEach((car) => {
            carMap[car.carId] = car;
        });

        // Enrich posts with car and user data
        const enrichedProfilePosts = profilePosts.map((post) => ({
            ...post._doc,
            car: carMap[post.carId],
            user: user, // Since all posts are from the same user, we can directly assign the user object
        }));

        res.status(200).json(enrichedProfilePosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile posts" });
    }
});

// Endpoint to get all posts for the current user, sorted by likes
app.get("/getProfilePopular", async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const userId = req.query.userId; // Get the userId from the query parameter
    const limit = 10; // Number of posts per page

    try {
        if (!userId) {
            return res.status(400).json({ message: "No userId provided" });
        }

        // Fetch posts related to the provided userId
        const profilePosts = await Post.aggregate([
            { $match: { userId: parseInt(userId) } },
            { $addFields: { likesCount: { $size: "$likes" } } },
            { $sort: { likesCount: -1, date: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ]);

        // Extract carIds from profilePosts
        const carIds = profilePosts.map((post) => post.carId);

        // Fetch related cars
        const allCars = await Car.find({ carId: { $in: carIds } });

        // Fetch the user data
        const user = await User.findOne({ userId: userId });

        // Create a map for cars
        const carMap = {};
        allCars.forEach((car) => {
            carMap[car.carId] = car;
        });

        // Enrich posts with car and user data
        const enrichedProfilePosts = profilePosts.map((post) => ({
            ...post, // Since we're using aggregate, it's not _doc but the post object itself
            car: carMap[post.carId],
            user: user, // Directly assign the user object
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
// Data Object Creation in MongoDB
//

//
app.post("/createPost", async (req, res) => {
    try {
        const { description, images, userId, carId } = req.body;

        if (!description || !images || images.length === 0 || !userId) {
            return res.status(400).send("Invalid post data");
        }

        // Generate a new postId
        const postCount = await Post.countDocuments();
        const newPostId = postCount + 1;

        // Create a new post including carId (which may be null)
        const newPostData = {
            postId: newPostId,
            userId,
            carId,
            date,
            description,
            images,
            likes: [],
            comments: 0,
        };

        const newPost = new Post(newPostData);
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post");
    }
});

app.post('/createCar', async (req, res) => {
    try {
        const { brand, model, year, modifications, images, userId } = req.body;

        if (!brand || !model || !year || !userId) {
            return res.status(400).send('Invalid car data');
        }

        const carCount = await Car.countDocuments();
        const newCarId = carCount + 1;

        const newCar = new Car({
            carId: newCarId,
            userId,
            brand,
            model,
            year,
            modifications,
            images,
        });

        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).send('Error creating car');
    }
});

app.post("/settingsUser", async (req, res) => {
    const { email, location, gender, language } = req.body;
  
    try {
      // Update the user's email, location, gender, and language directly
      const updatedUser = await User.updateOne({}, { email, location, gender, language });
  
      if (updatedUser.nModified === 0) {
        // User not found or no changes made
        return res.status(404).json({ message: "User not found or no changes made" });
      }
  
      // Send a response indicating that the settings have been saved
      res.status(200).json({ message: "Settings Saved" });
    } catch (error) {
      console.error("Error updating user settings:", error);
      res.status(500).json({ message: "Error updating user settings" });
    }
  });

  app.post("/settingsProfile", async (req, res) => {
    const { username, description } = req.body;
  
    try {
      // Update the user's email, location, gender, and language directly
      const updatedUser = await User.updateOne({}, { username, description });
  
      if (updatedUser.nModified === 0) {
        // User not found or no changes made
        return res.status(404).json({ message: "User not found or no changes made" });
      }
  
      // Send a response indicating that the settings have been saved
      res.status(200).json({ message: "Settings Saved" });
    } catch (error) {
      console.error("Error updating user settings:", error);
      res.status(500).json({ message: "Error updating user settings" });
    }
  });

//
app.post("/createEvent", async (req, res) => {
    try {
        const { title, location, date, description, banner, userId } = req.body;

        if (!title || !location || !date || !description || !userId) {
            return res.status(400).send("Invalid event data");
        }

        // Generate a new eventId
        const eventCount = await Event.countDocuments();
        const newEventId = eventCount + 1;

        // Create a new event
        const newEventData = {
            eventId: newEventId,
            userId,
            title,
            location,
            date: new Date(date),
            description,
            banner,
            attendees: [],
        };

        const newEvent = new Event(newEventData);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send("Error creating event");
    }
});

//
// User Authentication
//

// Login Authentication
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.currentUser = user;
                req.session.currentUser = user;
                res.status(200).json({ message: "Login successful" });
            } else {
                res.status(401).json({ message: "Invalid username or password" });
            }
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error during authentication" });
    }
});

// User SignUp and Creation
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            res.status(409).json({ message: "Username/Email already exists" });
        } else {
            // Generate a salt and hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Generate a new userId
            const userCount = await User.countDocuments();
            const newUserId = userCount + 1;

            // Create a new user with the hashed password
            const newUser = new User({
                userId: newUserId,
                username,
                email,
                password: hashedPassword, // Store the hashed password
                profilepic: "https://res.cloudinary.com/dv8lielzo/image/upload/v1698721019/Users%20Profile%20Pic/Default3PP_efi8gb.png",
                location: "Unknown",
                description: "Hi, I'm new to OnlyCars!",
                cars: 0,
                posts: 0,
                subscribers: [],
                gender: "",
                language: "",
                darkmode: false,
            });
            await newUser.save();
            res.status(201).json({ message: "SignUp successful" });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Error during signup" });
    }
});


//
// Session Management
//

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