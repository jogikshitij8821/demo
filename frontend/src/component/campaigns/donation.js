import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useRazorpay from "react-razorpay";
import logger from "../../logger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheckCircle } from "@fortawesome/free-solid-svg-icons"; // Add the check-circle icon

function DonationForm({ campaignName, campaignCategory, onSuccess }) {
  const [show, setShow] = useState(false);
  const [Razorpay] = useRazorpay();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    amount: "",
    donationType: "individual",
    gstNumber: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [gstVerificationResult, setGstVerificationResult] = useState(null);
  const [isCorporate, setIsCorporate] = useState(false); // Track if "Corporate" is selected
  const [isVerified, setIsVerified] = useState(false); // Track GST verification
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleClose = () => {
    setShow(false);
    setFormErrors({});
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      amount: "",
      donationType: "individual",
      gstNumber: "",
    });
    setGstVerificationResult(null);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDonationTypeChange = (e) => {
    const { value } = e.target;
    setIsCorporate(value === "corporate"); // Update "isCorporate" state
    setFormData({
      ...formData,
      donationType: value,
      gstNumber: "", // Clear GST number when switching between Individual and Corporate
    });
  };


  const handleAnonymousChange = () => {
    setIsAnonymous(!isAnonymous);
  };


  const validateForm = () => {
    const errors = {};

    if (!isAnonymous) {
      if (!formData.fullName.trim()) {
        errors.fullName = "Full Name is required";
      }

      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = "Invalid email format";
      }

      if (!formData.mobileNumber.trim()) {
        errors.mobileNumber = "Mobile Number is required";
      }

      if (
        !formData.amount.trim() ||
        isNaN(formData.amount) ||
        parseFloat(formData.amount) <= 0
      ) {
        errors.amount = "Invalid amount";
      }

      if (isCorporate) {
        if (!formData.gstNumber.trim()) {
          errors.gstNumber = "GST Number is required for Corporate donations";
        }
      }
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const razorpaykeyid = process.env.REACT_APP_API_RAZORPAY_KEYID;
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  const handleRazorpayPayment = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      const orderData = {
        amount: formData.amount,
        currency: "INR",
        fullName: isAnonymous ? "Anonymous" : formData.fullName,
        email: isAnonymous ? "Anonymous" : formData.email,
        mobileNumber: isAnonymous ? "Anonymous" : formData.mobileNumber,
        campaignName: campaignName,
        category: campaignCategory,
        donationType: formData.donationType,
        gstNumber: formData.gstNumber,
      };

      const response = await axios.post(
        `${apiurl}/create-razorpay-order`,
        orderData
      );
      const orderId = response.data.id;

      const razorpay = new Razorpay({
        key: razorpaykeyid,
      });

      razorpay.on("payment.failed", function (response) {
        logger.log("payment", response);
        logger.error("Razorpay Payment Failed:", response.error.description);
        alert("Payment failed. Please try again.");

      });

      razorpay.open({
        key: razorpaykeyid,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderId,
        handler: function (response) {
          logger.log(response);
          alert("Payment Successful: " + response.razorpay_payment_id);
          if (onSuccess) {
            onSuccess();
          }
        }
      });
    } catch (error) {
      logger.error("Error creating Razorpay order:", error);
      alert("Payment submission failed. Please try again later.");
    }
  };


  const apikey = "b39f1e76baa0a1081a4ae141565bf835";
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://sheet.gstincheck.co.in/check/${apikey}/${formData.gstNumber}`
      );
      console.log("API Response:", response.data);
      if (response.data) {
        setIsVerified(true); // Set GST verification to true
        setGstVerificationResult(response.data.data.lgnm); // Save the response data
      } else {
        setIsVerified(false);
        setGstVerificationResult(null);
      }
    } catch (error) {
      console.error("Error during GST verification:", error);
      setIsVerified(false);
      setGstVerificationResult(null);
    }
  }
  const handlePayNow = () => {
    if (validateForm()) {
      handleRazorpayPayment();
      handleClose();
    }
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center mb-1"
        onClick={handleShow}
        style={{ cursor: "pointer" }}
      >
        Donate
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="truncate-text">{campaignName}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                isInvalid={formErrors.fullName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.fullName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="mobileNumber">
              <Form.Label>Mobile Number:</Form.Label>
              <Form.Control
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                isInvalid={formErrors.mobileNumber}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.mobileNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Donation Amount:</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                isInvalid={formErrors.amount}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.amount}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="donationType">
              <Form.Label>Donation Type:</Form.Label>
              <Form.Check
                type="radio"
                name="donationType"
                label="Individual"
                value="individual"
                checked={formData.donationType === "individual"}
                onChange={handleDonationTypeChange}
              />
              <Form.Check
                type="radio"
                name="donationType"
                label="Corporate"
                value="corporate"
                checked={formData.donationType === "corporate"}
                onChange={handleDonationTypeChange}
              />
            </Form.Group>

            <Form.Group controlId="anonymous">
            <Form.Label>Donation Anonymously:</Form.Label>
              <Form.Check
                type="checkbox"
                label="Anonymously"
                checked={isAnonymous}
                onChange={handleAnonymousChange}
              />
            </Form.Group>

            {isCorporate && (
              <Form.Group controlId="gstNumber" className="d-flex">
                <Form.Label>GST Number:</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    isInvalid={formErrors.gstNumber}
                  />
                  {isVerified && ( // Display the verified checkmark
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faCheckCircle} color="green" />
                    </span>
                  )}
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
                    </span>
                  </div>
                </div>
                {formErrors.gstNumber && (
                  <div className="text-danger">{formErrors.gstNumber}</div>
                )}
              </Form.Group>
            )}

            {isVerified && gstVerificationResult && (
              <div>
                <Form.Label>Company Name:</Form.Label>
                <pre>{JSON.stringify(gstVerificationResult, null, 2)}</pre>
              </div>
            )}
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePayNow}>
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default DonationForm;

