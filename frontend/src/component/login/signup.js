import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Alert,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { setMongoDBData } from "../Redux/action";
import { useDispatch } from "react-redux";
import "../styles/signup.css";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Define passwordError and its setter
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Define SuccessModal state

  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  const handleValidation = () => {
    if (!username || !password) {
      setLoginError("Username and password are required.");
      return false;
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.");
      return false;
    }

    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyFields = {};

    if (username.trim() === "") {
      emptyFields.fullName = true;
    }
    if (email.trim() === "") {
      emptyFields.email = true;
    }
    if (password.trim() === "") {
      emptyFields.password = true;
    }

    if (Object.keys(emptyFields).length > 0) {
      setError("Please fill in all required fields");
      setSubmitted(true);
    } else if (!isValidEmail(email)) {
      setError("Invalid email format");
      setSubmitted(true);
    } else {
      if (!handleValidation()) {
        return;
      }

      const data = {
        username,
        email,
        password,
      };
      setIsLoading(true);

      axios
        .post(`${apiurl}/users/register`, data)
        .then((response) => {
          if (response.data) {
            dispatch(setMongoDBData(response.data));
            localStorage.setItem('user', JSON.stringify(response.data));

            // Show the success modal
            setShowSuccessModal(true);
          } else {
            setError("Failed to register");
          }
        })
        .catch(() => {
          setError("An error occurred");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const isValidEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setError(false);

    navigate("/");
  };
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/login"); // Navigate to the login page
  }
  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="title">User Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <Container style={{ maxWidth: "800px" }}>
            <Row className="align-items-center">
              <Col lg={6} className="text-center">
                <div>
                  <img
                    src="/logo.jpeg"
                    alt="Logo"
                    className="app-logo"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </Col>
              <Col xl={6}>
                <Form
                  style={{ backgroundColor: "#f2f2f2", padding: "20px" }}
                  onSubmit={handleSubmit}
                >
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      value={username}
                      type="text"
                      placeholder="Enter Username"
                      className={`form-control ${submitted && !username.trim() ? "is-invalid" : ""
                        }`}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={email}
                      type="email"
                      placeholder="Enter Email"
                      className={`form-control ${submitted && !email.trim() ? "is-invalid" : ""
                        }`}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <div className="password-input">
                      <Form.Control
                        value={password}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        className={`form-control ${submitted && !password.trim() ? "is-invalid" : ""
                          }`}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className="password-toggle-icon"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </span>
                    </div>
                  </Form.Group>
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                  <br />
                  {isLoading ? (
                    <div className="text-center">
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-block"
                    >
                      Submit
                    </Button>
                  )}
                  <p className="login-p">
                    Don't have an account?{" "}
                    <span
                      className="login-span"
                      onClick={() => {
                        navigate("/login");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Login
                    </span>
                  </p>
                </Form>
                {loginError && <Alert variant="danger">{loginError}</Alert>}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      <Modal show={showSuccessModal} onHide={closeSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title className="title">Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for registering. You can now access your account using new credentials.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default Signup;
