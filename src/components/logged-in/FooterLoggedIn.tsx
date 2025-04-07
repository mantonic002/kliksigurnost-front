import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaEnvelope, FaViber, FaWhatsapp } from "react-icons/fa";
import logo from "../../logo_final2.png";
import { Link } from "react-router-dom";

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
              <a
                href="https://www.facebook.com/profile.php?id=61573145025808"
                className="text-secondary"
              >
                <FaFacebookF />
              </a>
              <a
                href="mailto:podrska@kliksigurnost.com"
                className="text-secondary"
              >
                <FaEnvelope />
              </a>
              <a
                href="viber://chat?number=%2B381601234567"
                className="text-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaViber />
              </a>
              <a
                href="https://wa.me/381601234567"
                className="text-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </Col>

          <Col xs={12} md="auto" className="text-center mb-3 mb-md-0">
            <img
              src={logo}
              alt="KlikSigurnost Logo"
              style={{ height: "40px", width: "auto" }}
            />
            <p className="text-muted small mb-0">
              KlikSigurnost©{new Date().getFullYear()}
            </p>
          </Col>

          <Col xs={12} md="auto" className="text-center text-md-end">
            <div className="mb-2">
              <Link
                to="/uslovi"
                className="text-secondary text-decoration-none me-2 footer-link"
              >
                Uslovi korištenja
              </Link>
            </div>
            <div className="mb-2">
              <Link
                to="/privatnost"
                className="text-secondary text-decoration-none footer-link"
              >
                Politika privatnosti
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterLoggedIn;
