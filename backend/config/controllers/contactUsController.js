const ContactModel = require('../models/contactModel');

// Controller for handling contact form submissions
exports.submitContactForm = async (req, res) => {
  try {
    // Extract form data from the request
    const { name, email, feedback } = req.body;

    // Validate and save the data to the database (contactModel)
    const newContact = new ContactModel({ name, email, message:feedback });
    const savedContact = await newContact.save();

    // Send a success response
    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
