import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { FaWindows, FaApple, FaAndroid } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/components/HeroSection.css";
import { BsCheckCircleFill } from "react-icons/bs";


const features = [
  "Automatsko filtriranje sadržaja",
  "Praćenje lokacije deteta",
  "Vremenska kontrola",
  "Praćenje aktivnosti",
  "Obezbeđivanje celokupne kućne mreže",
  "Vremenska ograničenja",
  "Podrška na srpskom jeziku",
  "Prilagođavanje prema starosnoj dobi",
  "Sigurnost tokom učenja"
];

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <Container>
          <Row className="align-items-center hero-content">
            {/* Left Content */}
            <Col lg={6} md={12} className="text-center text-lg-start">
              <div className="text-white hero-first">
                <h1 className="hero-title">
                  <div className="main-title">
                    <span className="highlight">Klik</span>
                    <span className="highlight-2">Sigurnost</span>
                  </div>
                  za miran san roditelja i sigurnu budućnost dece.
                </h1>
                <p className="hero-subtitle fw-bold">
                  Za roditelje na Balkanu koji žele da osiguraju bezbedno
                  iskustvo na internetu za svoju decu, KlikSigurnost nudi
                  sveobuhvatnu roditeljsku kontrolu i praćenje lokacije.
                </p>
                <Button variant="primary" className="hero-btn">
                  Besplatna registracija!
                </Button>
                {/* Available Platforms */}
                <div className="platforms-area">
                  <div className="platforms mt-4">
                    <span>Dostupno za sve uređaje:</span>
                    <FaAndroid className="platform-icon" />
                    <FaWindows className="platform-icon" />
                    <FaApple className="platform-icon" />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} className="text-center text-lg-start">
      <div className="text-white hero-first">
        <ListGroup variant="flush">
          {features.map((feature, index) => (
            <ListGroup.Item key={index} className="d-flex align-items-center bg-transparent border-0 text-light fs-5 fw-bold py-2">
              <BsCheckCircleFill className="text-success me-2 fs-4" />
              {feature}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default HeroSection;
