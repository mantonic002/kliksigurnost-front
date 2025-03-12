import React from "react";
import { Container, Row, Col, Image, Badge, ListGroup } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import featuredImage from '../../../logo_final2.png';
import "../../../styles/components/Blog.css";

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
            <FaUserCircle size={50} className="me-2 text-secondary" />
            <div>
              <h6 className="mb-0 fw-bold">John Doe</h6>
              <p className="text-muted small">Stručnjak za internet bezbednost</p>
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
              U današnjem digitalnom svetu, internet je neizbežan deo detinjstva. Deca ga koriste za učenje, igru, komunikaciju i istraživanje sveta. I dok internet pruža brojne prilike, on takođe krije i izazove koji mogu biti preveliki za decu da se sama sa njima suoče.
            </p>
            <p>
              Kao roditelji, važno je da otvoreno razgovarate sa decom o korišćenju interneta, ali i o alatima poput <strong>KlikSigurnosti</strong> koji mogu dodatno osigurati njihovu bezbednost.
            </p>
            <br />
            <h3 className="fw-bold">Početak Razgovora: Kako Pristupiti Temi?</h3>
            <Row className="mt-4">
              <Col lg={5}>
                <Image src={featuredImage} alt="Roditelj i dete razgovaraju" fluid rounded />
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
              <li><strong>Slušajte bez osuđivanja:</strong> Važno je da dete oseća da je njegovo mišljenje važno.</li>
            </ul>
            <br />
            <h3 className="fw-bold">Uvođenje KlikSigurnosti u Razgovor</h3>
            <ol>
              <li><strong>Prikažite ga kao rešenje, a ne kaznu:</strong></li>
              <ul>
                <li>„Ovaj alat će nam pomoći da zajedno budemo sigurni da nećeš naići na stvari koje nisu dobre za tebe.“</li>
              </ul>
              <li><strong>Uključite dete u proces instalacije:</strong></li>
              <ul>
                <li>„Hajde zajedno da podesimo šta želiš da koristiš na internetu i šta ne bi trebalo da vidiš.“</li>
              </ul>
              <li><strong>Naglasite koristi za njih:</strong></li>
              <ul>
                <li>„KlikSigurnost ti pomaže da budeš bezbedan dok istražuješ internet.“</li>
              </ul>
            </ol>
            <Row className="mt-4">
              <Col lg={5}>
                <Image src={featuredImage} alt="Roditelj i dete zajedno podešavaju KlikSigurnost" fluid rounded />
              </Col>
            </Row>
            <br />
            <h3 className="fw-bold">Zaključak: Zajedno do sigurnijeg interneta</h3>
            <p>
              Razgovor o bezbednom korišćenju interneta nije samo praktična stvar – to je prilika da izgradite poverenje i otvoren odnos sa svojim detetom. Sa alatima poput <strong>KlikSigurnosti</strong>, imate dodatnu sigurnost da čak i kada niste tu, vaša deca su zaštićena od potencijalnih opasnosti.
            </p>
            <Row className="justify-content-center mt-4">
              <Col lg={10}>
                <Image src={featuredImage} alt="Porodica zajedno uživa na internetu" fluid rounded />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BizBlog;