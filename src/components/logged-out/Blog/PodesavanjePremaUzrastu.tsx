import { Container, Row, Col, Image, Badge, ListGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import featuredImage from "../../../logo_final2.png"; // Replace with your actual image path
import "../../../styles/components/Blog.css";

const PodesavanjePremaUzrastu = () => {
  return (
    <section className="blog-section">
      <Container className="mt-5">
        {/* Blog Header */}
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h1 className="fw-bold">
              Kako podesiti KlikSigurnost prema uzrastu deteta
            </h1>
          </Col>
        </Row>

        {/* Author Section */}
        <Row className="mt-3">
          <Col lg={8} className="d-flex">
            <FaUserCircle size={50} className="me-2 text-secondary" />
            <div>
              <h6 className="mb-0 fw-bold">KlikSigurnost Tim</h6>
              <p className="text-muted small">Internet Sigurnost za Decu</p>
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
              Roditeljska kontrola
            </Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2 border">
              Edukacija
            </Badge>
          </Col>
        </Row>

        {/* Article Content */}
        <Row className="justify-content-center mt-4">
          <Col lg={12}>
            <br />
            <p>Pravilno podešavanje KlikSigurnost alata prema uzrastu vašeg deteta osigurava da ono ima bezbedno i prilagođeno internet iskustvo. Evo kako korak po korak podesiti filtere i ograničenja u zavisnosti od godina deteta:</p>
            <br/>
            <h2>1. Deca uzrasta do 7 godina (predškolski uzrast)</h2>
            <p>U ovom periodu, dete bi trebalo da ima strogo kontrolisan pristup internetu, isključivo na uređajima pod nadzorom roditelja.</p>
            <ListGroup variant="flush">
              <ListGroup.Item>❌ <b>Blokirati sav sadržaj osim proverenih edukativnih sajtova</b></ListGroup.Item>
              <ul>
                <li>Omogućiti pristup samo specifičnim sajtovima kao što su YouTube Kids, edukativne platforme i interaktivne igre za najmlađe.</li>
                <li>Koristiti opciju „Dozvoljene stranice“ i ručno uneti samo bezbedne sajtove.</li>
              </ul>
              <br/>
              <ListGroup.Item>✅ <b>Postaviti vremenska ograničenja</b> (30–60 min dnevno, blokada posle 19h)</ListGroup.Item>
              <ul>
                <li>Omogućiti korišćenje interneta samo u unapred određenim terminima, npr. 30–60 minuta dnevno.</li>
                <li>Blokirati pristup internetu posle 19h kako bi se izbegao negativan uticaj na san.</li>
              </ul>
              <br/>
              <ListGroup.Item>❌ <b>Blokirati društvene mreže</b> i aplikacije za interakciju</ListGroup.Item>
              <ul>
                <li>Onemogućiti pristup svim društvenim mrežama i aplikacijama koje omogućavaju interakciju sa nepoznatim osobama.</li>
              </ul>
              <br/>
              <ListGroup.Item>✅ <b>Omogućiti roditeljski nadzor</b> i izveštaje o aktivnostima</ListGroup.Item>
              <ul>
                <li>Aktivirati detaljne izveštaje o aktivnostima kako biste mogli da vidite koje sajtove dete pokušava da poseti.</li>
              </ul>
              <br/>
            </ListGroup>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />

            <br />
            <h2>2. Deca od 8 do 12 godina (osnovnoškolski uzrast)</h2>
            <p>Deca ovog uzrasta postaju radoznalija, pa je potrebno postaviti ravnotežu između sigurnosti i autonomije.</p>
            <ListGroup variant="flush">
              <ListGroup.Item>❌ <b>Blokirati neprikladan sadržaj</b> (pornografija, nasilje, kockanje)</ListGroup.Item>
              <ListGroup.Item>⚠️ <b>Društvene mreže – ograničen pristup</b> (maks. 1 sat dnevno)</ListGroup.Item>
              <ListGroup.Item>✅ <b>Postaviti vremenska ograničenja</b> (blokada od 16h-18h i posle 21h)</ListGroup.Item>
              <ListGroup.Item>✅ <b>Omogućiti roditeljski nadzor</b> i upozorenja</ListGroup.Item>
            </ListGroup>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />

            <br />
            <h2>3. Tinejdžeri od 13 do 16 godina</h2>
            <p>Veća autonomija, ali i dalje važno postaviti granice.</p>
            <ListGroup variant="flush">
              <ListGroup.Item>❌ <b>Blokirati eksplicitni sadržaj</b> (pornografija, nasilje, kockanje)</ListGroup.Item>
              <ListGroup.Item>⚠️ <b>Ograničiti društvene mreže</b> (maks. 2h dnevno, zabrana posle 22h)</ListGroup.Item>
              <ListGroup.Item>⚠️ <b>Pravila za korišćenje interneta tokom škole</b> (blokada zabavnih sajtova)</ListGroup.Item>
              <ListGroup.Item>⚠️ <b>Redovni izveštaji i razgovor o online aktivnostima</b></ListGroup.Item>
            </ListGroup>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />

            <br />
            <h2>4. Odgovorni tinejdžeri</h2>
            <p>Ako dete pokazuje odgovornost, možete im dati više slobode uz nadzor.</p>
            <ListGroup variant="flush">
              <ListGroup.Item>✅ <b>Ukloniti podrazumevane filtere</b> osim za viruse i pretnje</ListGroup.Item>
              <ListGroup.Item>⚠️ <b>Omogućiti roditeljski nadzor</b> sa upozorenjima</ListGroup.Item>
            </ListGroup>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />

            <br />
            <h2>Kako da podesite KlikSigurnost u praksi?</h2>
            <ListGroup variant="flush">
              <ListGroup.Item>1️⃣ Prijavite se na KlikSigurnost nalog.</ListGroup.Item>
              <ListGroup.Item>2️⃣ Kreirajte profil za svako dete i označite uzrast.</ListGroup.Item>
              <ListGroup.Item>3️⃣ Podesite filtere prema uzrastu deteta.</ListGroup.Item>
              <ListGroup.Item>4️⃣ Aktivirajte nadzor i izveštaje.</ListGroup.Item>
              <ListGroup.Item>5️⃣ Prilagodite postavke po potrebi.</ListGroup.Item>
            </ListGroup>

            <br />
            <h2>Zašto koristiti KlikSigurnost?</h2>
            <p>Pomoću KlikSigurnost-a roditelji mogu:</p>
            <ListGroup variant="flush">
              <ListGroup.Item>❌ Blokirati neprikladan sadržaj</ListGroup.Item>
              <ListGroup.Item>✅ Pratiti online aktivnosti</ListGroup.Item>
              <ListGroup.Item>⚠️ Postaviti vremenska ograničenja</ListGroup.Item>
              <ListGroup.Item>✅ Dobijati izveštaje i obaveštenja</ListGroup.Item>
              <ListGroup.Item>✅ Osigurati sigurno digitalno iskustvo za decu</ListGroup.Item>
            </ListGroup>

            <br />
            <p>Ako imate bilo kakva pitanja ili trebate pomoć, naš tim za podršku vam je na raspolaganju! 😊</p>

          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PodesavanjePremaUzrastu;
