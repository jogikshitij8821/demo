import React, { useState } from "react";
import Defalultnav from "./navbar";
import Footer from "./footer";
import "../styles/contactus.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Create an object with the feedback data
    const feedbackData = {
      name: name,
      email: email,
      feedback: feedback,
    };
    // Send a POST request to your server
    axios
      .post(`${apiurl}/submit-feedback`, feedbackData)
      .then((response) => {
        console.log("Feedback submitted successfully:", response.data);
        handleShowModal();

      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };
  return (
    <>
      <Defalultnav />
      <div className="mt-4">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="main-title">Contact Us</div>
              <div className="main-description">
                <div>
                  Have Questions or Feedback? We're here to help! Please feel
                  free to get in touch with us.
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-overlay image-container">
                <img
                  src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-share-donations_516790-368.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map of Nagpur Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                title="Dummy Map of Nagpur"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12084.105738216076!2d79.0620283!3d21.1525784!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd5e64a67424495%3A0x11ed2a4bde30f0d1!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1636406704233!5m2!1sen!2sin"
                width="90%" // Use Bootstrap class to make it full width
                height="450" // Adjust the height
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form Section */}
      <div className="container mt-5">
        <h3 className="main-subtitle">Feedback Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Message/Suggestions:</label>
            <textarea
              id="feedback"
              className="form-control"
              rows="4"
              value={feedback}
              onChange={handleFeedbackChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Feedback Submission Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for your feedback! We have received your feedback.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}

export default ContactUs;
