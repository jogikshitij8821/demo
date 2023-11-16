
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../styles/footer.css';
const Footer = () => <footer className="bg-dark text-light py-3">
  <div className="container-fluid text-center text-md-left">
    <div className="row">
      <div className="col-md-6 mt-md-0 mt-3 text-left">
        <h5 className="seva-heading ">SEVA</h5>
        <div className=""> SEVA is your trusted partner for making a positive impact in your community through generous contributions.
          Together, we can create a brighter and better world for those in need..</div>
      </div>

      <div className="col-md-3 mb-md-0 mb-3">
        <h5 className="text-uppercase">Links</h5>
        <ul className="list-unstyled">
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
      </div>
      <Col className='mb-4 mb-md-0'>
        <h5>Contact</h5>
        <address>
          <div>123 Main Street</div>
          <div>City, State ZIP Code</div>
          <div>Email: info@example.com</div>
          <div>Helpline: +1 (800) 123-4567</div>
        </address>
      </Col>

    </div>
  </div>


</footer>

export default Footer