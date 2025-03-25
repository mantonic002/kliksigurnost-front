import { useState } from "react";

interface Days {
  [key: string]: string[] | string;
}

export const defDays: Days = {
  pon: [],
  uto: [],
  sre: [],
  čet: [],
  pet: [],
  sub: [],
  ned: [],
  time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export const useSchedule = () => {
  const [days, setDays] = useState(defDays);

  return {
    days,
    setDays,
  };
};
