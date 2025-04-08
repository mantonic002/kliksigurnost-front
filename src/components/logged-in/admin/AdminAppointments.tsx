import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Appointment } from "../../../models/Appointment";
import "../../../styles/components/Appointment.css";
import { formatDate, utcToLocal } from "../Helpers";
import adminService from "../../../services/admin-service";

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setHours(startDate.getHours() - 1);
      endDate.setDate(startDate.getDate() + 10);

      const formatDateWithoutMs = (date: Date) =>
        date.toISOString().replace(/\.\d{3}Z$/, ""); // Remove milliseconds

      adminService
        .getAppointments({
          start: formatDateWithoutMs(startDate),
          end: formatDateWithoutMs(endDate),
        })
        .then((res) => {
          setAppointments(res);
        })
        .catch((error) => {
          console.log(error);
          setErr(error);
        });
    };
    fetchAppointments();
  }, []);

  return (
    <div className="container  mt-4">
      {/* List of appointments */}
      <div className="appointment-list">
        {appointments.map((appointment) => {
          const formattedDate = formatDate(
            utcToLocal(appointment.appointmentDateTime)
          );

          return (
            <div key={appointment.id} className="appointment-item">
              <span>{appointment.userEmail}</span>
              <span>{appointment.phoneNumber}</span>
              <span>{formattedDate}</span>
            </div>
          );
        })}
      </div>

      {err && <div className="text-danger-alert">{err}</div>}
    </div>
  );
};

export default AdminAppointment;
