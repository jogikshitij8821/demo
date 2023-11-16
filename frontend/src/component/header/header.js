import React from 'react';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Google from '../usermanagement/Google';
import '../styles/header.css';

function Header({ setLoadingState }) {

  return (
    <Navbar bg="light" variant="light" className="bg-white" sticky="top">
      <Container>
        <div className="d-flex align-items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4G14srNIK9o9SoefKOWJYlyasDttau2IXt3wGPohlbbhfVTEUY2vYlq807h_gijoo3-s&usqp=CAU" // Replace with your image path or URL
            alt="Logo"
            width="70"
            height="50"
            className="d-inline-block align-top m-3"
          />
          <div className="brand-text">
            SEVA
          </div>
        </div>
        <div className="d-flex align-items-center">

          <Nav className="me-auto">
          </Nav>
          <div className="d-flex align-items-center">
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-dropdown">
                <span>
                  <FontAwesomeIcon icon={faUser} size="lg" className="user-icon" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="dropdown-link mb-1 ">
                  <FontAwesomeIcon className="user-icon-link" />
                  <Google setLoadingState={setLoadingState} /> {/* Pass the function as a prop */}
                </Dropdown.Item >
                <Dropdown.Item as={Link} to="/login" className="dropdown-link">
                  <FontAwesomeIcon icon={faSignInAlt} className="user-icon-link" />
                  Signin
                </Dropdown.Item >
                <Dropdown.Item as={Link} to="/signup" className="dropdown-link">
                  <FontAwesomeIcon icon={faUserPlus} className="user-icon-link" />
                  Signup
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;