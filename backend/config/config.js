require('dotenv').config();

module.exports = {
  apiMongoURL: process.env.MONGODB_URL,
  apiGoogle: process.env.GOOGLE_API,
  razorpayKeyID: process.env.RAZORPAY_KEY_ID,
  razorpayKeySecret:process.env.RAZORPAY_KEY_SECRET,
  secretKey:process.env.SECRET_KEY,
};