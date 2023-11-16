import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { loginSuccess } from '../Redux/action';
import { useDispatch } from 'react-redux';
import logger from '../../logger';
 
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added
  const apiurl = process.env.REACT_APP_API_BACKEND_URL;

  // Validation state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();



  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Add password validation (you can customize this)
    if (!value || value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };
  useEffect(() => {
    setShowModal(true);
    logger.log('Modal is shown.');
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setError(false);
    navigate("/");
    logger.log('Modal is closed.');
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    logger.log('Password visibility toggled.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    // Check for validation errors
    if (emailError || passwordError) {
      logger.log('Validation errors detected.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${apiurl}/api/login`, {
        username,
        password,
      });

     if (response.data) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `JWT ${response.data.token}`;
      console.log(response.data);
     dispatch(loginSuccess(response.data));
     localStorage.setItem('user', JSON.stringify(response.data));
        navigate("/home");
      } else {
        setError('Login failed. Please check your credentials.');
        logger.log('Login failed.');

      }
    } catch (error) {
      setError('Invalid email or password.');
      logger.error('Error during login:', error);
    }
    finally {
      setIsLoading(false);
      logger.log('Login request completed.');

    }
  };

  return (<>
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="title">Login Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {emailError && <small className="text-danger">{emailError}</small>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <div className="password-input">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {passwordError && <small className="text-danger">{passwordError}</small>}
          </Form.Group>
          <Button variant="primary" type="submit">
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
          </Button>
          <div className="login-p">
            Don't have an account?{' '}
            <span
              className="login-span"
              onClick={() => {
                // Use the navigate function to direct to the signup page
                navigate('/signup');
              }}
              style={{ cursor: 'pointer' }}>
              Sign Up
            </span>
          </div>
        </Form>
        {loginError && <Alert variant="danger">{loginError}</Alert>}
      </Modal.Body>
    </Modal>
  </>
  );
};

export default Login;