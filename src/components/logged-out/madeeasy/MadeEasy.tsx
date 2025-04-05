import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaUserPlus, FaUsersCog, FaClock, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../../styles/components/MadeEasy.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import wheel from "/images/settings_wheel.png"
import phone from "/images/call.png"

const MadeEasy = () => {

  const [isWheelInView, setIsWheelInView] = useState(false);
  const [isPhoneInView, setIsPhoneInView] = useState(false);

  const wheelRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wheelObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Start animation for the settings wheel when it comes into view
          setIsWheelInView(true);

          // Reset animation after it finishes (10 seconds)
          setTimeout(() => setIsWheelInView(false), 10000); // Adjust timeout to match the animation duration
        }
      },
      { threshold: 0.5 }
    );

    const phoneObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Start animation for the phone icon when it comes into view
          setIsPhoneInView(true);

          // Reset animation after it finishes (1 second)
          setTimeout(() => setIsPhoneInView(false), 1000); // Adjust timeout to match the shake animation duration
        }
      },
      { threshold: 0.5 }
    );

    if (wheelRef.current) {
      wheelObserver.observe(wheelRef.current); // Observe the settings wheel
    }

    if (phoneRef.current) {
      phoneObserver.observe(phoneRef.current); // Observe the phone icon
    }

    return () => {
      if (wheelRef.current) {
        wheelObserver.unobserve(wheelRef.current);
      }
      if (phoneRef.current) {
        phoneObserver.unobserve(phoneRef.current);
      }
    };
  }, []);

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

  const navigate = useNavigate();

  const handleClick = () => {
      navigate("/prijava");
      toast.error("Zakazivanje sastanka je dostupno samo prijavljenim korisnicima. Molimo Vas da se prijavite.");
  };

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
          <div className="settings-wheel-container" ref={wheelRef}>
            <img src={wheel} alt="Settings Wheel" className={`rotating-wheel ${isWheelInView ? 'rotate-animation' : ''}`} />
          </div>
          </Col>

          {/* Right Section with Text */}
          <Col lg={6} className="text-center text-lg-start">
            <div className="made-text w-100 text-center">
      <h3 className="section-subtitle text-center">
        Jednostavno podešavanje u 4 koraka:
      </h3>
      <ul className="setup-list">
        {steps.map((step, index) => (
          <li key={index} className="setup-list-item">
            <span className="step-icon-container">{step.icon}</span>
            <div>
              <strong className="moje">{step.title}</strong>
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
          <div className="settings-wheel-container" ref={phoneRef}>
            <img src={phone} alt="korisnicka podrska" className={`phone-icon ${isPhoneInView ? 'shake-animation' : ''}`} />
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
              <Button variant="primary" className="learn-btn" onClick={handleClick}>
                Zakažite sastanak!
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MadeEasy;
