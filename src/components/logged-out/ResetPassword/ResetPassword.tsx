import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../../../services/auth-service";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Container, Form} from "react-bootstrap";
import "../../../styles/components/Forms.css";
import { toast } from "react-toastify";

const schema = z
  .object({
    password: z.string().min(8, "Lozinka mora imati najmanje 8 karaktera"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lozinke se ne poklapaju",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      setIsValidToken(false);
      toast.error("Nevalidan link za resetovanje lozinke");
      navigate("/");
    }
    setToken(tokenFromUrl);
  }, [searchParams, navigate]);

  const onSubmit = async (data: FieldValues) => {
    if (!token) return;

    setIsLoading(true);
    try {
      await authService.resetPassword(token, data.password);
      toast.success("Lozinka je uspešno promenjena");
      navigate("/prijava");
    } catch (error: any) {
      toast.error(error.message || "Greška pri resetovanju lozinke");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) return null;

  return (
    <section className="signup-section">
      <Container fluid className="signup-container">
        <Col md={6} className="signup-right">
          <h2 className="signup-title">Resetuj Lozinku</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="password">
              <Form.Control
                {...register("password")}
                type="password"
                placeholder="Nova lozinka"
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
                placeholder="Potvrdi novu lozinku"
                className="input-field"
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
            </Form.Group>

            <Button className="signup-btn" type="submit">
              {isLoading ? (
                <div className="spinner-border"></div>
              ) : (
                <>Promeni Lozinku</>
              )}
            </Button>
          </Form>
        </Col>
      </Container>
    </section>
  );
}

export default ResetPassword;
