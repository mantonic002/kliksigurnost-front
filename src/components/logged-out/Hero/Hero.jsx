import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaWindows, FaApple, FaAndroid, FaChrome } from "react-icons/fa";
import { IoLogoIonic } from "react-icons/io";
import heroImage from "../../../public/images/happy_family_brush.png"; // Make sure to replace with the correct image path
import "bootstrap/dist/css/bootstrap.min.css";


const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <Container>
          <Row className="align-items-center hero-content">
            {/* Left Content */}
            <Col lg={6} className="text-center text-lg-start text-white hero-first">
              <h1 className="hero-title">
                <span className="highlight">Klik</span><span className="highlight-2">Sigurnost</span>
                <br /> za miran san roditelja i sigurnu budućnost dece.
              </h1>
              <p className="hero-subtitle">
              Za roditelje na Balkanu koji žele da osiguraju bezbedno iskustvo na internetu za svoju decu, 
              KlikSigurnost nudi sveobuhvatnu roditeljsku kontrolu i praćenje lokacije. 
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
            </Col>

            {/* Right Image */}
            <Col lg={6} className="text-center mx-auto text-center mt-4 mt-lg-0">
              <img src={heroImage} alt="Hero Illustration" className="hero-image img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default HeroSection;