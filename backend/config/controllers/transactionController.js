// Import necessary modules and dependencies
const razorpay = require("../razorpay");
const Transaction = require('../models/transaction');
const logger = require('../../logger');

// Define an asynchronous function to create a transaction
exports.createTransaction = async (req, res) => {
    try {
        // Log the process of generating an order for the donation
        logger.info('Generating order for the donation...');

        // Extract relevant data from the request body
        const { amount, currency, fullName, campaignName, category } = req.body;
        logger.info("Get the donation form data in req.body.");

        // Get the current Indian time and format it
        const currentIndianTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        const creationDate = new Date(currentIndianTime).toISOString();

        // Define order options for Razorpay
        const orderOptions = {
            amount: amount * 100, // Amount in paisa (Indian subunit)
            currency: currency,
        };

        // Create a Razorpay order
        razorpay.orders.create(orderOptions, (err, order) => {
            if (err) {
                // Handle errors during order creation and log details
                logger.error('Error creating Razorpay order:', err);
                res.status(500).json({ error: 'Failed to create Razorpay order' });
            } else {
                // Respond with the created Razorpay order
                res.status(200).json(order);
            }
        });

        // Log the successful creation of the Razorpay order
        logger.info("Successfully created the Razorpay order.");

        // Create a new transaction record and save it to MongoDB
        const data = new Transaction({ payer: fullName, amount: amount, date: new Date(), payee: campaignName, category: category, status: "Successfull", creationDate: creationDate,generateReceipt: true, });

        // Log the process of saving transaction data in MongoDB
        logger.info("Saving transaction data in MongoDB...");

        // Save the transaction data to MongoDB
        await data.save();

        // Log the successful save of transaction data in MongoDB
        logger.info("Successfully saved the transaction data in MongoDB.");
    } catch (error) {
        // Handle errors during the transaction creation and log details
        logger.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
};

// Define an asynchronous function to fetch transaction details
exports.findTransaction = async (req, res) => {
    try {
        // Log the process of fetching transaction details
        logger.info("Fetching transaction details...");

        // Fetch transaction records from MongoDB and sort them by creation date
        const transactions = await Transaction.find().sort({ creationDate: -1 });

        // Log the successful fetch of transaction details
        logger.info("Successfully fetched the transaction details.");

        // Respond with the fetched transaction records
        res.json(transactions);
    } catch (error) {
        // Handle errors during transaction retrieval and log details
        logger.error("Error while fetching transaction details", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
