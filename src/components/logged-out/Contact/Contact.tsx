import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Contact = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Kontaktirajte nas</h2>
              <p className="text-center">Imate pitanja? Rado ćemo vam pomoći!</p>
              <div className="mb-4 text-center">
                <p><strong>Email:</strong> kontakt@kliksigurnost.com</p>
                <p><strong>Telefon:</strong> +381 60 123 4567</p>
              </div>
              <h5 className="mb-3">Zakažite sastanak</h5>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Ime i prezime</Form.Label>
                  <Form.Control type="text" placeholder="Vaše ime" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Vaš email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Telefon</Form.Label>
                  <Form.Control type="text" placeholder="Vaš broj telefona" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Poruka</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Vaša poruka" />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Pošalji zahtev
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
