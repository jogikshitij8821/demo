const mongoose = require('mongoose');
const campaignSchema = new mongoose.Schema({
    campaignName: String,
    campaignGoal: Number,
    campaignDescription: String,
    campaignCategory:String,
    campaignReason: String,
    campaignImage: String,
    startDate: Date,
    endDate: Date,
    creationDate: Date, 
  });
  
  const Campaign = mongoose.model("Campaign", campaignSchema);
  module.exports = Campaign;