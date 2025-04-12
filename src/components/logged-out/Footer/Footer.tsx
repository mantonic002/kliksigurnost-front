import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaEnvelope, FaViber, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../logo_final2.png";
import "../../../styles/components/Footer2.css"

const Footer = () => {
  return (
    <footer className="footer py-3 bg-light">
      <Container>
        <Row className="d-flex align-items-center justify-content-between flex-wrap">
          {/* Social Links */}
          <Col className="d-flex align-items-center gap-3">
            <a href="https://www.facebook.com/profile.php?id=61573145025808" className="text-dark" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={20} />
            </a>
            <a href="mailto:podrska@kliksigurnost.com" className="text-dark">
              <FaEnvelope size={20} />
            </a>
            <a href="viber://chat?number=%2B381665182959" className="text-dark" target="_blank" rel="noopener noreferrer">
              <FaViber size={20} />
            </a>

            <a href="https://wa.me/381665182959" className="text-dark" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={20} />
            </a>
          </Col>

          {/* Logo */}
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <img src={logo} alt="KlikSigurnost Logo" width={80} />
            <p className="text-muted mb-0">KlikSigurnost©2025</p>
          </Col>


          {/* Copyright */}
          <Col className="d-flex flex-column align-items-end">
          <div className="mb-2">
            <Link to="/uslovi" className="text-dark text-decoration-none me-2 footer-link">Uslovi korištenja</Link>
          </div>
          <div className="mb-2">
            <Link to="/privatnost" className="text-dark text-decoration-none footer-link">Politika privatnosti</Link>
          </div>
            
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
