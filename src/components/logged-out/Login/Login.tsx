import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../../../services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {  FaGoogle } from "react-icons/fa";

import "../../../styles/components/Signup.css";
import "../../../styles/components/Forms.css";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email({ message: "Email nije validan" }),
  password: z
    .string()
    .min(5, { message: "Lozinka mora biti duža od 6 karaktera" }),
});

type FormData = z.infer<typeof schema>;

function Login() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const googleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/oauth2/authorization/google`;
  };

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      await authService.login(data.email, data.password);
      await login();
      navigate("/pocetna");
    } catch (_) {
      toast.error("Pogrešan email ili lozinka");
    } finally {
      setIsLoading(false);
    }
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
              onClick={() => navigate("/registracija")}
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

              <Button className="signup-btn" type="submit">
                {isLoading ? (
                  <div className="spinner-border"></div>
                ) : (
                  <>Prijava</>
                )}
              </Button>
            </Form>

            <p className="or-text mt-4">Možete se prijaviti i pomoću:</p>
            <div className="social-icons d-flex justify-content-center">
              <Button onClick={googleLogin} className="d-flex align-items-center gap-2 google-button px-4 py-2" variant="light">
                <FaGoogle />
                Prijava pomoću Google naloga
              </Button>
            </div>


            <a href="/zaboravljena-lozinka" className="mt-4">
              {" "}
              Zaboravili ste lozinku? Promenite je ovde.
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
