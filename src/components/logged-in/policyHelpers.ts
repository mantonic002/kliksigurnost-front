// src/helpers/policyHelpers.ts

import { Policy } from "../../models/Policy";
import { toast } from "react-toastify";

export const dayNameMapping: Record<string, string> = {
  pon: "mon",
  uto: "tue",
  sre: "wed",
  čet: "thu",
  pet: "fri",
  sub: "sat",
  ned: "sun",
};

export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const formatTimeRanges = (timeSlots: string[]) => {
  if (timeSlots.length === 0) return "";

  timeSlots.sort((a, b) => timeToMinutes(a) - timeToMinutes(b));

  const ranges: string[] = [];
  let start = timeSlots[0];
  let end = timeSlots[0];

  for (let i = 1; i < timeSlots.length; i++) {
    const currentTime = timeSlots[i];
    const prevTime = timeSlots[i - 1];

    if (timeToMinutes(currentTime) - timeToMinutes(prevTime) === 30) {
      end = currentTime;
    } else {
      ranges.push(`${start}-${end}`);
      start = currentTime;
      end = currentTime;
    }
  }

  ranges.push(`${start}-${end}`);
  return ranges.join(",");
};

export const formatScheduleForBackend = (
  schedule: Record<string, string[] | string> | undefined
) => {
  if (!schedule) return {};

  return Object.entries(schedule).reduce(
    (acc: Record<string, string>, [day, timeSlots]) => {
      if (day === "time_zone") {
        acc[day] = timeSlots as string;
      } else if (Array.isArray(timeSlots)) {
        acc[day] = formatTimeRanges(timeSlots);
      }
      return acc;
    },
    {} as Record<string, string>
  );
};

export const isScheduleEmpty = (schedule: Record<string, string>) => {
  return Object.entries(schedule)
    .filter(([key]) => key !== "time_zone")
    .every(([_, value]) => value === "" || value === null);
};

export const handlePolicyError = (error: any) => {
  console.log(error);
  toast.error(
    error.message || "Neuspešno učitavanje pravila. Molimo pokušajte kasnije"
  );
};

export const createPolicyObject = (
  actionParam: string = "block",
  trafficCategories?: string,
  trafficApplications?: string,
  schedule?: Record<string, string>
): Policy => {
  const trafficString: string[] = [];
  if (trafficCategories) trafficString.push(trafficCategories);
  if (trafficApplications) trafficString.push(trafficApplications);

  return {
    action: actionParam,
    traffic: trafficString.join(" or "),
    ...(!isScheduleEmpty(schedule || {}) && { schedule }),
  };
};
