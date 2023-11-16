// Import necessary modules and dependencies
const axios = require('axios');
const GoogleUser = require("../models/googleAuth");
const logger = require("../../logger");
const config = require("../config")

// Define an asynchronous function for authenticating with Google
exports.AuthGoogle = async (req, res) => {
    try {
        // Log information about the process
        logger.info("Getting bearer token from the header... ");

        // Retrieve the authorization header from the request
        const authHeader = req.headers.authorization;

        // Check if the authorization header is missing
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header missing" });
        }

        // Split the authorization header to extract the access token
        const tokenParts = authHeader.split(' ');

        // Check for a valid 'Bearer' token in the header
        if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
            return res.status(401).json({ error: "Invalid authorization header" });
        }

        // Extract the access token
        const access_token = tokenParts[1];
        //logger.info("Successfully get the bearer token : " + tokenParts);

        // Log the successful retrieval of the access token
        logger.info("Successfully get the access token : " + access_token);
        // Verify the access token with Google API
        const googleResponse = await axios.get(config.apiGoogle, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        // Log successful verification of the access token
        logger.info("Successfully verify the access token");

        // Extract user data from the Google API response
        const user = googleResponse.data;

        // Create a new instance of the GoogleUser model with user data
        const data = new GoogleUser({ name: user.name, email: user.email, loggedintime: new Date() });

        // Save the user data to MongoDB
        await data.save();

        // Log successful data save to MongoDB
        logger.info("Successfully save the data to MongoDB");

        // Respond with the saved user data
        res.json(data);
    } catch (error) {
        // Handle errors and log the details
        logger.error("Error verifying access token:", error);
        res.status(500).json({ error: "Failed to verify access token" });
    }
};
