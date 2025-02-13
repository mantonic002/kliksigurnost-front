import { useState, useEffect } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useSchedule } from "./useSchedule";

interface SchedulePickerProps {
  onChange: (schedule: { [key: string]: string[] | string }) => void;
}

export const SchedulePicker = ({ onChange }: SchedulePickerProps) => {
  const { days, setDays } = useSchedule();
  const [isOpen, setIsOpen] = useState(false);

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  const handleTimeSlotClick = (day: string, timeSlot: string) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      if (Array.isArray(updatedDays[day])) {
        const index = updatedDays[day].indexOf(timeSlot);
        if (index === -1) {
          updatedDays[day].push(timeSlot);
        } else {
          updatedDays[day].splice(index, 1);
        }
      }
      return updatedDays;
    });
  };

 useEffect(() => {
    onChange(days);
  }, [days, onChange]);
  

  return (
    <div className="mb-3">
      <label className="form-label">Schedule</label>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h5>Select Schedule</h5>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>

          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "10px",
            }}
          >
            <div className="d-flex">
              <div style={{ width: "100px" }}></div>
              {Object.keys(days).map((day) => {
                if (day === "time_zone") return null;
                return (
                  <div
                    key={day}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </div>
                );
              })}
            </div>

            {timeSlots.map((timeSlot) => (
              <div
                key={timeSlot}
                className="d-flex align-items-center"
                style={{ marginBottom: "4px" }}
              >
                <div style={{ width: "100px" }}>{timeSlot}</div>
                {Object.keys(days).map((day) => {
                  if (day === "time_zone") return null;
                  const isSelected =
                    Array.isArray(days[day]) && days[day].includes(timeSlot);
                  return (
                    <div
                      key={`${day}-${timeSlot}`}
                      style={{
                        flex: 1,
                        padding: "8px",
                        border: "1px solid #ddd",
                        backgroundColor: isSelected ? "#007bff" : "#f8f9fa",
                        color: isSelected ? "white" : "black",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleTimeSlotClick(day, timeSlot)}
                    >
                      {isSelected ? "✔" : ""}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};