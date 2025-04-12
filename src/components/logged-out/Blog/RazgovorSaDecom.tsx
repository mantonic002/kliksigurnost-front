import { Container, Row, Col, Image, Badge } from "react-bootstrap";
import "../../../styles/components/Blog.css";
import psiholog from "/images/psiholog2.png"
import razgovor from "/images/razgovor.jpg"
import safe from "/images/safe.png"

const BizBlog = () => {
  return (
    <section className="blog-section">
      <Container className="mt-5">
        {/* Blog Header */}
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h1 className="fw-bold">Sigurnost dece na internetu</h1>
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
              Roditeljska zaštita
            </Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2 border">
              Saveti za roditelje
            </Badge>
          </Col>
        </Row>

        {/* Article Content */}
        <Row className="justify-content-center mt-4">
          <Col lg={12}>
            <br />
            <p>
            U današnjem digitalnom svetu, internet je neizbežan deo detinjstva. Deca ga koriste za učenje, igru, komunikaciju i istraživanje sveta. I dok internet pruža brojne prilike, on takođe krije i izazove koji mogu biti preveliki za decu da se sama sa njima suoče. Kao roditelji, važno je da otvoreno razgovarate sa decom o korišćenju interneta, ali i o alatima poput KlikSigurnosti koji mogu dodatno osigurati njihovu bezbednost.
            </p>
            <br />
            <h3 className="fw-bold">Početak Razgovora: Kako Pristupiti Temi?</h3>
            <Row className="mt-4">
              <Col lg={12}>
                <Image src={razgovor} alt="Roditelj i dete razgovaraju" fluid rounded />
              </Col>
            </Row>
            <p>
              Razgovor o internetu ne treba da bude predavanje ili kritika. Umesto toga, neka to bude otvoren i dvosmeran dijalog u kojem dete oseća da može slobodno da izrazi svoje misli i osećanja.
            </p>
            <ul>
              <li><strong>Postavite pitanja:</strong> Počnite razgovor tako što ćete pitati dete kako koristi internet:</li>
              <ul>
                <li>„Koje sajtove najčešće posećuješ?“</li>
                <li>„Da li si nekada naišao na nešto što ti nije bilo prijatno?“</li>
                <li>„Šta ti je omiljeno na internetu i zašto?“</li>
              </ul>
              <li><strong>Slušajte bez osuđivanja:</strong> Važno je da dete oseća da je njegovo mišljenje važno. Umesto da odmah reagujete na sve što kaže, prvo slušajte i pitajte dodatna pitanja kako biste razumeli njihov pogled na svet.</li>
            </ul>
            <br />
            <br />
            <h3 className="fw-bold">Uvođenje KlikSigurnosti u Razgovor</h3>
            <br/>
            <p>Jedan od ključnih izazova za roditelje jeste kako predstaviti ideju instalacije alata poput KlikSigurnosti na dečijim uređajima bez izazivanja otpora. Evo nekoliko predloga:</p>
            <ol>
              <li><strong>Prikažite ga kao rešenje, a ne kaznu -</strong> Objasnite detetu da KlikSigurnost nije tu da ograniči njihovu slobodu, već da ih zaštiti.</li>
              <ul>
                <li>„Ovaj alat će nam pomoći da zajedno budemo sigurni da nećeš naići na stvari koje nisu dobre za tebe.“</li>
                <li>„KlikSigurnost će te čuvati od neprijatnih situacija, kao što je slučajni ulazak na loš sajt.“</li>
              </ul>
              <br/>
              <li><strong>Uključite dete u proces instalacije -</strong> Dajte detetu osećaj uključenosti i kontrole. Na primer, možete reći:</li>
              <ul>
                <li>„Hajde zajedno da podesimo šta želiš da koristiš na internetu i šta ne bi trebalo da vidiš.“</li>
              </ul>
              <br/>
              <li><strong>Naglasite koristi za njih -</strong> Deca često bolje reaguju kada razumeju kako alat koristi upravo njima:</li>
              <br/>
              <ul>
                <li>„KlikSigurnost ti pomaže da budeš bezbedan dok istražuješ internet.“</li>
                <li>„Ovo ti omogućava da uživaš u svojim omiljenim igrama i video zapisima bez brige.“</li>
              </ul>
            </ol>

            <br />
            <br />
            <h3 className="fw-bold">Ključne Teme za Razgovor sa Decom</h3>
            <br/>
            <p>Da biste osigurali da dete razume važnost internet bezbednosti, evo konkretnih tema koje možete obraditi:</p>
            <ol>
              <li><strong>Deljenje ličnih informacija - </strong> Objasnite zašto je važno da nikada ne dele svoje ime, adresu, školu ili broj telefona online:</li>
              <ul>
                <li>„Lako je da neko zloupotrebi te informacije. Zato je bolje da ih čuvamo za sebe.“</li>
              </ul>
              <br/>
              <li><strong>Prepoznavanje neprikladnog sadržaja -</strong> Naučite ih da prepoznaju sadržaj koji nije primeren njihovom uzrastu:</li>
              <ul>
                <li>„Ako naiđeš na nešto što ti je čudno ili te uznemirava, odmah mi reci.“</li>
              </ul>
              <br/>
              <li><strong>Opasnost od stranaca -</strong> Deca često ne razumeju da ljudi na internetu nisu uvek oni za koje se predstavljaju:</li>
              <ul>
                <li> „Ako te neko koga ne poznaješ kontaktira, nemoj odgovarati i odmah me obavesti.“</li>
              </ul>
              <br/>
              <li><strong>Zavisnost od interneta -</strong> Razgovarajte o važnosti balansa između vremena provedenog online i aktivnosti van ekrana:</li>
              <ul>
                <li> „Važno je da koristiš internet za zabavu i učenje, ali isto tako treba da se igramo napolju i družimo se.“</li>
              </ul>
              <br/>
              <li><strong>Kako prepoznati prevaru -</strong> Naučite ih kako da uoče lažne linkove, poruke i sumnjive zahteve:</li>
              <ul>
                <li> „Ako ti neko obećava nagrade ili traži tvoje podatke, velika je šansa da pokušavaju da te prevare.“</li>
              </ul>
            </ol>
            <br />
            <br/>
            <h3 className="fw-bold">Praktični saveti za roditelje</h3>
            <p>Razgovor o internetu ne mora biti jednokratan. Ovo su neke prakse koje možete uključiti u svakodnevnu komunikaciju:</p>
            <ul>
                <li><strong>Postavljajte otvorena pitanja:</strong> Redovno pitajte dete šta je novo na internetu i da li su naišla na nešto zanimljivo ili neobično.</li>
                <br/>
                <li><strong>Delite sopstvena iskustva:</strong> Ispričajte im o situacijama u kojima ste i sami naišli na neprikladan sadržaj ili online prevaru.</li>
                <br/>
                <li><strong>Budite uzor:</strong> Pokažite odgovorno ponašanje online kako bi deca mogla da se ugledaju na vas.</li>
            </ul>
            <br/>
            <h3 className="fw-bold">Zaključak: Zajedno do sigurnijeg interneta</h3>
            <p>
              Razgovor o bezbednom korišćenju interneta nije samo praktična stvar – to je prilika da izgradite poverenje i otvoren odnos sa svojim detetom. Sa alatima poput <strong>KlikSigurnosti</strong>, imate dodatnu sigurnost da čak i kada niste tu, vaša deca su zaštićena od potencijalnih opasnosti.
            </p>
            <p>Vaša uloga nije samo da postavite granice, već i da budete vodič u digitalnom svetu koji je za vašu decu i uzbudljiv i nepoznat. Pristupite razgovoru sa razumevanjem i otvorenošću – jer zajedno gradite sigurno digitalno okruženje za celu porodicu.</p>
          </Col>
        </Row>
      </Container>
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Row>
          <Col>
            <Image src={safe} alt="Porodica zajedno uživa na internetu" fluid rounded />
          </Col>
        </Row>
      </Container>

    </section>
  );
};

export default BizBlog;