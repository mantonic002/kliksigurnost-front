import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/auth-service";

import "../../../styles/components/Signup.css";
import "../../../styles/components/Forms.css";
import { toast } from "react-toastify";

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
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

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

  const facebookLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/oauth2/authorization/facebook`;
  };

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    authService
      .register(data.email, data.password)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.error || "Registration failed");
        } else {
          toast.error("An unknown error occurred");
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
            <p><strong>Probna verzija traje 7 dana i potpuno je besplatna. 
              Nakon isteka probnog perioda, ukoliko odlučite da nastavite sa 
              korištenjem usluge, zatražićemo da unesete podatke vaše 
              kartice kako bismo omogućili nesmetano plaćanje pretplate 
              od 478 RSD mesečno. Pretplatu je moguće otkazati u svakom trenutku.</strong></p>
            <Button
              onClick={() => navigate("/prijava")}
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
              <p>
                Klikom na dugme <strong>„Registracija“</strong> potvrđujete da ste pročitali i saglasni ste sa{" "}
                <a href="/privatnost" target="_blank" rel="noopener noreferrer">
                  Politikom privatnosti
                </a>{" "}
                i{" "}
                <a href="/uslovi" target="_blank" rel="noopener noreferrer">
                  Uslovima korištenja
                </a>.
              </p>
              <Button className="signup-btn" type="submit">
                {isLoading ? (
                  <div className="spinner-border"></div>
                ) : (
                  <>Registracija</>
                )}
              </Button>
            </Form>

            <p className="or-text mt-4">Ili se možete automatski registrovati pomoću:</p>
            <div className="social-icons d-flex justify-content-center">
              <Button onClick={googleLogin} className="d-flex align-items-center gap-2 google-button px-4 py-2" variant="light">
                <FaGoogle />
                Registracija pomoću Google naloga
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Signup;
