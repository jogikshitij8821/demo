// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import logger from '../../logger';
import jsPDF from 'jspdf';
import "../styles/transaction.css";


const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  useEffect(() => {
    // Fetch transactions from the server
    axios
      .get(`${apiurl}/api/transactions`)
      .then((response) => {
        logger.log('Transactions data retrieved successfully', response);
        setTransactions(response.data);
      })
      .catch((error) => {
        logger.error('Error fetching transactions:', error);
      });
  }, []);
  // console.log(transactions);

  // Function to generate a PDF receipt
  const generateReceipt = async (transactionId) => {
    console.log("id",transactionId);
    try {
      const response = await axios.get(`${apiurl}/api/generate-receipt/${transactionId}`, {
        responseType: 'blob',
      });

      const receiptBlob = new Blob([response.data], { type: 'application/pdf' });

      // Open the receipt in a new tab
      const url = URL.createObjectURL(receiptBlob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error generating receipt:', error);
      // Handle error, show a message, etc.
    }
  };

  // ReceiptGenerator component for generating receipts
  const ReceiptGenerator = (params) => {
    const handleGenerateReceipt = () => {
      console.log("Transaction ID:", params.data._id);
      generateReceipt(params.data._id);
    };

    return (
      <div className="receipt-container">
        <a href="#" onClick={handleGenerateReceipt} download="receipt.pdf">
          Generate Receipt
        </a>
      </div>
    );
  };

  // Define column definitions for the Ag-Grid
  const columnDefs = [
    { headerName: 'Campaign Name', field: 'payee', filter: 'agMultiColumnFilter' },
    { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter', valueFormatter: dateFormatter },
    {
      headerName: 'Amount',
      field: 'amount',
      filter: 'agMultiColumnFilter',
      valueFormatter: amountFormatter,
      cellStyle: { textAlign: 'left' },
      width: 120,
    },
    { headerName: 'Category', field: 'category', filter: 'agMultiColumnFilter' },
    { headerName: 'Payer', field: 'payer', filter: 'agMultiColumnFilter' },
    { headerName: 'Status', field: 'status', filter: 'agMultiColumnFilter' },
    { headerName: 'Receipt', field: 'generateReceipt', filter: 'agMultiColumnFilter', cellRenderer: ReceiptGenerator },
  ];

  // Function to format date
  function dateFormatter(params) {
    const originalDate = new Date(params.value);
    const formattedDate = originalDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  }

  // Function to format amount
  function amountFormatter(params) {
    return `₹${params.value}`;
  }

  return (
    <div className="transaction-history-container">
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          rowData={transactions}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={15}
          suppressHorizontalScroll={true}
          suppressRowClickSelection={true}
          onRowClicked={(event) => setSelectedTransaction(event.data)}
        />
      </div>
    </div>
  );
};

export default TransactionHistory;
