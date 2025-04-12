import { useState, useEffect, useRef } from "react";
import { Nav, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/components/ProjectsTabs.css";
import {
  FaShieldAlt,
  FaChartBar,
  FaClock,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWifi,
  FaBookOpen,
  FaLock,
} from "react-icons/fa";

const tabData = [
  {
    title: "Automatsko filtriranje neprimerenog sadržaja",
    content:
      "KlikSigurnost automatski blokira sadržaje poput pornografije, sajtova za kockanje, nasilja, govora mržnje i sajtova koji promovišu povređivanje/samopovređivanje.",
    icon: <FaShieldAlt />,
    image: "/images/feature_automatsko.png",
  },
  {
    title: "Praćenje lokacije deteta - u pripremi",
    content:
      "KlikSigurnost omogućava roditeljima da u realnom vremenu prate lokaciju deteta na mapi putem intuitivne aplikacije.",
    icon: <FaMapMarkerAlt />,
    image: "/images/feature_location.png",
  },
  {
    title: "Selektivno filtriranje sadržaja i vremenska kontrola",
    content:
      "KlikSigurnost omogućava roditeljima da precizno definišu koje vrste sadržaja su dostupne u određenim periodima dana. Možete blokirati društvene mreže tokom školskih sati, dozvoliti samo edukativne sajtove tokom učenja ili ograničiti pristup zabavnim aplikacijama pre spavanja.",
    icon: <FaShieldAlt />,
    image: "/images/feature_selektivno.png",
  },
  {
    title: "Praćenje aktivnosti",
    content:
      "Roditelji mogu pratiti koje sajtove njihova deca posećuju i dobiti detaljne izveštaje kako bi prepoznali potencijalne probleme na vreme.",
    icon: <FaChartBar />,
    image: "/images/feature_pracenje.png",
  },
  {
    title: "Obezbeđivanje celokupne kućne mreže - u pripremi",
    content:
      "KlikSigurnost pruža mogućnost zaštite cele kućne mreže, blokirajući neprimerene sadržaje i pretnje za sve uređaje povezane na vaš Wi-Fi, uključujući telefone, tablete, računare i pametne televizore.",
    icon: <FaWifi />,
    image: "/images/feature_wifi.png",
  },
  {
    title: "Vremenska ograničenja",
    content:
      "Roditelji mogu ograničiti vreme koje deca provode online, što pomaže u održavanju balansa između digitalnih i stvarnih aktivnosti.",
    icon: <FaClock />,
    image: "/images/feature_kalendar.png",
  },
  {
    title: "Sigurnost tokom učenja",
    content:
      "Alat omogućava roditeljima da deci dozvole pristup samo edukativnim sajtovima tokom časa ili domaćeg zadatka, osiguravajući fokus na važne aktivnosti.",
    icon: <FaBookOpen />,
    image: "/images/feature_edukacija.png",
  },
  {
    title: "Podrška na srpskom jeziku",
    content:
      "KlikSigurnost pruža tehničku podršku na srpskom jeziku putem poziva, online sastanka ili e-maila, čime roditeljima olakšava svaku nedoumicu ili tehnički izazov.",
    icon: <FaPhoneAlt />,
    image: "/images/call.png",
  },
  {
    title: "Transparentnost i privatnost",
    content:
      "KlikSigurnost ne prikuplja podatke dece za marketinške svrhe, što osigurava potpunu privatnost korisnika.",
    icon: <FaLock />,
    image: "/images/feature_privacy.png",
  },
];

const ProjectTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setActiveTab(tabData[0].title);
    }
  }, []);

  const handleTabClick = (title: string) => {
    if (window.innerWidth < 768) {
      // On small screens, toggle the active tab
      setActiveTab((prevTab) => (prevTab === title ? "" : title));
    } else {
      // On large screens, keep the behavior as it is
      setActiveTab(title);
    }
  
    // Scroll adjustment for small screens
    setTimeout(() => {
      const element = tabRefs.current[title];
      if (element && window.innerWidth < 768) {
        const yOffset = -90; // Adjust for fixed navbar
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section className="tabs-section">
      <Container className="tabs-container">
        <div className="title-area made-title text-center">
          <h2 className="section-title">
            KlikSigurnost je posvećen pružanju praktičnih i efikasnih alata za
            roditelje kako bi deca bila sigurna dok koriste internet.
          </h2>
          <p>Kliknite na alat da otkrijete šta nudi</p>
          <div className="border-area">
            <div className="underline-border"></div>
          </div>
        </div>
        <Row>
          {/* Sidebar navigation for larger screens */}
          <Col md={4} className="tabs-list d-none d-md-block">
            <Nav variant="pills" className="flex-column">
              {tabData.map((tab) => (
                <Nav.Item key={tab.title}>
                  <Nav.Link
                    eventKey={tab.title}
                    active={activeTab === tab.title}
                    onClick={() => handleTabClick(tab.title)}
                  >
                    <span className="tab-icon">{tab.icon}</span> {tab.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>

          {/* Content display for large screens */}
          <Col md={8} className="tab-content d-none d-md-block">
            {tabData.map(
              (tab) =>
                tab.title === activeTab && (
                  <div key={tab.title} className="tab-details">
                    <Row className="align-items-center h-100">
                      <Col lg={6}>
                        <div className="tab-img-area">
                          <img
                            src={tab.image}
                            alt={tab.title}
                            className="tab-image"
                          />
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

          {/* Content display for small screens */}
          <Col xs={12} className="d-md-none">
            <Nav variant="pills" className="flex-column">
              {tabData.map((tab) => (
                <Nav.Item
                key={tab.title}
                ref={(el: HTMLDivElement | null) => (tabRefs.current[tab.title] = el)}
              >
                  <Nav.Link
                    eventKey={tab.title}
                    active={activeTab === tab.title}
                    onClick={() => handleTabClick(tab.title)}
                    className="w-100 text-start py-3 px-4 border rounded shadow-sm bg-white text-dark" // Restores button styling
                  >
                    <span className="tab-icon me-2">{tab.icon}</span> {tab.title}
                  </Nav.Link>
                  {/* Show content below clicked button */}
                  {tab.title === activeTab && (
                    <div className="tab-details mt-3 px-3">
                      <Row>
                        <Col xs={12} className="text-center">
                          <div className="tab-img-area">
                            <img
                              src={tab.image}
                              alt={tab.title}
                              className="tab-image"
                            />
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="tab-info mt-2 text-center">
                            <h3>{tab.title}</h3>
                            <p>{tab.content}</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectTabs;
