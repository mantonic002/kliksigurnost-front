import {useEffect } from "react"; // Add useEffect here
import { AiFillCaretDown, AiFillCaretUp, AiFillPlusSquare } from "react-icons/ai";
import { useSchedule } from "./useSchedule"; // Adjust the import path as needed

interface SchedulePickerProps {
  onChange: (schedule: { [key: string]: string[] | string }) => void;
}

export const SchedulePicker = ({ onChange }: SchedulePickerProps) => {
  const {
    days,
    setDays,
    scheduleFormOpen,
    setScheduleFormOpen,
    addTimeRange,
  } = useSchedule();

  const handleTimeChange = (day: string, index: number, value: string) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      if (Array.isArray(updatedDays[day])) {
        updatedDays[day][index] = value;
      }
      return updatedDays;
    });
  };

  // Notify the parent component whenever the schedule changes
  useEffect(() => {
    onChange(days);
  }, [days, onChange]);

  return (
    <div className="mb-3">
      <label className="form-label">Schedule</label>
      {scheduleFormOpen ? (
        <>
          <AiFillCaretUp
            className="iconButton"
            onClick={() => setScheduleFormOpen(!scheduleFormOpen)}
          />
          <div className="border p-3 rounded" style={{ minWidth: "450px" }}>
            {Object.keys(days).map((day) => {
              if (day === "time_zone") return null; // Skip the time_zone field for rendering

              return (
                <div key={day} className="d-flex align-items-top mb-3">
                  <label className="form-label flex-shrink-0 w-25">
                    {day.charAt(0).toUpperCase() + day.slice(1)}:
                  </label>
                  <div className="d-flex flex-column w-75">
                    {Array.isArray(days[day]) &&
                      days[day].map((_, index) => {
                        if (index % 2 === 0) {
                          return (
                            <div key={index} className="d-flex mb-2">
                              <input
                                type="time"
                                value={days[day][index]}
                                onChange={(e) =>
                                  handleTimeChange(day, index, e.target.value)
                                }
                                placeholder="Start Time"
                                className="form-control me-2 w-50"
                              />
                              <input
                                type="time"
                                value={days[day][index + 1]}
                                onChange={(e) =>
                                  handleTimeChange(day, index + 1, e.target.value)
                                }
                                placeholder="End Time"
                                className="form-control w-50"
                              />
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                  <div className="m-1 text-success">
                    <AiFillPlusSquare
                      size="30"
                      onClick={() => addTimeRange(day)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <AiFillCaretDown
          className="m-1 text-success"
          size={20}
          onClick={() => setScheduleFormOpen(!scheduleFormOpen)}
        />
      )}
    </div>
  );
};