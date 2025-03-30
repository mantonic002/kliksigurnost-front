import { Container, Row, Col, Button } from "react-bootstrap";
import { FaUserPlus, FaUsersCog, FaClock, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../../styles/components/MadeEasy.css";

import madeImg from "/images/made3.jpg";

const MadeEasy = () => {

  const steps = [
    {
      icon: <FaUserPlus className="step-icon" />,
      title: "Registracija",
      description: "Registrujte se i kreirajte porodični nalog.",
    },
    {
      icon: <FaUsersCog className="step-icon" />,
      title: "Podešavanje profila",
      description: "Podesite profile za svako dete, prilagođavajući filtere.",
    },
    {
      icon: <FaClock className="step-icon" />,
      title: "Vremenska ograničenja",
      description: "Definišite vremenska ograničenja i dozvoljene sadržaje.",
    },
    {
      icon: <FaShieldAlt className="step-icon" />,
      title: "Aktiviranje zaštite",
      description: "Aktivirajte zaštitu na svim uređajima koje vaše dete koristi.",
    },
  ];

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
      <h3 className="section-subtitle text-center">
        Jednostavno podešavanje u nekoliko koraka:
      </h3>
      <ul className="setup-list">
        {steps.map((step, index) => (
          <li key={index} className="setup-list-item">
            <span className="step-icon-container">{step.icon}</span>
            <div>
              <strong className="moje">{index + 1}. {step.title}</strong>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/vodic">
        <Button variant="primary" className="learn-btn">
          Detaljan vodič
        </Button>
      </Link>
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
              <Link to="/kontakt">
                <Button variant="primary" className="learn-btn">
                  Zakažite sastanak!
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MadeEasy;
