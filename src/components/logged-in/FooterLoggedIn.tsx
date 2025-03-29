import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../logo_final2.png";

const FooterLoggedIn = () => {
  return (
    <footer
      className="footer py-3 mt-auto"
      style={{
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #eaeaea",
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col
            xs={12}
            md="auto"
            className="text-center text-md-start mb-3 mb-md-0"
          >
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-secondary">
                <FaFacebookF />
              </a>
              <a href="#" className="text-secondary">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-secondary">
                <FaTwitter />
              </a>
              <a href="#" className="text-secondary">
                <FaInstagram />
              </a>
              <a href="#" className="text-secondary">
                <FaYoutube />
              </a>
            </div>
          </Col>

          <Col xs={12} md="auto" className="text-center mb-3 mb-md-0">
            <img
              src={logo}
              alt="KlikSigurnost Logo"
              style={{ height: "40px", width: "auto" }}
            />
          </Col>

          <Col xs={12} md="auto" className="text-center text-md-end">
            <p className="text-muted small mb-0">
              © {new Date().getFullYear()} KlikSigurnost. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterLoggedIn;
