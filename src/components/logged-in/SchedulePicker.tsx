import { useState, useEffect, useRef } from "react";
import { useSchedule } from "./useSchedule";
import "../../styles/components/SchedulePicker.css";
import { BsXLg } from "react-icons/bs";

interface SchedulePickerProps {
  onChange: (schedule: { [key: string]: string[] | string }) => void;
}

export const SchedulePicker = ({ onChange }: SchedulePickerProps) => {
  const { days, setDays } = useSchedule();
  const [isOpen, setIsOpen] = useState(false);
  const isDragging = useRef(false); // Use a ref for synchronous drag state

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

  const handleMouseDown = (day: string, timeSlot: string) => {
    isDragging.current = true; // Set dragging state synchronously
    handleTimeSlotClick(day, timeSlot); // Select the starting field
  };

  const handleMouseEnter = (day: string, timeSlot: string) => {
    if (isDragging.current) {
      handleTimeSlotClick(day, timeSlot); // Select fields during drag
    }
  };

  // Add global mouseUp listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false; // Reset dragging state
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  // Prevent default dragging behavior
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    onChange(days);
  }, [days, onChange]);

  return (
    <div className="mb-3">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        Schedule
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h5>Select Schedule</h5>
              <BsXLg onClick={() => setIsOpen(false)} />
            </div>

            <div className="time-slots-container">
              <div className="d-flex">
                <div className="time-label"></div>
                {Object.keys(days).map((day) => {
                  if (day === "time_zone") return null;
                  return (
                    <div key={day} className="day-header">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </div>
                  );
                })}
              </div>

              {timeSlots.map((timeSlot) => (
                <div
                  key={timeSlot}
                  className="d-flex align-items-center time-slot-row"
                >
                  <div className="time-label">{timeSlot}</div>
                  {Object.keys(days).map((day) => {
                    if (day === "time_zone") return null;
                    const isSelected =
                      Array.isArray(days[day]) && days[day].includes(timeSlot);
                    return (
                      <div
                        key={`${day}-${timeSlot}`}
                        className={`time-slot ${isSelected ? "selected" : ""}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleMouseDown(day, timeSlot);
                        }}
                        onMouseEnter={() => handleMouseEnter(day, timeSlot)}
                        onDragStart={handleDragStart}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
