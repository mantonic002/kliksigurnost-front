import { Container, Row, Col, Image, Badge, ListGroup } from "react-bootstrap";
import featuredImage from "../../../logo_final2.png"; // Replace with your actual image path
import "../../../styles/components/Blog.css";
import psiholog from "/images/psiholog2.png"

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
        <Col lg={8} className="d-flex ">
        <img
          src={psiholog} // Replace with actual image URL
          alt="psiholog"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "8px",
            border: "1px solid #ccc"
          }}
        />
          <div>
            <h6 className="mb-0 fw-bold">Maja Despotović</h6>
            <p className="text-muted small">MA psiholog</p>
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
          <br/>
            <p><b>Nakon što završite besplatnu registraciju, dobićete pristup detaljnom video vodiču koji vas korak po korak vodi kroz podešavanje KlikSigurnosti. 
              Takođe, u tekstu ispod možete pronaći naše preporuke prilagođene uzrastu vašeg deteta, kako biste osigurali bezbedno i prilagođeno online okruženje.</b></p>
            <br />
            <p>Pravilno podešavanje KlikSigurnost alata prema uzrastu vašeg deteta osigurava da ono ima bezbedno i prilagođeno internet iskustvo. Evo kako korak po korak podesiti filtere i ograničenja u zavisnosti od godina deteta:</p>
            <br/>
            <h2>1. Deca uzrasta do 7 godina (predškolski uzrast)</h2>
            <br/>
            <p>U ovom periodu, dete bi trebalo da ima strogo kontrolisan pristup internetu, isključivo na uređajima pod nadzorom roditelja.</p>
            <ListGroup variant="flush">
              <ListGroup.Item>❌ <b>Blokirati sav sadržaj osim proverenih edukativnih sajtova</b>
              <ul>
                <li>Omogućiti pristup samo specifičnim sajtovima kao što su YouTube Kids, edukativne platforme i interaktivne igre za najmlađe.</li>
                <li>Koristiti opciju „Dozvoljene stranice“ i ručno uneti samo bezbedne sajtove.</li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>✅ <b>Postaviti vremenska ograničenja</b> (30–60 min dnevno, blokada posle 19h)
              <ul>
                <li>Omogućiti korišćenje interneta samo u unapred određenim terminima, npr. 30–60 minuta dnevno.</li>
                <li>Blokirati pristup internetu posle 19h kako bi se izbegao negativan uticaj na san.</li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>❌ <b>Blokirati društvene mreže</b> i aplikacije za interakciju
              <ul>
                <li>Onemogućiti pristup svim društvenim mrežama i aplikacijama koje omogućavaju interakciju sa nepoznatim osobama.</li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>✅ <strong>Pregledati izveštaje i razgovarati o online navikama</strong>
              <ul>
                <li>Redovno pregledati izveštaje o posećenim sajtovima i redovno razgovarati sa detetom o njegovim online aktivnostima.</li>
              </ul>
              </ListGroup.Item>
            </ListGroup>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />

            <br />
            <h2>2. Deca od 8 do 12 godina (osnovnoškolski uzrast)</h2>
            <p>Deca ovog uzrasta postaju radoznalija, pa je potrebno postaviti ravnotežu između sigurnosti i autonomije.</p>
            <ListGroup variant="flush">
              <ListGroup.Item>❌ <b>Blokirati neprikladan sadržaj</b> (pornografija, nasilje, kockanje)
              <ul>
                <li>Omogućiti blokiranje pornografije, nasilja, kockanja i sajtova sa prevarama - KlikSigurnost podrazumevano blokira ovakve sadržaje, nema potrebe za daljim podešavanjima.</li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>⚠️ <b>Društvene mreže – ograničen pristup</b> (maks. 1 sat dnevno)
              <ul>
                <li>
                Ako roditelj smatra da dete može koristiti društvene mreže, omogućiti samo one prilagođene mlađim uzrastima (npr. Messenger Kids).
                </li>
                <li>
                Postaviti vremenska ograničenja za društvene mreže (npr. dozvoliti pristup samo 1 sat dnevno).
                </li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>✅ <b>Postaviti vremenska ograničenja</b> (blokada od 16h-18h i posle 21h)
              <ul>
                <li>Definisati periode bez interneta, npr. blokirati internet tokom domaćeg zadatka (16h–18h) i posle 21h.</li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>✅  <strong>Pregledati izveštaje i razgovarati o online navikama</strong>
              <ul>
                <li>Redovno pregledati izveštaje o posećenim sajtovima tako da budete obavešteni ako dete pokuša da pristupi blokiranim web stranicama.</li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>✅ <b>Dozvoliti pristup proverenim edukativnim platformama</b>
              <ul>
                <li>Omogućiti slobodan pristup sajtovima za učenje i istraživanje (npr. Wikipedia, Khan Academy, Duolingo).</li>
              </ul>
              </ListGroup.Item>
            </ListGroup>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />

            <br />
            <h2>3. Tinejdžeri od 13 do 16 godina</h2>
            <p>Tinejdžeri imaju veću potrebu za autonomijom, ali je i dalje važno postaviti granice i pratiti njihove online aktivnosti.</p>
            <ListGroup variant="flush">
              <ListGroup.Item>❌ <b>Blokirati eksplicitni sadržaj</b> (pornografija, nasilje, kockanje)
              <ul>
                <li>
                Ograničiti pristup pornografskim i nasilnim sajtovima, sajtovima sa kockanjem i ilegalnim aktivnostima - KlikSigurnost podrazumevano blokira ovakve sadržaje, nema potrebe za daljim podešavanjima.
                </li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>⚠️ <b>Ograničiti, ali ne i potpuno zabraniti društvene mreže</b> (maks. 2h dnevno, zabrana posle 22h)
              <ul>
                <li>Omogućiti pristup društvenim mrežama, ali uz vremenska ograničenja (npr. maksimalno 2h dnevno).</li>
                <li>Postaviti zabranu korišćenja društvenih mreža kasno uveče (npr. nakon 22h).</li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>⚠️ <b>Postaviti pravila za korišćenje interneta tokom škole i domaćih zadataka</b> (blokada zabavnih sajtova)
              <ul>
                <li>Blokirati needukativne sajtove tokom školskih sati i u periodu domaćih zadataka.</li>
                <li>Omogućiti pristup obrazovnim platformama i resursima za učenje.</li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>⚠️ <b>Pregledati izveštaje i razgovarati o online navikama</b>
              <ul>
                <li>Redovno pregledati izveštaje o posećenim sajtovima i redovno razgovarati sa detetom o njegovim online aktivnostima.</li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>✅ <b>Podstaći kritičko razmišljanje</b>
              <ul>
                <li>Edukovati dete o dezinformacijama, internet prevarama i digitalnim opasnostima.</li>
              </ul>
              </ListGroup.Item>
            </ListGroup>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />

            <br />
            <h2>4. Odgovorni tinejdžeri</h2>
            <p>Ukoliko smatrate da je vaše dete dovoljno zrelo da samo može odgovorno koristiti internet, a u isto vreme želite da imate uvid u njegove internet aktivnosti, preporučujemo sledeća podešavanja.</p>
            <ListGroup variant="flush">
              <ListGroup.Item>✅ <b>Ukloniti podrazumevane filtere</b> osim za viruse i pretnje
              <ul>
                <li>
                Obrisati podrazumevane filtere (virusi, maliciozni web site-ovi i pretnje se ne mogu obrisati).
                </li>
              </ul>
              </ListGroup.Item>
              <ListGroup.Item>⚠️ <b>Omogućiti roditeljski nadzor</b> sa upozorenjima
              <ul>
                <li>Aktivirati opciju da dobijate obaveštenja kada dete pokuša da pristupi sadržaju koji je: pornografski, nasilan, sajtovima sa kockanjem ili ilegalnim aktivnostima.</li>
              </ul>
              </ListGroup.Item>
            </ListGroup>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />

            <br />
            <h2>Kako da podesite KlikSigurnost u praksi?</h2>
            <ListGroup variant="flush">
              <ListGroup.Item>1️⃣ Prijavite se na KlikSigurnost nalog.</ListGroup.Item>
              <ListGroup.Item>2️⃣ Podesite filtere prema uzrastu deteta.</ListGroup.Item>
              <ListGroup.Item>3️⃣ Aktivirajte nadzor i izveštaje.</ListGroup.Item>
              <ListGroup.Item>4️⃣ Prilagodite postavke po potrebi.</ListGroup.Item>
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
            <p>Pravilno podešen KlikSigurnost pomaže roditeljima da postave zdrave digitalne granice, omogućavajući deci da sigurno istražuju internet bez nepotrebnih rizika. Ako imate bilo kakva pitanja ili Vam je potrebna pomoć pri podešavanju, naš tim za podršku je dostupan putem telefona ili online konsultacija. 😊</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PodesavanjePremaUzrastu;
