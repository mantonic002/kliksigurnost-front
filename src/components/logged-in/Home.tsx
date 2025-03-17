import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "../../styles/components/Home.css";
import video from '/video-placeholder.mp4';
import { SidebarData } from './SidebarData';

const Home = () => {
  return (
    <Container fluid className="home-container">
      <Row className="justify-content-center align-items-center">
        <Col md={8} className="text-center">
          <h1 className="home-title">***korisniče***, dobrodošli na KlikSigurnost!</h1>
          <p className="home-subtitle">
            KlikSigurnost je posvećen pružanju praktičnih i efikasnih alata za roditelje kako bi njihova deca bila sigurna dok koriste internet.
          </p>
          <br />
        </Col>
        <Col md={8} className="text-center">
          <div className="bubble-box">
            
            <h2 className="title2">
            Video vodič
            </h2>
            <br />
            <p className="regular-text">
              Ako vam je potrebna pomoć pri podešavanju KlikSigurnosti, ne brinite – tu smo za vas! </p>
              <p className="regular-text">
              U nastavku možete pogledati video vodič koji će vas korak po korak provesti kroz sve postavke i omogućiti da iskoristite sve prednosti naše aplikacije na najbolji način:
            </p>
            <video className="video-content" controls>
            <source src={video} type="video/mp4" />
            Vaš pregledač ne podržava HTML5 video.
          </video>
          <br/>
          <br/>
          <p className="regular-text">
            Ako nakon gledanja videa imate bilo kakva pitanja ili nedoumice, naš tim tehničke podrške je tu da vam pomogne. 
          </p>  
          <p className="regular-text">
            Slobodno zakažite sastanak – rado ćemo vas voditi kroz svaki korak!
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
  <Col md={4} className="text-center">
    <div className="button-container">
      {SidebarData.map((item, index) => (
        <Button
          key={index}
          className={`nav-button ${item.title === "Odjava" ? "logout-btn" : ""}`}
          variant={item.title === "Odjava" ? "danger" : "light"}
          onClick={() => window.location.href = item.link} // Navigacija
        >
          <span className="icon">{item.iconOutline}</span><br/>
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
