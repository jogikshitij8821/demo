const Razorpay = require('razorpay');
const config = require("./config")

const razorpay = new Razorpay({
  key_id: config.razorpayKeyID,
  key_secret: config.razorpayKeySecret,
});

module.exports = razorpay;
