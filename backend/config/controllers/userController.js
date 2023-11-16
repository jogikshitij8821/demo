// Import necessary modules and dependencies
const User = require('../models/user');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const logger = require('../../logger');
const config = require("../config")

// Define an asynchronous function to register a new user
exports.registerUser = async (req, res) => {
    try {
        // Log the process of saving new user details in MongoDB
        logger.info("Saving new user details in MongoDB...");

        // Extract user details from the request body
        const { username, email, password } = req.body;

        // Create a new User instance with the extracted user details
        const user = new User({ username, email, password });

        // Save the new user details in MongoDB
        await user.save();

        // Log the successful save of user details
        logger.info("Successfully saved the user details.");

        // Respond with the user details
        res.json(user);
    } catch (error) {
        // Handle errors during user registration and log details
        logger.error("Error during registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Define an asynchronous function to authenticate and log in a user
exports.loginUser = async (req, res) => {
    // Log the process of fetching existing user details
    logger.info("Fetching existing user details...");

    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find a user in MongoDB with the provided username and password
    const user = await User.findOne({ username, password });

    // Log the successful fetch of user details
    logger.info("Successfully fetched the user details.");

    if (user) {
        // Log the process of generating a token for user authentication
        logger.info("Generating token for authentication...");

        // Generate a JWT token with the user's username and secret key
        const token = jwt.sign({ username: user.username }, config.secretKey);

        // Log the successful generation of the token
        logger.info("Successfully generated the token.");

       // Respond with the user details and the generated token
        res.status(200).send({ user, token });
    } else {
        // Handle errors when user details are not found and log details
        logger.error("Error while fetching user details");
        res.status(401).json({ error: "Invalid username or password" });
    }
};
