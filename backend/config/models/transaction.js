const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    payer: {
        type: String,
        required: true,
    },
    payee: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Successfull",
    },
    creationDate: {
        type: Date,
    },
   generateReceipt:{
    type: Boolean, 
    required:true,
   }

});
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;