import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaExclamationTriangle,
  FaComments,
  FaHome,
  FaCog,
  FaGraduationCap,
  FaLightbulb,
} from "react-icons/fa";
import studyImage from "/images/happy_family_brush.png"; // Replace with actual image path
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import "../../../styles/components/Concerns.css";
import { useState } from 'react';

const concernsData = [
  {
    title: "Zašto KlikSigurnost",
    icon: <FaShieldAlt />,
    content:
      "Detaljan opis kako KlikSigurnost pomaže roditeljima da zaštite decu od digitalnih opasnosti kroz filtriranje sadržaja, praćenje aktivnosti i postavljanje vremenskih ograničenja, dok istovremeno omogućava sigurno istraživanje interneta.",
    path: "/saveti/zastoks",
  },
  {
    title: "Skriveni Rizici digitalnog sveta",
    icon: <FaExclamationTriangle />,
    content:
      "U ovom članku su istaknuti rizici s kojima se deca suočavaju na internetu, kao što su sajber maltretiranje, pristup pornografiji i seksualna eksploatacija a zatim objašnjenja kako KlikSigurnost nudi efikasne alate za zaštitu dece, uz pružanje sigurnog digitalnog okruženja kroz filtriranje sadržaja, praćenje aktivnosti i postavljanje vremenskih ograničenja.",
      path: "/saveti/rizici",
  },
  {
    title: "Razgovor sa decom o sigurnosti na internetu",
    icon: <FaComments />,
    content:
      "Predlozi za otvoren razgovor sa decom o bezbednosti na internetu, uvođenju alata poput KlikSigurnosti, i načina da zaštitite svoju decu od digitalnih opasnosti kroz preventivne mere i tehnologiju.",
      path: "/saveti/razgovor",
  },
  {
    title: "10 osnovnih pravila u Vašem domu",
    icon: <FaHome />,
    content:
      "Postavljanjem jasnih pravila, korišćenjem alata poput KlikSigurnosti i aktivnim učešćem u digitalnom životu deteta, roditelji mogu stvoriti sigurno okruženje na internetu koje omogućava deci da istražuju i uživaju u svim prednostima digitalnog sveta bez rizika.",
      path: "/saveti/pravila",
  },
  {
    title: "Podešavanje KlikSigurnost alata prema uzrastu",
    icon: <FaCog />,
    content:
      "Pravilnim podešavanjem KlikSigurnost alata prema starosnom uzrastu deteta, roditelji mogu osigurati bezbedno i kontrolisano internet iskustvo, prilagođeno potrebama i fazama razvoja svog deteta",
      path: "/saveti/podesavanje",
  },
  {
    title: "Preporuke za edukativne sajtove na srpskom",
    icon: <FaGraduationCap />,
    content:
      "Korišćenjem preporučenih edukativnih sajtova i aplikacija, roditelji mogu obezbediti deci sigurno i kvalitetno online iskustvo koje podstiče učenje i razvoj.",
    path: "/saveti/sajtovi",
  },
  {
    title: "Mudri načini da budete u toku",
    icon: <FaLightbulb />,
    content:
      "KlikSigurnost vam pomaže da pratite i kontrolišete internet aktivnosti vašeg deteta, sprečavajući neželjeni sadržaj i omogućavajući zdravo digitalno okruženje kroz jasno postavljene granice i automatske kontrole.",
      path: "/saveti/trikovi",
  },
];

const Concerns = () => {
  const [activeKey, setActiveKey] = useState<AccordionEventKey | null>();

  const toggleAccordion = (key: AccordionEventKey) => {
    setActiveKey((prevKey: AccordionEventKey | null) => (prevKey === key ? null : key));
  };

  return (
    <section className="concerns-section">
      <Container>
        <div className="title-area made-title text-center">
          <h2 className="section-title">
            Korisni saveti
          </h2>
          <p>
            Na našem blogu možete pronaći dragocene informacije i savete kako da se nosite sa izazovima roditeljstva u digitalnom dobu.
          </p>
          <div className="border-area">
            <div className="underline-border"></div>
          </div>
        </div>

        <Row className="align-items-center">
          <Col lg={4} className="info-box">
            <div className="accoridion-img">
              <img
                src={studyImage}
                alt="Study Monitoring"
                className="study-image"
              />
            </div>
          </Col>

          {/* Right Columns */}
          <Col lg={8}>
            <Row>
              <Col lg={6}>
                {concernsData.slice(0, 4).map((concern, index) => (
                  <Accordion
                    key={index}
                    className="concern-item"
                    activeKey={activeKey}
                    onSelect={(eventKey) => toggleAccordion(eventKey)}
                  >
                    <Accordion.Item eventKey={index.toString()}>
                      <Accordion.Header>
                        <span className="concern-icon">{concern.icon}</span>{" "}
                        {concern.title}
                      </Accordion.Header>
                      <Accordion.Body>{concern.content}
                        <br/>
                        <br/>
                        <Link to={concern.path}>
                          <Button variant="primary" className="learn-btn">
                            Pročitajte ceo tekst
                          </Button>
                        </Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
              </Col>

              <Col lg={6}>
                {concernsData.slice(4).map((concern, index) => (
                  <Accordion
                    key={index + 4}
                    className="concern-item"
                    activeKey={activeKey}
                    onSelect={toggleAccordion}
                  >
                    <Accordion.Item eventKey={(index + 4).toString()}>
                      <Accordion.Header>
                        <span className="concern-icon">{concern.icon}</span>{" "}
                        {concern.title}
                      </Accordion.Header>
                      <Accordion.Body>{concern.content}
                        <br/>
                        <br/>
                        <Link to={concern.path}>
                          <Button variant="primary" className="learn-btn">
                            Pročitajte ceo tekst
                          </Button>
                        </Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Concerns;
