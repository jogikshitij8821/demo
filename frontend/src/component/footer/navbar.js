
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import Google from '../usermanagement/Google';
import '../styles/navbar.css';
function Defalultnav() {
  return (
    <>
      <Navbar bg="light" variant="light" sticky="top" className="navbar-shadow">
        <Container>
        <div className="d-flex align-items-center">
          <Navbar.Brand className="brand-text">
            SEVA
          </Navbar.Brand>
        </div>
          <Nav className="me-auto">
          <Link to="/about-us">About us</Link>
          {/* <Link to="/about-us">Contact</Link> */}
          </Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-dropdown">
              <span>
                <FontAwesomeIcon icon={faUser} size="lg" className="user-icon" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="dropdown-link mb-1 ">
                <FontAwesomeIcon className="user-icon-link" />
                <Google />
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
        </Container>
      </Navbar>
    </>
  );
}

export default Defalultnav;