import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

const Signup = () => {
    return (
        <section className="signup-section">
            <Container fluid className="signup-container">
                <Row className="signup-box">
                    {/* Left Side */}
                    <Col md={6} className="signup-left">
                        <h2>Dobrodošli na KlikSigurnost</h2>
                        <p>
                            Alat koji roditelji širom regiona biraju za miran san i sigurnu budućnost svoje dece.
                        </p>
                        <Button variant="outline-light" className="signin-btn">
                            Imate nalog? Prijavite se.
                        </Button>
                    </Col>

                    {/* Right Side */}
                    <Col md={6} className="signup-right">
                        <h2 className="signup-title">Napravite nalog</h2>
                        <Form>
                            <Form.Group controlId="username">
                                <Form.Control type="text" placeholder="Korisničko ime" className="input-field" />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Control type="email" placeholder="E-mail adresa" className="input-field" />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Control type="password" placeholder="Lozinka" className="input-field" />
                            </Form.Group>

                            <Form.Group controlId="confirmPassword">
                                <Form.Control type="password" placeholder="Ponovite lozinku" className="input-field" />
                            </Form.Group>

                            <Button className="signup-btn" type="submit">
                                Registracija
                            </Button>
                        </Form>
                        <Button variant="outline-light" className="form-signin">
                            Imate nalog? Prijavite se.
                        </Button>
                        <p className="or-text">Možete se registrovati i pomoću:</p>
                        <div className="social-icons">
                            <FaFacebookF className="icon fb" />
                            <FaGoogle className="icon google" />
                            <FaLinkedinIn className="icon linkedin" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Signup;
