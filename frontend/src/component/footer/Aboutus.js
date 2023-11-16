import Aboutnav from './aboutnav';
import Footer from './footer';
import { Container, Row, Col, Carousel, Card } from 'react-bootstrap';
import '../styles/about-us.css';
import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);

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
    axios.post('https://donation-backend-six1.onrender.com/submit-feedback', feedbackData)
      .then((response) => {
        console.log('Feedback submitted successfully:', response.data);
        handleShowModal();
        // Optionally, you can reset the form here if needed.
        // setName('');
        // setEmail('');
        // setFeedback('');
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
      });
  };

  return (
    <>
      <Aboutnav />
      <div className="light">
        <Container className="mt-4">
          {/* Carousel Section */}
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 "
                src="https://cdn.firespring.com/images/8d8563bb-54b4-4aec-a5c1-0a9a1c9c64f0.png"
              />
              <Carousel.Caption>
                <div className="bold-heading large-heading">First Slide</div>
                <div>Some description for the first slide.</div>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.beebehealthcare.org/sites/default/files/styles/1200x400/public/bb-Interventional_Web.jpg.webp?itok=YjvXERXX"
                alt="Second slide"
              />
              <Carousel.Caption>
                <div className="bold-heading large-heading">Second Slide</div>
                <div>Some description for the second slide.</div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          {/* What We Do Section */}
          <section className="my-5">
            <div className="bold-heading large-heading">What We Do</div>
            <div>
              We empower individuals and organizations to create positive change through fundraising and donations.
            </div>
            <div>Our core activities include:</div>
            <div>Supporting charitable causes and initiatives.</div>
            <div>Providing a platform for fundraisers to reach their goals.</div>
            <div>Facilitating connections between donors and those in need.</div>
            <div>Advocating for social and community impact.</div>
            <div>We believe in the power of collective action and the potential to make a difference in the world.</div>
          </section>

          <Row>
            <Col md={6}>
              <section className="my-5">
                <div className="bold-heading large-heading">Vision</div>
                <div>Our vision is to build a better world by connecting people with causes they care about.</div>
              </section>
            </Col>
            <Col md={6}>
              <section className="my-5">
                <div className="bold-heading large-heading">Mission</div>
                <div>Our mission is to provide a platform for fundraising and support initiatives that create a lasting impact.</div>
              </section>
            </Col>
          </Row>

          {/* Number of Fundraisers Supported */}
          <section className="my-5">
            <div className="bold-heading large-heading">Number of Fundraisers Supported</div>
            <div>Over 1000 fundraisers supported to date.</div>
          </section>

          {/* Number of Trusted Fundraisers */}
          <section className="my-5">
            <div className="bold-heading large-heading">Number of Trusted Fundraisers</div>
            <div>Thousands of trusted fundraisers making a difference.</div>
          </section>

          {/* How to Start a Fundraiser Section */}
          <section className="my-5">
            <div className="bold-heading large-heading">How to Start a Fundraiser with Us</div>
            <div>Learn how to create your own fundraising campaign with us.</div>
          </section>

          {/* Explore About Us with Grid Cards */}
          <section className="my-5">
            <div className="bold-heading large-heading">Explore About Us</div>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2016/06/13/09/57/meeting-1453895_640.png" />
                  <Card.Body>
                    <Card.Title>Our Team</Card.Title>
                    <Card.Text>Meet our dedicated team members.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Img variant="top" src="https://t3.ftcdn.net/jpg/03/15/07/22/360_F_315072284_S9Iz3pEPPsquS0KMl0dKCLacCdAj3pqL.jpg" />
                  <Card.Body>
                    <Card.Title>Our Mission</Card.Title>
                    <Card.Text>Learn about our mission and goals.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Img variant="top" src="https://cdni.iconscout.com/illustration/premium/thumb/group-of-volunteers-sorting-charity-items-6673670-5604126.png?f=webp" />
                  <Card.Body>
                    <Card.Title>What We Do</Card.Title>
                    <Card.Text>Discover our key activities and initiatives.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
      </div>

       
      <Footer />
    </>
  );
}

export default ContactUs;
