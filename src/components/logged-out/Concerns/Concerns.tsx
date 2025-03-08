import React, { useState } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import {
  FaShieldAlt,
  FaChartBar,
  FaClock,
  FaCalendarAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBell,
  FaWifi,
  FaBookOpen,
  FaLock,
} from "react-icons/fa";
import studyImage from "../../../../public/images/happy_family_brush.png"; // Replace with actual image path
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import "../../../styles/components/Concerns.css";

const concernsData = [
  {
    title: "Automatsko filtriranje neprimerenog sadržaja",
    icon: <FaShieldAlt />,
    content:
      "KlikSigurnost automatski blokira sadržaje poput pornografije, sajtova za kockanje, nasilja, govora mržnje i sajtova koji promovišu povređivanje/samopovređivanje.",
  },
  {
    title: "Praćenje lokacije deteta",
    icon: <FaMapMarkerAlt />,
    content:
      "KlikSigurnost omogućava roditeljima da u realnom vremenu prate lokaciju deteta na mapi putem intuitivne aplikacije.",
  },
  {
    title: "Selektivno filtriranje sadržaja i vremenska kontrola",
    icon: <FaShieldAlt />,
    content:
      "KlikSigurnost omogućava roditeljima da precizno definišu koje vrste sadržaja su dostupne u određenim periodima dana. Možete blokirati društvene mreže tokom školskih sati, dozvoliti samo edukativne sajtove tokom učenja ili ograničiti pristup zabavnim aplikacijama pre spavanja.",
  },
  {
    title: "Praćenje aktivnosti",
    icon: <FaChartBar />,
    content:
      "Roditelji mogu pratiti koje sajtove njihova deca posećuju i dobiti detaljne izveštaje kako bi prepoznali potencijalne probleme na vreme.",
  },
  {
    title: "Obezbeđivanje celokupne kućne mreže",
    icon: <FaWifi />,
    content:
      "KlikSigurnost pruža mogućnost zaštite cele kućne mreže, blokirajući neprimerene sadržaje i pretnje za sve uređaje povezane na vaš Wi-Fi, uključujući telefone, tablete, računare i pametne televizore.",
  },
  {
    title: "Vremenska ograničenja",
    icon: <FaClock />,
    content:
      "Roditelji mogu ograničiti vreme koje deca provode online, što pomaže u održavanju balansa između digitalnih i stvarnih aktivnosti.",
  },
  {
    title: "Sigurnost tokom učenja",
    icon: <FaBookOpen />,
    content:
      "Alat omogućava roditeljima da deci dozvole pristup samo edukativnim sajtovima tokom časa ili domaćeg zadatka, osiguravajući fokus na važne aktivnosti.",
  },
  {
    title: "Podrška na srpskom jeziku",
    icon: <FaPhoneAlt />,
    content:
      "KlikSigurnost pruža tehničku podršku na srpskom jeziku putem poziva, online sastanka ili e-maila, čime roditeljima olakšava svaku nedoumicu ili tehnički izazov.",
  },
  {
    title: "Transparentnost i privatnost",
    icon: <FaLock />,
    content:
      "KlikSigurnost ne prikuplja podatke dece za marketinške svrhe, što osigurava potpunu privatnost korisnika.",
  },
];

const Concerns = () => {
  const [activeKey, setActiveKey] = useState<AccordionEventKey | null>();

  const toggleAccordion = (key: AccordionEventKey) => {
    setActiveKey((prevKey) => (prevKey === key ? null : key));
  };

  return (
    <section className="concerns-section">
      <Container>
        <div className="title-area made-title text-center">
          <h2 className="section-title">
            We’re here to help with your concerns
          </h2>
          <p>
            Whatever their age and needs, Qustodio’s parental control tools help
            reduce the risks your kids face online.
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
                {concernsData.slice(0, 5).map((concern, index) => (
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
                      <Accordion.Body>{concern.content}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))}
              </Col>

              <Col lg={6}>
                {concernsData.slice(5).map((concern, index) => (
                  <Accordion
                    key={index + 5}
                    className="concern-item"
                    activeKey={activeKey}
                    onSelect={toggleAccordion}
                  >
                    <Accordion.Item eventKey={(index + 5).toString()}>
                      <Accordion.Header>
                        <span className="concern-icon">{concern.icon}</span>{" "}
                        {concern.title}
                      </Accordion.Header>
                      <Accordion.Body>{concern.content}</Accordion.Body>
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
