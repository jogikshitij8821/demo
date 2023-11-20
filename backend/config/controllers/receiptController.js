// controllers/receiptController.js
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');

const Transaction = require('../models/transaction');
const logger = require('../../logger');

// Function to generate and send a receipt
exports.generateReceipt = async (req, res) => {
    try {
        const  transactionId = req.params.transactionId;
        logger.info('Received request to generate receipt for transaction ID:', transactionId);

        // Fetch transaction details from MongoDB
        const transaction = await Transaction.findById(transactionId);
        logger.info('Transaction details:', transaction);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const doc = new PDFDocument();
        const stream = doc.pipe(blobStream());

        // Customize your receipt generation logic using PDFKit based on the transaction data
        doc.text('Receipt');
        doc.text(`Transaction ID: ${transaction._id}`);
        doc.text(`Date: ${transaction.date}`);
        doc.text(`Category: ${transaction.category}`);
        doc.text(`Payer: ${transaction.payer}`);
        doc.text(`Payee: ${transaction.payee}`);
        doc.text(`Status: ${transaction.status}`);
        // Add other receipt details as needed

        // Finalize the PDF and create a Blob
        doc.end();
        stream.on('finish', () => {
            const blob = stream.toBlob('application/pdf');
            // Assuming you have a way to send this blob to the user, for example, via email or download link
            res.status(200).send(blob);
        });
    } catch (error) {
        // Handle errors during receipt generation and log details
        logger.error('Error generating receipt:', error);
        res.status(500).json({ error: 'Failed to generate receipt' });
    }
};
