import { useState } from "react";

// Allow any string as a valid key for `days` but maintain valid value types
interface Days {
  [key: string]: string[] | string; // any string can be a key, values can be arrays of strings or a string
}

export const useSchedule = () => {
  const defDays: Days = {
    mon: ["", ""],
    tue: ["", ""],
    wed: ["", ""],
    thu: ["", ""],
    fri: ["", ""],
    sat: ["", ""],
    sun: ["", ""],
    time_zone: "",
  };

  const [days, setDays] = useState(defDays);
  const [scheduleFormOpen, setScheduleFormOpen] = useState(false);

  const addTimeRange = (day: string) => {
    // Ensuring that the day is one of the valid days (optional, for runtime validation)
    if (["mon", "tue", "wed", "thu", "fri", "sat", "sun"].includes(day)) {
      setDays((prevDays) => ({
        ...prevDays,
        [day]: [...(prevDays[day] || []), "", ""],
      }));
    } else {
      console.error("Invalid day provided:", day);
    }
  };

  return {
    days,
    setDays,
    scheduleFormOpen,
    setScheduleFormOpen,
    addTimeRange,
  };
};
