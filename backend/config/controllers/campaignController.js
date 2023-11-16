// Import necessary modules and dependencies
const Campaign = require('../models/campaign');
const logger = require("../../logger");

// Define an asynchronous function to create a new campaign
exports.createCampaign = async (req, res) => {
    try {
        // Log the start of the campaign creation process
        logger.info("Started campaign creation...");

        // Extract campaign data from the request body
        const {
            campaignName,
            campaignGoal,
            campaignDescription,
            campaignCategory,
        } = req.body;
        logger.info("Get the campaign data in req.body.");

        // Convert date strings to Date objects
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);

        // Get the file path of the campaign image
        const campaignImage = req.file.path;

        // Get the current Indian time and format it
        const currentIndianTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        const creationDate = new Date(currentIndianTime).toISOString();

        // Create a new Campaign instance with the extracted data
        const newCampaign = new Campaign({
            campaignName,
            campaignGoal,
            campaignDescription,
            campaignCategory,
            campaignImage,
            startDate,
            endDate,
            creationDate,
        });

        // Save the new campaign to MongoDB
        await newCampaign.save();

        // Log the successful creation and save of the campaign in MongoDB
        logger.info("Successfully created and saved the campaign in MongoDB.");

        // Respond with a success message and the newly created campaign
        res.status(201).json({
            message: "Campaign created successfully.",
            campaign: newCampaign,
        });
    } catch (error) {
        // Handle errors during campaign creation and log details
        logger.error("Error while creation of campaign: " + error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Define an asynchronous function to fetch all campaigns
exports.showCampaign = async (req, res) => {
    try {
        // Log the process of fetching campaigns
        logger.info("Fetching campaigns...");

        // Fetch all campaign records from MongoDB and sort them by creation date
        const campaigns = await Campaign.find().sort({ creationDate: -1 });

        // Log the successful fetch of campaigns
        logger.info("Successfully fetched campaigns.");

        // Respond with the fetched campaigns
        res.json(campaigns);
    } catch (error) {
        // Handle errors during campaign retrieval and log details
        logger.error("Error while fetching campaigns:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Define an asynchronous function to fetch a specific campaign by ID
exports.showCampaigndetails = async (req, res) => {
    try {
        // Log the process of fetching a particular campaign using its ID
        logger.info("Fetching particular campaign using ID...");

        // Retrieve the campaign ID from the request parameters
        const campaignId = req.params.campaignId;

        // Fetch the campaign from MongoDB by ID
        const campaign = await Campaign.findById(campaignId);

        // Check if the campaign exists
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        // Respond with the fetched campaign
        res.json(campaign);

        // Log the successful fetch of the campaign using its ID
        logger.info("Successfully fetched the campaign using ID.");
    } catch (error) {
        // Handle errors during campaign retrieval and log details
        logger.error('Error while fetching campaign:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
