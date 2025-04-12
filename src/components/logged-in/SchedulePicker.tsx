import { useState, useEffect, useRef } from "react";
import { useSchedule } from "./useSchedule"; // Assuming this hook provides initial schedule state
import "../../styles/components/SchedulePicker.css"; // We will create this new CSS file
import {
  BsArrow90DegLeft,
  BsCalendar2Event,
  BsFloppy,
  BsXLg,
} from "react-icons/bs";

interface SchedulePickerProps {
  onChange: (schedule: { [key: string]: string[] | string }) => void;
  initialSchedule?: { [key: string]: string[] | string };
}

export const SchedulePicker = ({
  onChange,
  initialSchedule,
}: SchedulePickerProps) => {
  const { days: defaultDays } = useSchedule();
  const [days, setDays] = useState(initialSchedule || defaultDays);
  const [daysInitial, setDaysInitial] = useState(
    initialSchedule || defaultDays
  );
  const [isOpen, setIsOpen] = useState(false);
  const isDragging = useRef(false);
  const isSelecting = useRef(true);

  const timeSlots = Array.from({ length: 49 }, (_, i) => {
    // 00:00 to 24:00
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  const dayKeys = Object.keys(days).filter((key) => key !== "time_zone");

  useEffect(() => {
    if (initialSchedule) {
      setDays(initialSchedule);
      setDaysInitial(initialSchedule);
    }
  }, [initialSchedule]);

  const handleOpen = () => {
    setDaysInitial(days);
    setIsOpen(true);
  };

  const handleTimeSlotInteraction = (
    day: string,
    timeSlot: string,
    shouldAdd: boolean
  ) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      if (Array.isArray(updatedDays[day])) {
        const currentSlots = new Set(updatedDays[day]);
        if (shouldAdd) {
          currentSlots.add(timeSlot);
        } else {
          currentSlots.delete(timeSlot);
        }
        updatedDays[day] = Array.from(currentSlots).sort();
      }
      return updatedDays;
    });
  };

  // Handler for selecting/deselecting an entire day
  const handleDayClick = (day: string) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      if (Array.isArray(updatedDays[day])) {
        // Check if *all* time slots for the day are currently selected
        const allSelected = timeSlots.every((slot) =>
          updatedDays[day].includes(slot)
        );

        if (allSelected) {
          // If all are selected, deselect all
          updatedDays[day] = [];
        } else {
          // Otherwise, select all
          updatedDays[day] = [...timeSlots];
        }
      }
      return updatedDays;
    });
  };

  const handleMouseDown = (day: string, timeSlot: string) => {
    isDragging.current = true;
    const currentlySelected =
      Array.isArray(days[day]) && days[day].includes(timeSlot);
    isSelecting.current = !currentlySelected;
    handleTimeSlotInteraction(day, timeSlot, isSelecting.current);
  };

  const handleMouseEnter = (day: string, timeSlot: string) => {
    if (isDragging.current) {
      handleTimeSlotInteraction(day, timeSlot, isSelecting.current);
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

  // Prevent default drag behavior which interferes with selection
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleReset = () => {
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
    <div className="schedule-picker-wrapper">
      <button
        type="button"
        className="schedule-picker-button btn btn-primary"
        onClick={handleOpen}
      >
        <BsCalendar2Event
          size={20}
          style={{ marginRight: "8px", verticalAlign: "middle" }}
        />
        <span>Raspored</span>
      </button>

      {isOpen && (
        <div className="schedule-modal-overlay">
          <div className="schedule-modal-content">
            <div className="schedule-modal-header">
              <h5 className="schedule-modal-title">Izaberite period kada će pravilo da važi:</h5>
              <div className="schedule-modal-actions">
                <button
                  type="button"
                  className="schedule-action-icon"
                  onClick={handleReset}
                  title="Vrati na prethodno sačuvano"
                  aria-label="Vrati na prethodno sačuvano"
                >
                  {/* Simple icon for reset */}
                  <BsArrow90DegLeft size={22} />
                </button>
                <button
                  type="button"
                  className="schedule-action-icon schedule-action-save"
                  onClick={handleSave}
                  title="Sačuvaj promene"
                  aria-label="Sačuvaj promene"
                >
                  {/* Simple icon for save */}
                  <BsFloppy size={22} />
                </button>
                <button
                  type="button"
                  className="schedule-action-icon schedule-action-close"
                  onClick={handleClose}
                  title="Zatvori bez čuvanja"
                  aria-label="Zatvori bez čuvanja"
                >
                  <BsXLg size={22} />
                </button>
              </div>
            </div>

            <p className="schedule-instructions">
              Kliknite na vreme za izbor. Prevucite za izbor više termina.
              Kliknite na dan za izbor celog dana.
            </p>

            {/* This container allows horizontal scrolling on mobile */}
            <div className="schedule-grid-container">
              {/* Sticky Header Row */}
              <div className="schedule-grid-header">
                {dayKeys.map((day) => {
                  const allSelected =
                    Array.isArray(days[day]) &&
                    timeSlots.every((slot) => days[day].includes(slot));
                  return (
                    <div
                      key={day}
                      className={`schedule-day-header ${
                        allSelected ? "selected-day" : ""
                      }`}
                      onClick={() => handleDayClick(day)}
                      title={`Kliknite da ${
                        allSelected ? "poništite" : "izaberete"
                      } ceo dan: ${day}`}
                    >
                      {/* Short day names for mobile might be better */}
                      {day.substring(0, 3)}
                    </div>
                  );
                })}
              </div>

              {/* Scrollable Time Slots Area */}
              <div className="schedule-grid-body">
                {/* Sticky Time Labels Column */}
                <div className="schedule-time-labels-col">
                  {timeSlots.map((timeSlot) => (
                    <div key={timeSlot} className="schedule-time-label">
                      {timeSlot}
                    </div>
                  ))}
                </div>

                {/* Grid of actual selectable slots */}
                <div className="schedule-slots-grid">
                  {dayKeys.map((day) => (
                    <div
                      key={day}
                      className="schedule-day-column"
                      data-day={day}
                    >
                      {timeSlots.map((timeSlot) => {
                        const isSelected =
                          Array.isArray(days[day]) &&
                          days[day].includes(timeSlot);
                        return (
                          <div
                            key={`${day}-${timeSlot}`}
                            className={`schedule-time-slot ${
                              isSelected ? "selected" : ""
                            }`}
                            onMouseDown={(e) => {
                              // Prevent text selection during drag
                              e.preventDefault();
                              handleMouseDown(day, timeSlot);
                            }}
                            onMouseEnter={() => handleMouseEnter(day, timeSlot)}
                            // Prevent browser's default drag-and-drop
                            onDragStart={handleDragStart}
                            role="button"
                            aria-pressed={isSelected}
                            aria-label={`${day} ${timeSlot}`}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
