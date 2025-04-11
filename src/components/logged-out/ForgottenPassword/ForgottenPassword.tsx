import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../../../services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form} from "react-bootstrap";

import "../../../styles/components/Signup.css";
import "../../../styles/components/Forms.css";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email({ message: "Email nije validan" }),
});

type FormData = z.infer<typeof schema>;

function ForgottenPassword() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      toast.success(
        "Ako uneti mail postoji, poslali smo link za promenu lozinke"
      );
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="signup-section">
      <Container fluid className="signup-container">
        {/* Right Side */}
        <Col md={6} className="signup-right">
          <h2 className="signup-title">Zaboravljena lozinka</h2>
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

            <Button className="signup-btn" type="submit">
              {isLoading ? (
                <div className="spinner-border"></div>
              ) : (
                <>Potvrdi</>
              )}
            </Button>
          </Form>
        </Col>
      </Container>
    </section>
  );
}

export default ForgottenPassword;
