import { useState } from "react";

interface Days {
  [key: string]: string[] | string;
}

export const defDays: Days = {
  mon: [],
  tue: [],
  wed: [],
  thu: [],
  fri: [],
  sat: [],
  sun: [],
  time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export const useSchedule = () => {
  const [days, setDays] = useState(defDays);

  return {
    days,
    setDays,
  };
};
