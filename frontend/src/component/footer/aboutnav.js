import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import Google from '../usermanagement/Google';

function Aboutnav() {
  return (
    <>
      <Navbar bg="light" variant="light" sticky="top">
        <Container>
          <div className="d-flex align-items-center">
            <Navbar.Brand href="#home" className="brand-text">
              SEVA
            </Navbar.Brand>
          </div>
          <Nav className="me-auto">
            <Link to="/contact-us">Contact us</Link>
            {/* <Link to="/about-us">Contact</Link> */}
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-dropdown">
              <span>
                <FontAwesomeIcon icon={faUser} size="lg" className="user-icon" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="dropdown-link mb-1 " />
              <FontAwesomeIcon className="user-icon-link" />
               <Google />
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
        </Container>
      </Navbar>
    </>
  );
}

export default Aboutnav;