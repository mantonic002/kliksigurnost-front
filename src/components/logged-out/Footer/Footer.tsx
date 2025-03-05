import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../../logo_final2.png";

const Footer = () => {
  return (
    <footer className="footer py-4 bg-light">
      <Container>
        {/* Social Links on the Left, Logo in Center */}
        <Row className="align-items-center">
          <Col md={4} sm={12} className="text-md-start text-center social-links">
            <FaFacebookF className="me-3" />
            <FaLinkedinIn className="me-3" />
            <FaTwitter className="me-3" />
            <FaInstagram className="me-3" />
            <FaYoutube />
          </Col>

          <Col md={4} sm={12} className="text-center">
            <img src={logo} alt="KlikSigurnost Logo" width={80} className="mb-2" />
          </Col>

          <Col md={4} sm={12} className="text-md-end text-center">
            <p className="text-muted mb-0">KlikSigurnost © 2025</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
