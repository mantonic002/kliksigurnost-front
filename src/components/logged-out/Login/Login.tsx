import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../../../services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

import "../../../styles/components/Signup.css";
import "../../../styles/components/Forms.css";

const schema = z.object({
  email: z.string().email({ message: "Email nije validan" }),
  password: z
    .string()
    .min(5, { message: "Lozinka mora biti duža od 6 karaktera" }),
});

type FormData = z.infer<typeof schema>;

function Login() {
  const [err, setErr] = useState("");
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const googleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const facebookLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/facebook";
  };

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    authService
      .login(data.email, data.password)
      .then(() => {
        login();
        navigate("/home");
      })
      .catch((error) => {
        setErr(error.message);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="signup-section">
      <Container fluid className="signup-container">
        <Row className="signup-box">
          {/* Left Side */}
          <Col md={6} className="signup-left">
            <h2>Dobrodošli na KlikSigurnost</h2>
            <p>
              Alat koji roditelji širom regiona biraju za miran san i sigurnu
              budućnost svoje dece.
            </p>
            <Button
              onClick={() => navigate("/register")}
              variant="outline-light"
              className="signin-btn"
            >
              Nemate nalog? Registrujte se.
            </Button>
          </Col>

          {/* Right Side */}
          <Col md={6} className="signup-right">
            <h2 className="signup-title">Prijavite se</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="email">
                <Form.Control
                  {...register("email")}
                  type="email"
                  placeholder="E-mail adresa"
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Control
                  {...register("password")}
                  type="password"
                  placeholder="Lozinka"
                  className="input-field"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Group>

              {err && (
                <Alert variant="danger" className="my-2">
                  Pogrešan email ili lozinka
                </Alert>
              )}

              <Button className="signup-btn" type="submit">
                {isLoading ? (
                  <div className="spinner-border"></div>
                ) : (
                  <>Prijava</>
                )}
              </Button>
            </Form>

            <p className="or-text">Možete se prijaviti i pomoću:</p>
            <div className="social-icons">
              <FaFacebookF onClick={facebookLogin} className="icon fb" />
              <FaGoogle onClick={googleLogin} className="icon google" />
              <FaLinkedinIn className="icon linkedin" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
