import { Container, Row, Col, Image, Badge} from "react-bootstrap";
import featuredImage from "../../../logo_final2.png"; // Replace with your actual image path
import "../../../styles/components/Blog.css";
import psiholog from "/images/psiholog2.png"

const Pravila = () => {
  return (
    <section className="blog-section">
      <Container className="mt-5">
        {/* Blog Header */}
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <h1 className="fw-bold">
              10 osnovnih pravila u Vašem domu
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
            <p>Razgovor sa decom je prva, osnovna i nezaobilazna stavka kada pričamo o internet bezbednosti. 
                Pre nego što krenete u primenu alata ili pravila, važno je razgovarati sa decom o potencijalnim 
                opasnostima i sigurnim navikama na internetu. Ako to već niste uradili, 
                predlažemo da prvo pročitate naš vodič o tome kako otvoreno razgovarati sa decom o digitalnoj 
                sigurnosti. 
            </p>
            <p>
            Nakon obavljenog razgovora, naš predlog je da u svakodnevni (online) život postepeno 
            počnete uvoditi 10 osnovnih pravila koja će Vam pomoći da osigurate digitalnu bezbednost 
            u svom domu. Svako pravilo je praktično, jednostavno za primenu i fokusirano na rešavanje 
            problema sa kojima se roditelji i deca danas suočavaju.
            </p>
            <br/>
            <h2>1. Postavite pravila korištenja interneta</h2>
            <br/>
            <p>Jedan od prvih koraka ka sigurnijem internetu jeste definisanje jasnih pravila za korištenje. To jest:</p>
            <ul>
                <li>📅 <b>Kada? </b>Odredite vreme kada deca mogu koristiti internet (npr. posle domaćeg zadatka).</li>
                <li>📍 <b>Gde? </b>Insistirajte na korištenju interneta u zajedničkim prostorijama, gde možete pratiti šta rade.</li>
                <li>🎯 <b>Za šta? </b>Navedite koje aktivnosti su dozvoljene (npr. učenje, edukativne igrice) i koje nisu (npr. neprimerene igrice ili chat sobe).</li>
            </ul>
            <p>KlikSigurnost može Vam pomoći da automatizujete ova pravila. Sa opcijom prilagođenog 
                filtriranja, možete odrediti koje vrste sadržaja su dostupne u određeno doba dana.
            </p>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />
            <br/>
            <h2>2. Podesite KlikSigurnost za maksimalnu zaštitu</h2>
            <br/>
            <p>KlikSigurnost je vaš pouzdani saveznik u zaštiti dece. Kada ga pažljivo podesite, možete maksimalno iskoristiti sve njegove mogućnosti:</p>
            <ul>
                <li>🚫 <b>Filtriranje sadržaja: </b>Blokirajte neprikladne sajtove kao što su oni sa nasilnim, pornografskim ili prevarantskim sadržajem.</li>
                <li>⚙️ <b>Prilagođeno filtriranje: </b>Obezbedite da za vreme časa ili učenja deca mogu pristupiti samo edukativnom sadržaju.</li>
                <li>📊 <b>Praćenje aktivnosti: </b>Pratite koje sajtove dete posećuje i dobijajte redovne izveštaje.</li>
            </ul>
            <p>Uz KlikSigurnost, roditelji mogu biti sigurni da su njihova deca zaštićena od 
                najčešćih opasnosti na internetu. Ako Vam ikada zatreba pomoć ili imate bilo kakva 
                pitanja, naša tehnička podrška vam je uvek na raspolaganju – tu smo da vam pružimo sigurnost i mir.
            </p>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />
            <br/>
            <h2>3. Naučite decu osnovama digitalne pismenosti</h2>
            <br/>
            <p>Edukacija je ključna. Uverite se da vaša deca znaju sledeće:</p>
            <ul>
                <li>🔒 <b>Nikada ne dele lične informacije </b> (ime, adresu, školu, broj telefona) sa nepoznatim osobama.</li>
                <li>📂 <b>Ne preuzimaju datoteke sa nepoznatih sajtova. </b></li>
                <li>🚨 <b>Uvek vas obaveste ako dobiju poruku ili zahtev koji im izgleda čudno. </b></li>
            </ul>
            <p>
                KlikSigurnost takođe pruža resurse i savete roditeljima kako da ovu edukaciju 
                učine jednostavnom i prilagođenom uzrastu deteta. 
            </p>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />
            <br/>
            <h2>4. Aktivno učestvujte u digitalnom životu deteta</h2>
            <br/>
            <p>Nemojte biti samo posmatrač – uključite se. 
                Pokažite interesovanje za igre, sajtove i aplikacije koje deca koriste. 
                Ovo će vam pomoći da:
            </p>
            <ul>
                <li>🖥️ Razumete njihove online aktivnosti.</li>
                <li>🤝 Izgradite poverenje.</li>
                <li>⚠️ Brže primetite potencijalne probleme.</li>
            </ul>
            <p>
                KlikSigurnost vam olakšava praćenje bez potrebe da stalno posmatrate svaki korak deteta.
            </p>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />
            <br/>
            <h2>5. Podesite filtere prema starosnoj dobi</h2>
            <br/>
            <p>Deca različitog uzrasta imaju različite potrebe i nivo razumevanja kada je reč o internetu. 
                Prilagođavanje sadržaja prema starosnoj dobi ključno je za njihovu sigurnost i razvoj. 
                Evo kako možete to postići:
            </p>
            <ul>
                <li><b>Mlađa deca (do 10 godina): </b>Postavite stroge filtere koji blokiraju sav neprikladan sadržaj, uključujući društvene mreže i video platforme osim edukativnih.</li>
                <li><b>Starija deca (11–16 godina): </b>Omogućite pristup širim resursima, ali zadržite kontrolu nad određenim vrstama sadržaja, poput sajtova sa nasiljem ili prevarama.</li>
                <li><b>KlikSigurnost prilagodljivi filteri: </b>Alat vam omogućava da lako kreirate profile za decu različitog uzrasta i da svakom detetu obezbedite okruženje koje je prilagođeno njihovim potrebama.</li>
            </ul>
            <p>
                Ovakav pristup ne samo da osigurava sigurnost, već i pomaže deci da koriste internet na način koji je koristan i edukativan.
            </p>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />
            <br/>
            <h2>6. Postavite ograničenja za vreme provedeno online</h2>
            <br/>
            <p>Prekomerno vreme na internetu može negativno uticati na zdravlje i učenje deteta. 
                KlikSigurnost vam omogućava da postavite vremenska ograničenja za svakodnevno 
                korišćenje interneta, pomažući deci da održe balans između digitalnog i stvarnog sveta.
            </p>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />
            <br/>
            <h2>7. Koristite snažne lozinke i učite decu sigurnosti naloga</h2>
            <br/>
            <p>Sigurnost počinje sa jakim lozinkama. Naučite decu kako da kreiraju i čuvaju lozinke:</p>
            <ul>
                <li>🔑 Koristite kombinaciju velikih i malih slova, brojeva i simbola.</li>
                <li>🔄 Nikada ne koriste istu lozinku za više naloga.</li>
                <li>🤫 Ne dele lozinke sa drugima.</li>
            </ul>
            <br/>
            <h2>8. Podstaknite upotrebu edukativnih resursa</h2>
            <br/>
            <p>Jedan od najboljih načina da deca sigurno koriste internet jeste da im ponudite 
                kvalitetne edukativne resurse. Umesto nasumičnog surfovanja, na našem sajtu možete 
                pronaći detaljan tekst sa preporukama edukativnih programa koji će vaša deca obožavati, 
                a koji su istovremeno sigurni i korisni.
            </p>
            <br/>
            <h2>9. Redovno pregledajte izveštaje o aktivnostima</h2>
            <br/>
            <p>Praćenje aktivnosti vašeg deteta na internetu ključno je za identifikaciju potencijalnih 
                problema na vreme. KlikSigurnost omogućava vam da dobijate detaljne izveštaje o posećenim 
                sajtovima, vremenu provedenom online i pokušajima pristupa neprikladnim sadržajima. 
                Redovno pregledanje ovih izveštaja pomaže vam da prilagodite pravila i povećate sigurnost.
            </p>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />
            <br/>
            <h2>10. Budite dosledni</h2>
            <br/>
            <p>Najvažnije pravilo je doslednost. Pravila i ograničenja gube na snazi ako se ne sprovode 
                redovno. Uz KlikSigurnost, možete automatizovati mnoge procese, što vam olakšava praćenje 
                i primenu pravila.
            </p>
            <br/>
            <h2>Zaključak: siguran internet počinje kod kuće</h2>
            <br/>
            <p>Zaštita dece na internetu nije zadatak koji se rešava preko noći, ali uz prave alate i 
                pristup, roditelji mogu stvoriti sigurno digitalno okruženje za svoju porodicu. 
                KlikSigurnost je dizajniran da omogući upravo to, kombinujći praktične funkcionalnosti 
                sa lakoćom korištenja.
            </p>
            <Image src={featuredImage} alt="KlikSigurnost" fluid rounded className="mt-4" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Pravila;
