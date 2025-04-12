import { Container, Row, Col, Image, Badge, Button} from "react-bootstrap";
import "../../../styles/components/Blog.css";
import psiholog from "/images/psiholog2.png"
import kids from "/images/children_warm.jpg"

const EdukativniSajtovi = () => {
  return (
    <section className="blog-section">
      <Container className="mt-5">
        {/* Blog Header */}
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h1 className="fw-bold">
            Vodič za roditelje - Preporučeni edukativni sajtovi za decu
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
            <br />
            <p>U današnjem digitalnom dobu, internet može biti dragocen resurs za obrazovanje dece.
                Kako bismo Vam pomogli da odaberete kvalitetne i bezbedne sadržaje na srpskom 
                jeziku, pripremili smo listu preporučenih edukativnih sajtova: 
            </p>
            <br/>
            <h2>Zvrk</h2>
            <br/>
            <p>Informativno-edukativni internet centar za decu koji nudi raznovrsne sadržaje 
                prilagođene različitim uzrastima. Deca mogu istraživati zanimljive teme kroz 
                interaktivne igre, priče i edukativne materijale.</p>
            <div className="d-flex justify-content-center align-items-center">
                <Button
                    onClick={() => window.open("https://zvrk.rs", "_blank")}
                    variant="primary"
                    className="me-2 px-3"
                >
                    zvrk.rs
                </Button>
            </div>
            <br/>
            <h2>Super škola</h2>
            <br/>
            <p>Namenjena učenicima od 5. do 8. razreda osnovne škole, 
                SuperŠkola pruža oko 700 video lekcija iz četiri predmeta, 
                1.500 postupno rešenih zadataka i 1.300 pitanja u testovima znanja, 
                olakšavajući učenje od kuće.
            </p>
            <div className="d-flex justify-content-center align-items-center">
                <Button
                    onClick={() => window.open("https://www.superskola.rs/", "_blank")}
                    variant="primary"
                    className="me-2 px-3"
                >
                    superskola.rs
                </Button>
            </div>
            <br/>
            <h2>Mala biblioteka</h2>
            <br/>
            <p>Pametno mesto za decu i omladinu koje nudi igre, pesme i knjige na srpskom jeziku. 
                Sadržaji su prilagođeni deci svih uzrasta i pružaju zabavan način za učenje i 
                razvoj jezičkih veština.</p>
            <div className="d-flex justify-content-center align-items-center">
                <Button
                    onClick={() => window.open("https://www.malabiblioteka.net/", "_blank")}
                    variant="primary"
                    className="me-2 px-3"
                >
                    malabiblioteka.net
                </Button>
            </div>
            <br/>
            <h2>Srpski na klik</h2>
            <br/>
            <p>Online škola srpskog jezika namenjena deci u dijaspori. 
                Kroz interaktivne časove, deca mogu unaprediti svoje znanje srpskog jezika, 
                bogatiti rečnik i vežbati pravilan izgovor.</p>
            <div className="d-flex justify-content-center align-items-center">
                <Button
                    onClick={() => window.open("https://srpskinaklik.com/", "_blank")}
                    variant="primary"
                    className="me-2 px-3"
                >
                    srpskinaklik.com
                </Button>
            </div>
            <br/>
            <h2>Edukacija.rs</h2>
            <br/>
            <p>Portal koji pruža raznovrsne obrazovne sadržaje, vesti i informacije o 
                obrazovanju u Srbiji. Proglašen je za najbolji obrazovni sajt u Srbiji od 
                strane časopisa PC Press.</p>
            <div className="d-flex justify-content-center align-items-center">
                <Button
                    onClick={() => window.open("https://edukacija.rs/", "_blank")}
                    variant="primary"
                    className="me-2 px-3"
                >
                    edukacija.rs
                </Button>
            </div>
            <br/>
            <h2>Fondacija Novak Đoković</h2>
            <br/>
            <p>Pored ovih sajtova, postoje i edukativne aplikacije koje mogu biti korisne za decu. 
                Na primer, Fondacija Novak Đoković preporučuje deset edukativnih aplikacija 
                koje su zabavne i prilagođene deci od najranijeg do predškolskog uzrasta:
            </p>
            <div className="d-flex justify-content-center align-items-center">
                <Button
                    onClick={() => window.open("https://novakdjokovicfoundation.org/sr/10-najboljih-edukativnih-aplikacija-za-decu/", "_blank")}
                    variant="primary"
                    className="me-2 px-3"
                >
                    novakdjokovicfoundation.org - 10-najboljih-edukativnih-aplikacija-za-decu
                </Button>
            </div>
            <br/>
            <div className="d-flex justify-content-center mt-4">
              <Image src={kids} alt="KlikSigurnost" fluid rounded className="mt-4" />
            </div>
            <br/>
            <br/>
            <p><i>Korištenjem ovih resursa, možete obezbediti da vaše dete provodi kvalitetno 
                vreme na internetu, učeći i zabavljajući se na bezbedan način.</i></p>
            <br/>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EdukativniSajtovi;
