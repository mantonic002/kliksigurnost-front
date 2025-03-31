import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaEnvelope,
  FaFileContract,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../logo_final2.png";

const Footer = () => {
  return (
    <footer className="footer py-4 bg-light">
      <Container>
        <Row className="align-items-center">
          {/* Social Links & Contact */}
          <Col md={4} sm={12} className="text-md-start text-center">
            <a href="https://www.facebook.com/profile.php?id=61573145025808" className="me-3 text-dark">
              <FaFacebookF size={20} />
            </a>
            <span className="gap-3 me-3 text-dark">
            <a href="mailto:podrska@kliksigurnost.com" className="text-dark">
              <FaEnvelope size={20} />
            </a>
            </span>
            <span className="">
            <Link to="/privatnost" className="gap-3 me-3 text-dark">
              <FaFileContract size={20} /> 
            </Link>
            </span>
            <Link to="/uslovi" className="gap-3 me-3 text-dark">
              <FaFileContract size={20} />
            </Link>
            <br/>
          </Col>
          
          {/* Logo */}
          <Col md={4} sm={12} className="text-center">
            <img
              src={logo}
              alt="KlikSigurnost Logo"
              width={80}
              className="mb-2"
            />

          </Col>
          
          {/* Legal Links */}
          <Col md={4} sm={12} className="text-md-end text-center">
            <p className="text-muted mb-0">KlikSigurnost © 2025</p>
            
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
