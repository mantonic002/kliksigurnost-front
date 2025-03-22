import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentService from "../../services/AppointmentService";
import { Appointment } from "../../models/Appointment";
import "../../styles/components/Appointment.css";
import { formatDate, utcToLocal } from "./Helpers";
import { BsFillTrashFill, BsTrash } from "react-icons/bs";
import { useRequest } from "../../services/useRequest";

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { sendRequest } = useRequest();

  const fetchAppointments = async () => {
    AppointmentService.getAppointments()
      .then((res) => {
        setAppointments(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const date = selectedDate.toISOString().split("T")[0];
      AppointmentService.getFreeTimeslots(date)
        .then((res) => {
          // Convert UTC times to local time
          const localSlots = res.map((slot) => {
            return utcToLocal(slot);
          });
          setAvailableSlots(localSlots);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchAvailableSlots();
  }, [selectedDate]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!selectedDate) {
      alert("Please select a date and time.");
      return;
    }

    const appointment = {
      appointmentDateTime: selectedDate.toISOString(),
    };

    sendRequest(async () => {
      await AppointmentService.createAppointment(appointment);
      fetchAppointments();
    });
  };

  const handleDelete = async (appointmentId: number) => {
    AppointmentService.deleteAppointment(appointmentId);
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== appointmentId)
    );
  };

  // Convert available slots to Date objects for easier comparison
  const availableSlotDates = availableSlots.map((slot) => new Date(slot));

  return (
    <div className="container mt-4">
      {/* List of appointments */}
      <div className="appointment-list">
        {appointments.map((appointment) => {
          const formattedDate = formatDate(
            utcToLocal(appointment.appointmentDateTime)
          );

          return (
            <div key={appointment.id} className="appointment-item">
              <span>{formattedDate}</span>
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

      <form onSubmit={handleSubmit}>
        <div className="inline-form">
          <label className="form-label">Date and Time:</label>
          <DatePicker
            className="form-control"
            selected={selectedDate}
            onChange={(date) => (date ? setSelectedDate(date) : {})}
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            filterTime={(time) => {
              return availableSlotDates.some(
                (slot) => slot.getTime() === time.getTime()
              );
            }}
            required
          />
          <button type="submit" className="btn btn-primary">
            Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
