import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import contactService from "../../../services/contact-service";
import { toast } from "react-toastify";

import "../../../styles/components/Contact.css";

const schema = z.object({
  name: z.string().min(1, { message: "Ime i prezime je obavezno." }),
  userEmail: z.string().email({ message: "Unesite validnu email adresu." }),
  phoneNumber: z.string().min(5, { message: "Unesite validan broj telefona." }),
  message: z
    .string()
    .max(255, { message: "Poruka može imati maksimalno 255 karaktera." }),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      await contactService.submitForm({
        name: data.name,
        userEmail: data.userEmail,
        phoneNumber: data.phoneNumber,
        message: data.message,
      });
      toast.success("Poruka uspešno poslata! Odgovorićemo u najkraćem roku.");
      reset();
    } catch (error) {
      toast.error(
        "Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo."
      );
      console.error("Form submission error:", error);
    }
  };

  return (
    <section className="contact-section">
      <Container className="mt-3 mb-3 d-flex justify-content-center">
        <Card className="shadow-lg p-4 custom-card">
          <Card.Body>
            <h2 className="text-center mb-4">Kontaktirajte nas</h2>
            <h5 className="mb-3">Imate pitanja? Rado ćemo vam pomoći:</h5>
            {/* Static Contact Info */}
            <div className="mb-4">
              <p>
                <strong>Email:</strong> podrska@kliksigurnost.com
              </p>
              <p>
                <strong>Telefon:</strong> +381 60 123 4567
              </p>
              <p>
                <strong>Viber:</strong> +381 60 123 4567
              </p>
              <p>
                <strong>WhatsApp:</strong> +381 60 123 4567
              </p>
            </div>
            <hr className="my-4 border-0 border-top border-secondary" />
            <h5 className="mb-3">Pošaljite nam poruku:</h5>

            {/* Use handleSubmit from react-hook-form */}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="contactFormName">
                <Form.Label>
                  <strong>Ime i prezime:</strong>
                </Form.Label>
                <Form.Control
                  {...register("name")}
                  type="text"
                  placeholder="Vaše ime i prezime"
                  isInvalid={!!errors.name}
                />
                {/* Display validation errors */}
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Email Input */}
              <Form.Group className="mb-3" controlId="contactFormUserEmail">
                <Form.Label>
                  <strong>E-mail:</strong>
                </Form.Label>
                <Form.Control
                  {...register("userEmail")}
                  type="email"
                  placeholder="Vaš email"
                  isInvalid={!!errors.userEmail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.userEmail?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Phone Input */}
              <Form.Group className="mb-3" controlId="contactFormPhoneNumber">
                <Form.Label>
                  <strong>Vaš broj telefona:</strong>
                </Form.Label>
                <Form.Control
                  {...register("phoneNumber")}
                  type="tel"
                  placeholder="Vaš broj telefona"
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Message Input */}
              <Form.Group className="mb-3" controlId="contactFormMessage">
                <Form.Label>
                  <strong>Poruka:</strong>
                </Form.Label>
                <Form.Control
                  {...register("message")}
                  as="textarea"
                  rows={4}
                  placeholder="Vaša poruka"
                  isInvalid={!!errors.message}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Submit Button */}
              <div className="text-center">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="ms-2">Slanje...</span>
                    </>
                  ) : (
                    "Pošalji poruku"
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default Contact;
