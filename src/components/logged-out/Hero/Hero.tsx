import { useLayoutEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { FaWindows, FaApple, FaAndroid, FaLinux } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/components/HeroSection.css";
import { BsCheckCircleFill, BsArrowRepeat } from "react-icons/bs";
import { Link } from "react-router-dom";


const features = [
  { text: "Automatsko filtriranje neprimerenog sadržaja", status: "done" },
  { text: "Roditelji sami podešavaju šta će blokirati u kojem periodu", status: "done" },
  { text: "Praćenje aktivnosti", status: "done" },
  { text: "Vremenska ograničenja", status: "done" },
  { text: "Prilagođavanje prema starosnoj dobi", status: "done" },
  { text: "Podesite jednom – bezbrižni ste zauvek", status: "done" },
  { text: "Podrška na srpskom jeziku", status: "done" },
  { text: "Praćenje lokacije deteta", status: "loading" },
  { text: "Obezbeđivanje celokupne kućne mreže", status: "loading" },
];


const HeroSection = () => {

  useLayoutEffect(() => {
    const updateHeroHeight = () => {
      const heroFirst = document.querySelector(".hero-first") as HTMLElement;
      if (heroFirst) {
        document.documentElement.style.setProperty(
          "--hero-first-height",
          `${heroFirst.clientHeight}px`
        );
      }
    };
  
    // Ensure the DOM is fully loaded and parsed
    if (document.readyState === "complete") {
      updateHeroHeight();
    } else {
      window.addEventListener("load", updateHeroHeight);
    }
  
    // Run on resize to keep the height updated
    window.addEventListener("resize", updateHeroHeight);
  
    // Clean up resize event listener on component unmount
    return () => window.removeEventListener("resize", updateHeroHeight);
  }, []); // Empty dependency array ensures it runs only once when component mounts

  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <Container>
          <Row className="align-items-center hero-content">
            {/* Left Content */}
            <Col lg={6} md={12} className="text-center text-lg-start">
              <div className="text-white hero-first listen-height">
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
                <Link to="/registracija">
                  <Button variant="primary" className="hero-btn">
                    Besplatna registracija!
                  </Button>
                </Link>
                {/* Available Platforms */}
                <div className="platforms-area">
                  <div className="platforms mt-4">
                    <span>Dostupno za sve uređaje:</span>
                    <FaAndroid className="platform-icon" />
                    <FaWindows className="platform-icon" />
                    <FaApple className="platform-icon" />
                    <FaLinux className="platform-icon" />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} className="text-center text-lg-start">
      <div className="text-white hero-first give-height">
        <ListGroup variant="flush">
        {features.map((feature, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex align-items-center bg-transparent border-0 text-light fs-5 fw-bold py-2"
          >
            {feature.status === "done" ? (
              <BsCheckCircleFill className="text-success me-2 fs-4" style={{ flexShrink: 0 }} />
            ) : (
              <BsArrowRepeat className="text-warning me-2 fs-4" style={{ flexShrink: 0 }} />
            )}

            <div className="d-flex flex-column w-100 text-start">
              {feature.text}
              {feature.status === "loading" && (
                <span className="text-warning fs-6 fw-normal">trenutno u pripremi</span>
              )}
            </div>
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
