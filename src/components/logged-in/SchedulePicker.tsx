import { useState, useEffect, useRef } from "react";
import { useSchedule } from "./useSchedule";
import "../../styles/components/SchedulePicker.css";
import {
  BsArrow90DegLeft,
  BsCalendar2Event,
  BsFloppy,
  BsFloppyFill,
  BsXLg,
} from "react-icons/bs";

interface SchedulePickerProps {
  onChange: (schedule: { [key: string]: string[] | string }) => void;
}

export const SchedulePicker = ({ onChange }: SchedulePickerProps) => {
  const { days, setDays } = useSchedule();
  const [daysInitial, setDaysInitial] = useState(days);
  const [isOpen, setIsOpen] = useState(false);
  const isDragging = useRef(false);

  const timeSlots = Array.from({ length: 49 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  // Handler for selecting/deselecting an entire day
  const handleDayClick = (day: string) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      if (Array.isArray(updatedDays[day])) {
        // Check if all time slots are already selected
        const allSelected = timeSlots.every((slot) =>
          updatedDays[day].includes(slot)
        );

        if (allSelected) {
          updatedDays[day] = [];
        } else {
          updatedDays[day] = [...timeSlots];
        }
      }
      return updatedDays;
    });
  };

  const handleTimeSlotClick = (day: string, timeSlot: string) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      if (Array.isArray(updatedDays[day])) {
        const index = updatedDays[day].indexOf(timeSlot);
        if (index === -1) {
          updatedDays[day] = [...updatedDays[day], timeSlot];
        } else {
          updatedDays[day] = updatedDays[day].filter(
            (slot) => slot !== timeSlot
          );
        }
      }
      return updatedDays;
    });
  };

  const handleMouseDown = (day: string, timeSlot: string) => {
    isDragging.current = true;
    handleTimeSlotClick(day, timeSlot);
  };

  const handleMouseEnter = (day: string, timeSlot: string) => {
    if (isDragging.current) {
      handleTimeSlotClick(day, timeSlot);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setDays(daysInitial);
  };

  const handleClose = () => {
    setDays(daysInitial);
    setIsOpen(false);
  };

  const handleSave = () => {
    onChange(days);
    setDaysInitial(days);
    setIsOpen(false);
  };

  return (
    <div className="mb-3">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BsCalendar2Event size={25} className="mr-2" /> Schedule
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h5>Select Schedule</h5>
              <div className="inline">
                <div className="action-icon me-4" onClick={handleClear}>
                  <div className="icon-wrapper">
                    <BsArrow90DegLeft
                      size={25}
                      className="action-blue outlined"
                    />
                    <BsArrow90DegLeft
                      size={25}
                      className="action-blue filled"
                    />
                  </div>
                </div>

                <div className="action-icon me-4" onClick={handleSave}>
                  <div className="icon-wrapper">
                    <BsFloppy size={25} className="action-blue outlined" />
                    <BsFloppyFill size={25} className="action-blue filled" />
                  </div>
                </div>

                <div className="action-icon me-4" onClick={handleClose}>
                  <div className="icon-wrapper">
                    <BsXLg size={25} className="action-red outlined" />
                    <BsXLg size={25} className="action-red filled" />
                  </div>
                </div>
              </div>
            </div>

            <div className="time-slots-container">
              <div className="d-flex">
                <div className="time-label"></div>
                {Object.keys(days).map((day) => {
                  if (day === "time_zone") return null;
                  return (
                    <div
                      key={day}
                      className="day-header"
                      onClick={() => handleDayClick(day)} // Add click handler for entire day
                    >
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
