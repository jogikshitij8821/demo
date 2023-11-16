// Import necessary modules and dependencies
const express = require("express");
const multer = require("multer");
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./config/models/user")
const GoogleAuth = require("./config/controllers/GoogleAuthController");
const cors = require("cors");
const { connectDB } = require("./config/database-connection/db.js");
const app = express();
const userController = require("./config/controllers/userController");

const receiptController=require('./config/controllers/receiptController');
const port = process.env.PORT || 5000;
const logger = require('./logger');
const axios = require('axios');

const setUpPassport = require("./config/passport");
const campaign = require("./config/controllers/campaignController");
const handleCreateTransaction = require("./config/controllers/transactionController");
const contactModel=require("./config/controllers/contactUsController");
const config = require("./config/config")
// Configure middleware and setup the Express application
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS support
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
connectDB(); // Connect to the database
app.use(passport.initialize()); // Initialize passport for authentication
setUpPassport(); // Set up passport strategies

// Define routes for user registration and login
app.post("/users/register", userController.registerUser);
app.post("/api/login", userController.loginUser);

// Define routes for handling transactions
app.get('/api/transactions',passport.authenticate(['bearer','jwt'],{ session: false }), handleCreateTransaction.findTransaction);
app.post('/create-razorpay-order', handleCreateTransaction.createTransaction);
app.get('/api/generate-receipt/:transactionId', receiptController.generateReceipt);

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
app.use("/uploads", express.static("uploads"));

// Define routes for campaign creation and retrieval
app.post("/create-campaign", upload.single("campaignImage"), campaign.createCampaign);
app.get("/campaigns", passport.authenticate(['bearer','jwt'],{ session: false }), campaign.showCampaign);
app.get('/campaigns/:campaignId', campaign.showCampaigndetails);

// Define a route for Google authentication
app.get("/v1/auth/google", GoogleAuth.AuthGoogle);
app.post("/submit-feedback",contactModel.submitContactForm);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
