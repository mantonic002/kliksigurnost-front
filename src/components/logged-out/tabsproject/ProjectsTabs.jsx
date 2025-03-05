import React, { useState } from "react";
import { Tab, Nav, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShieldAlt, FaChartBar, FaClock, FaCalendarAlt, FaPhoneAlt, FaMapMarkerAlt, FaBell, FaWifi, FaBookOpen, FaLock } from "react-icons/fa";


const tabData = [
  {
    title: "Automatsko filtriranje neprimerenog sadržaja",
    content: "KlikSigurnost automatski blokira sadržaje poput pornografije, sajtova za kockanje, nasilja, govora mržnje i sajtova koji promovišu povređivanje/samopovređivanje.",
    icon: <FaShieldAlt />,
    image: "../../../public/images/phone1.png"
  },
  {
    title: "Praćenje lokacije deteta",
    content: "KlikSigurnost omogućava roditeljima da u realnom vremenu prate lokaciju deteta na mapi putem intuitivne aplikacije.",
    icon: <FaMapMarkerAlt />,
    image: "../../../public/images/phone1.png"
  },
  {
    title: "Selektivno filtriranje sadržaja i vremenska kontrola",
    content: "KlikSigurnost omogućava roditeljima da precizno definišu koje vrste sadržaja su dostupne u određenim periodima dana. Možete blokirati društvene mreže tokom školskih sati, dozvoliti samo edukativne sajtove tokom učenja ili ograničiti pristup zabavnim aplikacijama pre spavanja.",
    icon: <FaShieldAlt />,
    image: "../../../public/images/phone1.png"
  },
  {
    title: "Praćenje aktivnosti",
    content: "Roditelji mogu pratiti koje sajtove njihova deca posećuju i dobiti detaljne izveštaje kako bi prepoznali potencijalne probleme na vreme.",
    icon: <FaChartBar />,
    image: "../../../public/images/phone1.png"
  },
  {
    title: "Obezbeđivanje celokupne kućne mreže",
    content: "KlikSigurnost pruža mogućnost zaštite cele kućne mreže, blokirajući neprimerene sadržaje i pretnje za sve uređaje povezane na vaš Wi-Fi, uključujući telefone, tablete, računare i pametne televizore.",
    icon: <FaWifi />,
    image: "../../../public/images/phone1.png"
  },
  {
    title: "Vremenska ograničenja",
    content: "Roditelji mogu ograničiti vreme koje deca provode online, što pomaže u održavanju balansa između digitalnih i stvarnih aktivnosti.",
    icon: <FaClock />,
    image: "../../../public/images/phone1.png"
  },
  {
    title: "Sigurnost tokom učenja",
    content: "Alat omogućava roditeljima da deci dozvole pristup samo edukativnim sajtovima tokom časa ili domaćeg zadatka, osiguravajući fokus na važne aktivnosti.",
    icon: <FaBookOpen />,
    image: "../../../public/images/phone1.png"
  },
  {
    title: "Podrška na srpskom jeziku",
    content: "KlikSigurnost pruža tehničku podršku na srpskom jeziku putem poziva, online sastanka ili e-maila, čime roditeljima olakšava svaku nedoumicu ili tehnički izazov.",
    icon: <FaPhoneAlt />,
    image: "../../../public/images/phone1.png"
  },
  {
    title: "Transparentnost i privatnost",
    content: "KlikSigurnost ne prikuplja podatke dece za marketinške svrhe, što osigurava potpunu privatnost korisnika.",
    icon: <FaLock />,
    image: "../../../public/images/phone1.png"
  }
];

const ProjectTabs = () => {
    const [activeTab, setActiveTab] = useState(tabData[0].title);
  
    return (
      <section className="tabs-section">
        <Container className="tabs-container">
        <div className="title-area made-title text-center">
            <h2 className="section-title">KlikSigurnost je posvećen pružanju praktičnih i efikasnih alata za roditelje kako bi deca bila sigurna dok koriste internet. Evo šta naša aplikacija nudi:</h2>
            <p>Klik na alat da otkrijete šta nudi</p>
            <div className="border-area">
                <div className="underline-border"></div>
            </div>
        </div>
        <Row>
          <Col md={4} className="tabs-list">
            <Nav variant="pills" className="flex-column">
              {tabData.map((tab) => (
                <Nav.Item key={tab.title}>
                  <Nav.Link
                    eventKey={tab.title}
                    active={activeTab === tab.title}
                    onClick={() => setActiveTab(tab.title)}
                  >
                    <span className="tab-icon">{tab.icon}</span> {tab.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col md={8} className="tab-content">
            {tabData.map(
              (tab) =>
                tab.title === activeTab && (
                  <div key={tab.title} className="tab-details">
                    <Row>
                      <Col lg={6}>
                        <div className="tab-img-area">
                            <img src={tab.image} alt={tab.title} className="tab-image" />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="tab-info">
                            <h3>{tab.title}</h3>
                            <p>{tab.content}</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )
            )}
          </Col>
        </Row>
      </Container>
      </section>
    );
};

export default ProjectTabs;
