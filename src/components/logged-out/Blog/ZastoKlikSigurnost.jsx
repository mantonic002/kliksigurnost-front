import React from "react";
import { Container, Row, Col, Image, Badge, ListGroup} from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import featuredImage from '../../logo_final2.png';

const ZastoKlikSigurnost = () => {
  return (
    <section className="blog-section">
    <Container className="mt-5">
      {/* Blog Header */}
      <Row className="justify-content-center">
        <Col lg={8} className="text-center">
          <h1 className="fw-bold">
            Zašto KlikSigurnost
          </h1>
        </Col>
      </Row>

      {/* Author Section */}
      <Row className="mt-3">
        <Col lg={8} className="d-flex ">
          <FaUserCircle size={50} className="me-2 text-secondary" />
          <div>
            <h6 className="mb-0 fw-bold">Johnn Doe</h6>
            <p className="text-muted small">Diplomirani psiholog</p>
          </div>
        </Col>
      </Row>

      {/* Category Tags */}
      <Row className="mt-3">
        <Col lg={8} className="">
          <Badge bg="light" text="dark" className="me-2 px-3 py-2 border">
            Internet sigurnost
          </Badge>
          <Badge bg="light" text="dark" className="me-2 px-3 py-2 border">
            Roditeljska zaštita
          </Badge>
          <Badge bg="light" text="dark" className="me-2 px-3 py-2 border">
            Saveti za roditelje
          </Badge>
        </Col>
      </Row>

      {/* Article Content */}
      <Row className="justify-content-center mt-4">
        <Col lg={8}>
          <br />
          <h3>Kako KlikSigurnost menja način zaštite dece na internetu:</h3>
          <br />
          <p>
          Zamislite sledeću situaciju: dete od deset godina vredno radi domaći zadatak online, ali iz radoznalosti odlučuje da poseti sajt o kojem su mu prijatelji pričali. Sajt se ispostavlja kao prilično eksplicitan i uznemirujući. U samo nekoliko klikova, dete prelazi iz sigurnog prostora u opasnu zonu interneta. Ovo nije neobična situacija za decu i roditelje danas – internet, dok je bogat resursima za učenje i zabavu, takođe krije rizike koji su lako dostupni.
          </p>
          <p>
          Kako tehnologija postaje sve prisutnija u svakodnevnom životu, roditelji se suočavaju sa izazovima kako da omoguće deci sigurno istraživanje interneta. U savremenom svetu, alat kao što je KlikSigurnost postaje neophodan za roditelje koji žele da pruže svojoj deci slobodu uz istovremenu zaštitu od digitalnih opasnosti.
          </p>
          <p>
          Slicna rešenja za strana trzišta su se vec dokazala delotvornim, gde je testiranjem na određenom uzorku porodica, tokom prvog meseca blokirano 1,2 miliona neprikladnih sajtova i sprečeno 463.000 online sigurnosnih pretnji u domaćinstvima.
          </p>
          {/* Additional content can be added here */}
        </Col>
      </Row>

      {/* MiAn image */}
      <Row className="justify-content-center mt-4">
        <Col lg={10}>
          <Image src={featuredImage} alt="KS" fluid rounded />
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col lg={8}>
          <br />
          <h3>Kako KlikSigurnost rešava problem?</h3>
          <br />
          <p>
          KlikSigurnost je internet aplikacija koja omogućava roditeljima da kontrolišu digitalne aktivnosti svoje dece na jednostavan i prilagođen način. Može se podesiti da blokira neprikladne sajtove, prati aktivnosti i pruža izveštaje o korišćenju interneta. Aplikacija nije samo tehnički alat – ona je oslonac roditeljima koji žele da njihova deca istražuju internet na siguran način.
          </p>
          <p>
          <i>„Internet otvara vrata celom svetu, ali u tom svetu postoje opasnosti koje mogu da naškode deci.“</i> - kažu roditelji koji koriste slična rešenja. KlikSigurnost nije tu da bi roditelji prestali da veruju svojoj deci, već da im pruži mehanizme za pametno praćenje i prevenciju opasnosti.
          </p>

          <br />
          <h3>Šta KlikSigurnost blokira?</h3>
          <br />
          <p>
          Kroz sofisticirane algoritme, KlikSigurnost pomaže u filtriranju najčešćih opasnosti na internetu, uključujući:
          </p>
          <ul>
            <li><b>Pornografiju i nasilne sadržaje</b> - Deca nenamerno mogu pristupiti ovakvim sadržajima kroz pretragu ili reklame. </li>
            {/* MiAn image */}
            <Row className="mt-4">
              <Col lg={5}>
                <Image src={featuredImage} alt="KS" fluid rounded />
              </Col>
            </Row>
            <li><b>Prevarantske i phishing sajtove</b> - Zlonamerni linkovi koji kradu podatke mogu biti posebno opasni za mlađe korisnike</li>
            <Row className="mt-4">
              <Col lg={5}>
                <Image src={featuredImage} alt="KS" fluid rounded />
              </Col>
            </Row>
            <li><b>Sajtove koji promovišu samopovređivanje i druge štetne aktivnosti</b> - KlikSigurnost aktivno blokira ove vrste pretnji</li>
            <Row className="mt-4">
              <Col lg={5}>
                <Image src={featuredImage} alt="KS" fluid rounded />
              </Col>
            </Row>
            <li><b>Viruse i maliciozne web-stranice</b> - KlikSigurnost automatski ne odobrava pristup web sadržaju za koji proceni da može biti štetan. </li>
            <Row className="mt-4">
              <Col lg={5}>
                <Image src={featuredImage} alt="KS" fluid rounded />
              </Col>
            </Row>
            <li><b>Prilagođeno filtriranje</b> - Sadržaj može biti filtriran po satima i danima, tako da tokom nastave ili vremena predviđenog za učenje deca mogu pristupati samo edukativnim sadržajima</li>
            <Row className="mt-4">
              <Col lg={5}>
                <Image src={featuredImage} alt="KS" fluid rounded />
              </Col>
            </Row>
          </ul>
          <br />
          <h3>Zašto je potrebno ovakvo rešenje?</h3>
          <br />
          <p>
          Roditelji često kažu da žele da imaju kontrolu, ali ne žele da budu stalno prisutni kao digitalni „policajci.“ Balansiranje između poverenja i zaštite je izazovno, ali važno. Evo nekoliko situacija u kojima KlikSigurnost može da pruži konkretna rešenja:
          </p>
          <ListGroup variant="flush">
            <ListGroup.Item>✅ Deca samostalno istražuju internet - Kada roditelji nisu kod kuće, aplikacija omogućava automatsko praćenje i zaštitu. </ListGroup.Item>
            <ListGroup.Item>✅ Radoznalost dece - Deca prirodno istražuju, ali mogu naići na sadržaj koji ih uznemirava ili zbunjuje.</ListGroup.Item>
            <ListGroup.Item>✅ Nedovoljno tehničko iskustvo kod roditelja - KlikSigurnost je prilagođena i najneiskusnijim korisnicima, sa jednostavnim interfejsom i vodičima na maternjem jeziku.</ListGroup.Item>
          </ListGroup>
          <br />
          <h3>Zašto Roditelji Obožavaju KlikSigurnost?</h3>
          <br />
          <ul>
          <li><b>Praktičnost -</b> Aplikacija je osmišljena da se lako instalira i konfiguriše prema potrebama porodice. Radi na uređajima koje deca najčešće koriste za učenje i zabavu, poput telefona, tableta i laptopova.</li>
          <li><b>Prilagodljivost -</b> Roditelji mogu odabrati koje kategorije sajtova žele da blokiraju, kao i da postave vremenska ograničenja za korišćenje interneta.</li>
          <li><b>Poverenje -</b> Lokalizovana podrška na maternjem jeziku omogućava roditeljima da brzo reše sve eventualne nedoumice.</li>
          <li><b>Mir -</b> Roditelji kažu da osećaju veću sigurnost kada znaju da njihova deca ne mogu pristupiti opasnim mestima na internetu.</li>
          </ul>
          <br />
          <h3>Da Li KlikSigurnost zamenuje razgovor sa decom?</h3>
          <br />
          <p>
          Važno je napomenuti da nijedan alat ne može u potpunosti zameniti otvorenu i iskrenu komunikaciju sa decom. Roditelji i dalje treba da razgovaraju o tome šta je prikladno i kako prepoznati opasnosti.
          </p>
          <p>
          KlikSigurnost je tu da pruži podršku i olakša taj proces. Ili kako je rekao jedan od naših prvih korisnika: <i>„Ne brinem više o opasnostima, ali i dalje pratim šta moje dete radi online.“</i>  
          </p>
          <br />
          <h3>Sigurna budućnost za vašu porodicu</h3>
          <br />
          <Row className="mt-4">
            <Col lg={8}>
              <Image src={featuredImage} alt="KS" fluid rounded />
            </Col>
          </Row>     
          <p>
          KlikSigurnost nudi rešenje za najveći izazov modernog roditeljstva – kako obezbediti da deca istražuju digitalni svet bezbedno. Ako ste roditelj koji želi više informacija o tome kako možete prilagoditi KlikSigurnost potrebama vaše porodice, posetite našu stranicu i otkrijte više.
          </p>
          <br />
          <br />
          <h2>KlikSigurnost – alat koji roditelji širom regiona biraju za miran san i sigurnu budućnost svoje dece!</h2>
        </Col>
      </Row>
    </Container>
    </section>
  );
};

export default ZastoKlikSigurnost;
