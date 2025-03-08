import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentService from "../../services/AppointmentService";
import { useNavigate } from "react-router-dom";
import { Appointment } from "../../models/Appointment";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  let navigate = useNavigate();

  const utcToLocal = (time: string) => {
    const utcDate = new Date(time);
    return new Date(
      utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
    ).toString();
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      AppointmentService.getAppointments()
        .then((res) => {
          setAppointments(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
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

    AppointmentService.createAppointment(appointment)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.error("Failed to schedule appointment:", error);
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
    <div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const date = utcToLocal(appointment.appointmentDateTime);

              return (
                <tr key={appointment.id}>
                  <td>{date}</td>
                  <td className="action">
                    <div
                      className="action-icon"
                      onClick={() => handleDelete(appointment.id!)}
                    >
                      <AiOutlineDelete className="action-red outlined" />
                      <AiFillDelete className="action-red filled" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
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
        </div>
        <button type="submit" className="btn btn-primary">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
