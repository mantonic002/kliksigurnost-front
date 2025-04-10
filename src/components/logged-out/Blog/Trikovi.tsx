import { Container, Row, Col, Image, Badge, Button} from "react-bootstrap";
import featuredImage from "../../../logo_final2.png"; // Replace with your actual image path
import "../../../styles/components/Blog.css";
import { useNavigate } from 'react-router-dom';
import mico from "/images/mico.png"

const Trikovi = () => {

  const navigate = useNavigate();
  return (
    <section className="blog-section">
      <Container className="mt-5">
        {/* Blog Header */}
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h1 className="fw-bold">
                Mudri načini da budete u toku
            </h1>
          </Col>
        </Row>

		{/* Author Section */}
    <Row className="mt-3">
        <Col lg={8} className="d-flex ">
        <img
          src={mico} // Replace with actual image URL
          alt="KlikSigurnost"
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
            <h6 className="mb-0 fw-bold">Mićo Antonić</h6>
            <p className="text-muted small">KlikSigurnost tim</p>
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
            <p>Roditelji često žele da osiguraju da njihova deca koriste internet na bezbedan 
                način i da poštuju dogovorena pravila. Međutim, deca mogu pokušavati da zaobiđu 
                roditeljsku kontrolu, bilo da se radi o gledanju neprimerenog sadržaja, 
                igranju igrica kasno u noć ili skrivanju aktivnosti na mreži. 
                Evo nekoliko trikova kako da otkrijete potencijalne probleme i 
                sprečite neželjene aktivnosti.
            </p>
            <br/>
            <br/>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />
            <br/>
            <h2>1. Praćenje aktivnosti bez ograničenja</h2>
            <br/>
            <p>
                ✅ KlikSigurnost može biti podešen tako da samo evidentira posećene sajtove
                 i aplikacije bez aktivnog filtriranja sadržaja. Ova opcija omogućava roditeljima 
                 da imaju uvid u navike deteta na internetu, bez ograničavanja pristupa.
            </p>
            <br/>
            <h2>2. Diskretno praćenje pokušaja isključivanja aplikacije</h2>
            <br/>
            <p>
                ✅ KlikSigurnost može neprimetno pratiti da li dete pokušava da ugasi 
                ili zaobiđe aplikaciju, bez njegovog znanja. Roditelji dobijaju diskretna 
                obaveštenja o ovakvim pokušajima, što im omogućava da blagovremeno reaguju 
                i razgovaraju sa detetom o važnosti digitalne bezbednosti.
            </p>
            <p>
            🔹 <strong>Rešenje:</strong> Razgovarajte otvoreno sa detetom i postavite 
            pravila o transparentnom korišćenju uređaja.
            </p>
            <br/>
            <h2>3. Noćne aktivnosti – da li dete koristi uređaje dok bi trebalo da spava?</h2>
            <br/>
            <p>
                ✅ Ako ujutru primećujete umorno dete koje deluje neispavano,
                 moguće je da je koristilo telefon ili računar do kasno u noć.  
            </p>
            <p>
                ✅ Proverite internet aktivnost na KlikSigurnost nalogu u kasnim satima.
            </p>
            <p>🔹 <strong>Rešenje:</strong></p>
            <p>✅ Postavite <strong>automatska vremenska ograničenja</strong>
             pomoću KlikSigurnosti – internet može biti dostupan samo u 
             određenim delovima dana.  
             </p>
             <p>
             ✅ Telefoni i tableti mogu ostati van dečije sobe tokom noći kako biste izbegli skriveno korišćenje.
             </p>
            <br/>
            <h2>4. Obratite pažnju na korišćenje VPN-a ili proxy servera</h2>
            <br/>
            <p>
                ✅ Ako dete zna kako da zaobiđe roditeljsku kontrolu, 
                može koristiti VPN ili proxy servere da sakrije svoju aktivnost na internetu. 
            </p>
            <p>
                ✅ Proverite da li su na uređaju instalirane VPN aplikacije koje nisu 
                deo dogovorenih programa. 
            </p>
            <p>
            🔹 <strong>Rešenje:</strong> KlikSigurnost blokira VPN servise i sprečitava 
            dete da koristi aplikacije za zaobilaženje pravila.
            </p>
            <br/>
            <h2>5. Često korišćene aplikacije i prečice na ekranu</h2>
            <br/>
            <p>
                ✅ Pogledajte listu aplikacija na telefonu – 
                ako primetite aplikacije koje ne prepoznajete, istražite čemu služe. 
            </p>
            <p>
                ✅ Na nekim telefonima i računarima možete videti koje 
                aplikacije su najčešće korišćene u podešavanjima baterije. 
            </p>
            <p>🔹 <strong>Rešenje:</strong> Postavite ograničenja za aplikacije kao što su <strong>Google Play Store</strong> ili <strong>Apple App Store </strong>
             kako biste imali uvid u to šta dete instalira.</p>
            <br/>
            <h2>6. Proverite „tajne“ naloge na društvenim mrežama</h2>
            <br/>
            <p>
                ✅ Neka deca imaju dva profila – jedan za roditelje i „tajni“ nalog
                 gde objavljuju sadržaj koji ne žele da Vi vidite. 
            </p>
            <p>
                ✅ Možete pretražiti njihovo ime na društvenim mrežama 
                kako biste videli da li postoji još neki nalog.
            </p>
            <p>🔹 <strong>Rešenje:</strong> Razgovarajte o sigurnosti i posledicama 
            deljenja privatnih informacija na mreži.</p>
            <br/>
            <h2>7. Promena lozinki i nedozvoljen pristup</h2>
            <br/>
            <p>
                ✅ Ako dete naglo promeni lozinku na uređaju ili društvenim mrežama i ne 
                želi da je podeli s vama, to može biti znak da skriva nešto. 
            </p>
            <p>
                ✅ Roditelji bi trebalo da imaju osnovni pristup ili dogovor o pravilima korišćenja.
            </p>
            <p>🔹 <strong>Rešenje:</strong> KlikSigurnost omogućava roditeljima da 
            imaju uvid u podešavanja bez direktnog zadiranja u privatnost deteta.</p>
            <br/>
            <h2>8. Nenormalno visoka potrošnja interneta</h2>
            <br/>
            <p>
                ✅ Ako primetite da se internet troši više nego inače, 
                moguće je da dete koristi streaming servise, igra online igre 
                ili gleda sadržaje koje ne bi trebalo.
            </p>
            <p>
            🔹 <strong>Rešenje:</strong> KlikSigurnost može pratiti internet aktivnost i 
                upozoriti vas na neobičan saobraćaj.
            </p>
            <br/>
            <h2>9. „Dobar“ sakriven sadržaj – kako usmeriti dete na bolje opcije?</h2>
            <br/>
            <p>
                ✅ Umesto da samo blokirate sadržaj, usmerite dete ka bezbednim i edukativnim platformama.  
            </p>
            <p>
            ✅ Napravite listu korisnih sajtova i aplikacija koje su zanimljive i edukativne (npr. SuperŠkola, Duolingo, Zvrk).
            </p>
            <br/>
            <div className="d-flex justify-content-center">
            <Button
            onClick={() => navigate("/saveti/sajtovi")}
            variant="primary"
            className="me-2 px-3"
          >
            Preporučeni edukativni sajtovi za decu
          </Button>
          </div>
          <br/>
            <p>
            🔹 <strong>Rešenje:</strong> KlikSigurnost vam omogućava da deci pružite sigurno i 
            produktivno online okruženje odobravanjem isključivo edukativnog sadržaja.
            </p>
            <br/>
            <h2>Zaključak: Balans između nadzora i poverenja</h2>
            <p>Cilj roditeljskog nadzora nije kažnjavanje, već osiguravanje da dete razvija 
              zdrave digitalne navike. Najvažnije je **otvoren razgovor** i jasno postavljena pravila.
            </p>
            <br/>
            <div>🔹 <strong>KlikSigurnost vam omogućava:</strong></div>
            <br/>
            <ul> 
              <li>✅ Automatsko blokiranje neprikladnog sadržaja  </li>
              <li>✅ Praćenje internet aktivnosti  </li>
              <li>✅ Vremenska ograničenja za korišćenje uređaja</li>  
              <li>✅ Blokiranje VPN-a** i aplikacija za zaobilaženje pravila</li>
            </ul>
            <br/>
            <div className="d-flex justify-content-center">
            <Button
            onClick={() => navigate("/registracija")}
            variant="primary"
            className="me-2 px-3 btn-lg"
          >
            Kliknite i započnite besplatno odmah!
          </Button>
          </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Trikovi;
