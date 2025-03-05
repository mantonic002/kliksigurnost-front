import React from "react";
import { Container, Row, Col, Image, Badge, ListGroup} from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import featuredImage from '../../logo_final2.png';

const RazgovorSaDecom = () => {
  return (
    <section className="blog-section">
    <Container className="mt-5">
      {/* Blog Header */}
      <Row className="justify-content-center">
        <Col lg={8} className="text-center">
          <h1 className="fw-bold">
          Razgovor sa decom o sigurnosti na internetu - ključ za zaštitu na mreži
          </h1>
        </Col>
      </Row>

      {/* Author Section */}
      <Row className="mt-3">
        <Col lg={8} className="d-flex ">
          <FaUserCircle size={50} className="me-2 text-secondary" />
          <div>
            <h6 className="mb-0 fw-bold">John Doe</h6>
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
          <p>
          U današnjem digitalnom svetu, internet je neizbežan deo detinjstva. Deca ga koriste za učenje, igru, komunikaciju i istraživanje sveta. I dok internet pruža brojne prilike, on takođe krije i izazove koji mogu biti preveliki za decu da se sama sa njima suoče. Kao roditelji, važno je da otvoreno razgovarate sa decom o korišćenju interneta, ali i o alatima poput KlikSigurnosti koji mogu dodatno osigurati njihovu bezbednost.
          </p>
          <p>
          Ovo je stvorilo neviđene mogućnosti za decu i mlade da komuniciraju, uče, druže se i igraju, pri čemu su izloženi novim idejama i raznovrsnijim izvorima informacija.          
          </p>
          <br />
          <p>
          Ali, uz ove mogućnosti dolaze i ozbiljni rizici. 
          </p>
          <br />
          <p>
          <b>Sajber maltretiranje</b> i drugi oblici vršnjačkog nasilja mogu uticati na mlade svaki put kada se prijave na društvene mreže ili platforme za razmenu poruka. Više od trećine mladih u 30 zemalja prijavilo je da su bili žrtve sajber maltretiranja, dok je 1 od 5 mladih izostajao iz škole zbog ovoga. 
          </p>
          <p><b>Govor mržnje i nasilni sadržaji</b> su nešto čemu deca i mladi mogu biti izloženi na internetu – uključujući poruke koje podstiču samopovređivanje pa čak i samoubistvo. Mladi korisnici interneta takođe su ranjivi na regrutaciju od strane ekstremističkih i terorističkih grupa.
          </p>
          <p><b>Problem sa pristupom pornografiji</b> među mladima takođe postaje sve ozbiljniji. Prema istraživanjima, prosečna starost u kojoj deca prvi put vide pornografski sadržaj je u opadanju i sada iznosi oko 10 godina. Ovakvi sadržaji mogu negativno uticati na njihov mentalni razvoj, stvarajući iskrivljene predstave o odnosima, seksualnosti i granicama.
          </p>
          <p>Digitalne platforme se koriste i kao kanali za dezinformacije i teorije zavere koje štetno utiču na decu i mlade.
          </p>
          <p><b>Seksualna eksploatacija i zlostavljanja online</b> su ubedljivo najalarmantnije pretnje. Nikada nije bilo lakše da prestupnici kontaktiraju potencijalne žrtve, dele sadržaje i podstiču druge da počine krivična dela. Oko 80% dece u 25 zemalja izjavilo je da se oseća ugroženo od seksualnog zlostavljanja ili eksploatacije na internetu.
          </p>
          <p>Deca mogu biti ugrožena i kada tehnološke kompanije krše njihovu privatnost prikupljanjem podataka za marketing svrhe. Marketing usmeren na decu putem aplikacija – i prekomerno vreme provedeno ispred ekrana koje to često uzrokuje – može narušiti zdrav razvoj deteta.
          </p>
          <br />
          <h3>Šta KlikSigurnost radi da zaštiti decu na internetu?</h3>
          <br />
          <p>KlikSigurnost je posvećen pružanju praktičnih i efikasnih alata za roditelje kako bi deca bila sigurna dok koriste internet. Evo šta naša aplikacija nudi:</p>
            <ListGroup variant="flush">
                <ListGroup.Item>✅ Filtriranje neprimerenog sadržaja: KlikSigurnost automatski blokira sadržaje poput pornografije, nasilja, govora mržnje i sajtova koji promovišu samopovređivanje. </ListGroup.Item>
                <ListGroup.Item>✅ Praćenje aktivnosti: Roditelji mogu pratiti koje sajtove njihova deca posećuju i dobiti detaljne izveštaje kako bi prepoznali potencijalne probleme na vreme.</ListGroup.Item>
                <ListGroup.Item>✅ Prilagođavanje prema starosnoj dobi: Naš alat omogućava podešavanje profila prema uzrastu dece, čime se osigurava adekvatna zaštita i kontrola.</ListGroup.Item>
                <ListGroup.Item>✅ Vremenska ograničenja: Roditelji mogu ograničiti vreme koje deca provode online, što pomaže u održavanju balansa između digitalnih i stvarnih aktivnosti. </ListGroup.Item>
                <ListGroup.Item>✅ Podrška na srpskom jeziku: KlikSigurnost pruža tehničku podršku na srpskom jeziku, čime roditeljima olakšava svaku nedoumicu ili tehnički izazov.</ListGroup.Item>
                <ListGroup.Item>✅ Sigurnost tokom učenja: Alat omogućava roditeljima da deci dozvole pristup samo edukativnim sajtovima tokom časa ili domaćeg zadatka, osiguravajući fokus na važne aktivnosti.</ListGroup.Item>
                <ListGroup.Item>✅ Transparentnost i privatnost: KlikSigurnost ne prikuplja podatke dece za marketinške svrhe, što osigurava potpunu privatnost korisnika.</ListGroup.Item>
            </ListGroup>
            <br />
            <br />
            <h2>KlikSigurnost – alat koji roditelji širom regiona biraju za miran san i sigurnu budućnost svoje dece.</h2>
          {/* Additional content can be added here */}
        </Col>
      </Row>

      {/* Featured Image */}
      <Row className="justify-content-center mt-4">
        <Col lg={10}>
          <Image src={featuredImage} alt="KS" fluid rounded />
        </Col>
      </Row>

   
    </Container>
    </section>
  );
};

export default RazgovorSaDecom;
