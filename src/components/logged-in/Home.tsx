import { Container, Row, Col, Button } from "react-bootstrap";
import "../../styles/components/Home.css";
//import video1 from "/Vodic_1.mkv";
import { SidebarData } from "./SidebarData";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const { profile } = useAuth();
  return (
    <Container fluid className="home-container">
      <Row className="justify-content-center align-items-center">
        <Col md={8} className="text-center">
          <h1 className="home-title">
            <i>{profile?.email.split("@")[0]}</i>, dobrodošli na{" "}
            <span className="klik">Klik</span>
            <span className="sigurnost">Sigurnost</span>
          </h1>

          <p className="home-subtitle">
            KlikSigurnost je posvećen pružanju praktičnih i efikasnih alata za
            roditelje kako bi njihova deca bila sigurna dok koriste internet.
          </p>
          <br />
        </Col>
        <Col md={8} className="text-center">
          <div className="bubble-box">
            <h2 className="title2">Video vodič</h2>
            <br />
            <br />
            <p className="regular-text">
              Ako Vam je potrebna pomoć pri podešavanju KlikSigurnosti, ne
              brinite – tu smo za vas!{" "}
            </p>
            <p className="regular-text">
              U nastavku možete pogledati dva video vodiča koji će vas korak po korak
              provesti kroz sve postavke i omogućiti da iskoristite sve
              prednosti naše aplikacije na najbolji način:
            </p>
            <h3>Video vodič 1 - Podešavanje pravila:</h3>
            <video controls className="video-standard mt-3">
              <source src="/Vodic_1.mkv" type="video/mp4" />
              Vaš pregledač ne podržava video tag.
            </video>
            <br />
            <h3>Video vodič 2 - Podešavanje dečijeg uređaja:</h3>
            <video controls className="video-standard mt-3">
              <source src="/Vodic_2.mp4" type="video/mp4" />
              Vaš pregledač ne podržava video tag.
            </video>
            <br />
            <br />
            <p className="regular-text">
              Ako nakon gledanja videa imate bilo kakva pitanja ili nedoumice,
              naš tim tehničke podrške je tu da Vam pomogne.
            </p>
            <p className="regular-text">
              Slobodno zakažite sastanak – rado ćemo vas voditi kroz svaki
              korak!
            </p>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={8} className="text-center">
          <div className=".bubble-box">
            <h2 className="title2">
              Izaberite opciju da biste počeli sa podešavanjem:
            </h2>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={8} className="text-center">
          <div className="button-container">
            {SidebarData.map((item, index) => (
              <Button
                key={index}
                className={`nav-button ${
                  item.title === "Odjava" ? "logout-btn" : ""
                }`}
                variant={item.title === "Odjava" ? "danger" : "light"}
                onClick={() => (window.location.href = item.link)} // Navigacija
              >
                <span className="icon">{item.iconOutline}</span>
                <br />
                <span>{item.title}</span>
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
