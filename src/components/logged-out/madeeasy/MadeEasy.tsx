import { Container, Row, Col, Button } from "react-bootstrap";
import "../../../styles/components/MadeEasy.css";

import madeImg from "/images/made3.jpg";

const MadeEasy = () => {
  return (
    <section className="made-easy-section section-bg">
      <Container>
        <div className="title-area made-title">
          <h2 className="section-title">
            Jednostavna i efikasna aplikacija za roditeljsku kontrolu
          </h2>
          <div className="border-area">
            <div className="underline-border"></div>
          </div>
        </div>
        <Row className="align-items-center sec-content">
          {/* Left Section with Image */}
          <Col lg={6} className="position-relative text-center text-lg-start">
            <div className="image-box">
              <img src={madeImg} alt="Shield Icon" className="main-image" />
            </div>
          </Col>

          {/* Right Section with Text */}
          <Col lg={6} className="text-center text-lg-start">
            <div className="made-text">
              <h3 className="section-subtitle">
                Jednostavno podešavanje u nekoliko koraka:
              </h3>
              <p className="section-text">
                - Registrujte se i kreirajte porodični nalog.
                <br />
                - Podesite profile za svako dete, prilagođavajući filtere.
                <br />
                - Definišete vremenska ograničenja i dozvoljene sadržaje.
                <br />
                - Aktivirate zaštitu na svim uređajima koje vaše dete koristi.
                <br />
              </p>
              <Button variant="primary" className="learn-btn">
                Saznajte više
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="align-items-center sec-content">
          {/* Left Section with Image - Moves up on small screens */}
          <Col
            lg={6}
            className="position-relative text-center text-lg-start order-1 order-lg-2"
          >
            <div className="image-box">
              <img src={madeImg} alt="Shield Icon" className="main-image" />
            </div>
          </Col>

          {/* Right Section with Text - Moves down on small screens */}
          <Col lg={6} className="text-center text-lg-start order-2 order-lg-1">
            <div className="made-text">
              <h3 className="section-subtitle">Zajedno rešavamo probleme!</h3>
              <p className="section-text">
                Ukoliko trebate pomoc prilikom podešavanja ili imate dodatna
                pitanja, stupite u kontakt sa našim timom tehničke podrške putem
                poziva ili online zakazanog sastanaka.
              </p>
              <Button variant="primary" className="learn-btn">
                Forma za zakazivanje sastanka
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MadeEasy;
