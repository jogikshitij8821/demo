// import React from "react";
// import jsPDF from "jspdf";

// const ReceiptGenerator = (params) => {
//    console.log("data",params.transaction);
//   const generateReceipt = () => {
//     if ( params.transaction) {
//       const transaction = params.data;
//       console.log("dsa",transaction)
//       const doc = new jsPDF();
//       doc.setFontSize(12);
//       doc.text(`Receipt for ${transaction.payee}`, 10, 20);
//       doc.text(`Date: ${transaction.date}`, 10, 30);
//       doc.text(`ID: ${transaction._id}`, 10, 40);
//       doc.text(`Amount: ₹${transaction.amount}`, 10, 50);
//       doc.text(`Category: ${transaction.category}`, 10, 60);
//       doc.text(`Payer: ${transaction.payer}`, 10, 70);
//       doc.text(`Status: ${transaction.status}`, 10, 80);
//       doc.save("receipt.pdf");
//     }
//   };

//   return (
//     <div className="receipt-container">
//       <a href="#" onClick={generateReceipt} download="receipt.pdf">
//         Generate Receipt
//       </a>
//     </div>
//   );
// };

// export default ReceiptGenerator;
