const mongoose = require("mongoose");
const googleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    loggedintime: { type: Date, required: true, index: true, unique: true, sparse: true }
});
const GoogleUser = mongoose.model("googleuser", googleSchema);
module.exports = GoogleUser;