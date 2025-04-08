import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentService from "../../services/AppointmentService";
import { Appointment } from "../../models/Appointment";
import "../../styles/components/Appointment.css";
import { formatDate, utcToLocal } from "./Helpers";
import { BsFillTrashFill, BsTrash } from "react-icons/bs";
import { useRequest } from "../../services/useRequest";
import { Button, Form, Spinner, Accordion } from "react-bootstrap";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import contactService from "../../services/contact-service";
import { useAuth } from "../../contexts/AuthContext";

const schema = z.object({
  phoneNumber: z.string().min(5, { message: "Unesite validan broj telefona." }),
  message: z
    .string()
    .max(255, { message: "Poruka može imati maksimalno 255 karaktera." }),
});

type FormData = z.infer<typeof schema>;

const AppointmentForm = () => {
  const { profile } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const { sendRequest } = useRequest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      await contactService.submitForm({
        name: profile?.email || "",
        userEmail: profile?.email || "",
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

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await AppointmentService.getAppointments();
      setAppointments(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAvailableSlots = async (date: Date) => {
    setIsSlotsLoading(true);
    try {
      const dateString = date.toISOString().split("T")[0];
      const res = await AppointmentService.getFreeTimeslots(dateString);
      const slots = Array.isArray(res) ? res : [];
      const localSlots = slots.map((slot) => utcToLocal(slot));
      setAvailableSlots(localSlots);
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
      setAvailableSlots([]);
    } finally {
      setIsSlotsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const onSubmitAppointment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!selectedDate || !phoneNumber) {
      alert("Molimo izaberite datum/vreme i unesite broj telefona.");
      return;
    }
    const appointment = {
      appointmentDateTime: selectedDate.toISOString(),
      phoneNumber: phoneNumber,
    };
    sendRequest(async () => {
      await AppointmentService.createAppointment(appointment);
      await fetchAppointments();
      setPhoneNumber("");
      setSelectedDate(new Date());
    });
  };

  const handleDelete = async (appointmentId: number) => {
    sendRequest(async () => {
      await AppointmentService.deleteAppointment(appointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );
    });
  };

  const availableSlotDates = availableSlots.map((slot) => new Date(slot));

  return (
    <div className="container mt-4">
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Učitavanje termina...</p>
        </div>
      ) : (
        <>
          {appointments.length > 0 && <strong>Vaši termini:</strong>}
          <div className="appointment-list">
            {appointments.map((appointment) => {
              const formattedDate = formatDate(
                utcToLocal(appointment.appointmentDateTime)
              );
              return (
                <div key={appointment.id} className="appointment-item">
                  <span>
                    <strong>Datum: </strong>
                    {formattedDate}
                    <strong className="ms-4">Telefon:</strong>
                    {appointment.phoneNumber && ` ${appointment.phoneNumber}`}
                  </span>
                  <div
                    className="action-icon"
                    onClick={() => handleDelete(appointment.id!)}
                  >
                    <div className="icon-wrapper">
                      <BsTrash className="action-red outlined" />
                      <BsFillTrashFill className="action-red filled" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <Accordion defaultActiveKey="1" className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Zakažite termin</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={onSubmitAppointment}>
              <div className="mb-3">
                <label className="form-label">Datum i vreme:</label>
                <br />
                {isSlotsLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <DatePicker
                    className="form-control"
                    selected={selectedDate}
                    onChange={(date) => date && setSelectedDate(date)}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    filterTime={(time) =>
                      availableSlotDates.some(
                        (slot) => slot.getTime() === time.getTime()
                      )
                    }
                    required
                  />
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Telefon:</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Broj telefona"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  style={{ maxWidth: "150px" }}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Zakažite termin
              </button>
            </form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Pošaljite poruku</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                  "Pošaljite poruku"
                )}
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AppointmentForm;
