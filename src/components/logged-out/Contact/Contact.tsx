import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../../../styles/components/Contact.css";

const Contact = () => {
  return (
    <Container className="mt-3 mb-3 custom-card">
      <Row className="justify-content-center custom-card">
        <Col md={12} lg={12} className="custom-card">
          <Card className="shadow-lg p-4 custom-card">
            <Card.Body>
              <h2 className="text-center mb-4">Kontaktirajte nas</h2>
              <h5 className="mb-3">Imate pitanja? Rado ćemo vam pomoći:</h5>
              <div className="mb-4">
                <br/>
                <p><strong>Email:</strong> podrska@kliksigurnost.com</p>
                <p><strong>Telefon:</strong> +381 60 123 4567</p>
                <p><strong>Viber:</strong> +381 60 123 4567</p>
                <p><strong>WhatsApp:</strong> +381 60 123 4567</p>
              </div>
              <hr className="my-4 border-0 border-top border-secondary" />
              <br/>
              <h5 className="mb-3">Pošaljite nam poruku:</h5>
              <br/>
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label><strong>Ime i prezime:</strong></Form.Label>
                  <Form.Control type="text" placeholder="Vaše ime" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label><strong>E-mail:</strong></Form.Label>
                  <Form.Control type="email" placeholder="Vaš email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label><strong>Vaš broj telefona:</strong></Form.Label>
                  <Form.Control type="text" placeholder="Vaš broj telefona" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label><strong>Poruka:</strong></Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Vaša poruka" />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Pošalji poruku
                  </Button>
                  <hr className="my-4 border-0 border-top border-secondary" />
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
