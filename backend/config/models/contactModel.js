const mongoose = require('mongoose');

// Define the schema for the Contact Model
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// Create a model using the schema
const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;
