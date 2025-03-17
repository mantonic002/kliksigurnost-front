import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/auth-service";

import "../../../styles/components/Signup.css";
import "../../../styles/components/Forms.css";

const schema = z
  .object({
    email: z.string().email({ message: "Email nije validan" }),
    password: z
      .string()
      .min(5, { message: "Lozinka mora biti duža od 5 karaktera" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Lozinka mora biti duža od 5 karaktera" }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Lozinka nije ista u oba polja",
        path: ["confirmPassword"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

const Signup = () => {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const googleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    authService
      .register(data.email, data.password)
      .then((res) => {
        setSuccess(res.data.message);
        setErr("");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErr(error.response.data.error || "Registration failed");
        } else {
          setErr("An unknown error occurred");
        }
        console.error("Registration error:", error);
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
              onClick={() => navigate("/login")}
              variant="outline-light"
              className="signin-btn"
            >
              Imate nalog? Prijavite se.
            </Button>
          </Col>

          {/* Right Side */}
          <Col md={6} className="signup-right">
            <h2 className="signup-title">Napravite nalog</h2>
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

              <Form.Group controlId="confirmPassword">
                <Form.Control
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Ponovite lozinku"
                  className="input-field"
                />
              </Form.Group>
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}

              {err && (
                <Alert variant="danger" className="my-2">
                  {err}
                </Alert>
              )}
              {success && (
                <Alert variant="success" className="my-2">
                  {success}
                </Alert>
              )}

              <Button className="signup-btn" type="submit">
                {isLoading ? (
                  <div className="spinner-border"></div>
                ) : (
                  <>Registracija</>
                )}
              </Button>
            </Form>

            <p className="or-text">Možete se registrovati i pomoću:</p>
            <div className="social-icons">
              <FaFacebookF className="icon fb" />
              <FaGoogle onClick={googleLogin} className="icon google" />
              <FaLinkedinIn className="icon linkedin" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Signup;
