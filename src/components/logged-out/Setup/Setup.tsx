import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import { FaUserPlus, FaUsersCog, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../../styles/components/Setup.css";
import "../../../styles/components/MadeEasy.css";
import wheel from "/images/settings_ks.png";

const Setup = () => {
  const steps = [
    {
      icon: <FaUserPlus className="step-icon" />,
      title: "Registracija",
      description: (
        <>
            <p>
                Registrujte se i kreirajte porodični nalog. 
                Celokupan proces traje nekoliko minuta i omogućava vam da upravljate 
                pristupom internetu za celu porodicu iz jednog centralnog mesta.
            </p>
            <p>
                Registraciju možete jednostavno završiti popunjavanjem traženih 
                polja i potvrdom putem linka koji ćete dobiti na vašu e-mail adresu.
            </p>
            <p>
                Ukoliko ste već prijavljeni na svoj Google (Gmail) nalog na ovom uređaju, 
                registraciju možete obaviti automatski – dovoljno je da kliknete 
                na opciju <strong>„Registracija pomoću Google naloga“</strong>.
            </p>
            <span className="spanic"></span>
            <div className="text-center mt-4">
            <Link to="/registracija">
                <Button variant="primary" className="learn-btn">
                    Besplatna Registracija
                </Button>
            </Link>
            <br/>
            <span className="spanic"></span>
            <p><strong>Imate nalog? Prijavite se:</strong></p>
            <Link to="/prijava">
              <Button variant="outline-primary" className="learn-btn">
                Prijavljivanje
              </Button>
            </Link>
          </div>
        </>
        ),
    },
    {
      icon: <FaUsersCog className="step-icon" />,
      title: "Podešavanje profila",
      description: (
        <>
          <p>
            Nakon registracije, možete podesiti internet pravila za svako dete posebno – blokirati
            određene sajtove, postaviti vremenska ograničenja i definisati dnevne rutine.
          </p>
          <p>
            Pogledajte naš video vodič za podešavanje pravila koji će vas voditi korak po korak:
          </p>
        </>
      ),
      video: "/Vodic_1.mkv",
    },
    {
      icon: <FaShieldAlt className="step-icon" />,
      title: "Aktiviranje zaštite",
      description: ( 
        <>
            <p>
                Nakon što završite sa podešavanjem, jednostavno aktivirajte zaštitu na 
                uređajima koje deca koriste. Aplikacija radi u pozadini i automatski 
                primenjuje pravila koje ste postavili. 
            </p>
            <p>
            Pogledajte naš video vodič za podešavanje aplikacije koji će vas 
            voditi korak po korak:
          </p>
        </>
      ),
      video: "/Vodic_2.mp4",
    },
  ];

  return (
    <Container fluid="sm" className="setup-page">
      <Row className="align-items-start sec-content">
      <Col xs={12}>
          <h3 className="section-subtitle text-center mb-4">
            Jednostavno podešavanje u 3 koraka
          </h3>
          <div className="border-area">
            <div className="underline-border"></div>
          </div>
          <br/>
          <p>
            Nakon što završite registraciju i podesite internet pravila i raspored, 
            biće vam potreban dečiji uređaj na koji želite da primenite KlikSigurnost 
            zaštitu. Na tom uređaju ćete preuzeti i povezati aplikaciju koja će ga 
            povezati sa vašim KlikSigurnost nalogom.
          </p>
          <p><strong>
            Sve što je potrebno objasnili smo jasno i detaljno u naredna tri koraka:
          </strong></p>
          <Accordion defaultActiveKey="0">
            {steps.map((step, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  <span className="me-2">{step.icon}</span> {step.title}
                </Accordion.Header>
                <Accordion.Body>
                  {step.description}
                  {step.video && (
                    <video controls className="video-standard mt-3">
                      <source src={step.video} type="video/mp4" />
                      Vaš pregledač ne podržava video tag.
                    </video>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          <br/>
          <p>
            <strong>
                Ispratili ste sve korake, ali i dalje imate poteškoća sa povezivanjem? 
                Bez brige – tu smo da pomognemo. Pošaljite nam poruku i naš tim će Vam 
                pružiti podršku u najkraćem mogućem roku:
            </strong>
          </p>
          <div className="text-center mt-4">
            <Link to="/kontakt">
                    <Button variant="primary" className="learn-btn">
                        Kontaktirajte nas!
                    </Button>
            </Link>
          </div>
            <br/>
            <div className="settings-wheel-container">
              <img
                src={wheel}
                alt="Settings Wheel"
                className="rotating-wheel"
              />
            </div>
            <br/>
            <br/>
            <div>
              <p className="text-center mb-0">
                  <strong><i>
                      KlikSigurnost - Za miran san roditelja i sigurnu budućnost dece.
                  </i></strong>
              </p>
            </div>
            <br/>
            <br/>
        </Col>
      </Row>
    </Container>
  );
};

export default Setup;
