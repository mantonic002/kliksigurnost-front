import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../../../services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

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
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const googleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/authenticate/google";
  };

  const onSubmit = (data: FieldValues) => {
    authService
      .login(data.email, data.password)
      .then(() => {
        login();
        navigate("/home");
      })
      .catch((error) => {
        setErr(error.message);
        console.log(err);
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
                  Alat koji roditelji širom regiona biraju za miran san i sigurnu budućnost svoje dece.
              </p>
              <Button onClick={() => navigate("/register")} variant="outline-light" className="signin-btn">
                  Nemate nalog? Registrujte se.
              </Button>
          </Col>

          {/* Right Side */}
          <Col md={6} className="signup-right">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="email">
                <Form.Control {...register("email")} type="email" placeholder="E-mail adresa" className="input-field" />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>
  
              <Form.Group controlId="password">
                <Form.Control {...register("password")} type="password" placeholder="Lozinka" className="input-field" />
                {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
                )}                        
              </Form.Group>
              {err && <p className="text-danger">Pogrešan email ili lozinka</p>}

              <Button className="signup-btn" type="submit">
                Prijava
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
}

export default Login;
