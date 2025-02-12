import { useState } from "react";
import Select from "react-select";
import { SchedulePicker } from "./SchedulePicker";
import { Policy } from "../models/Policy";
import policyService from "../services/policy-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define schema
const schema = z.object({
  trafficApplications: z.string().optional(),
  trafficCategories: z.string().optional(),
  schedule: z
    .object({
      mon: z.array(z.string()).optional(),
      tue: z.array(z.string()).optional(),
      wed: z.array(z.string()).optional(),
      thu: z.array(z.string()).optional(),
      fri: z.array(z.string()).optional(),
      sat: z.array(z.string()).optional(),
      sun: z.array(z.string()).optional(),
      time_zone: z.string().optional(),
    })
    .optional(),
});

type PolicyFormData = z.infer<typeof schema>;

type SelectOption = {
  value: number;
  label: string;
  parentId: number | null;
};

interface PolicyFormProps {
  categoryOptions: { value: number; label: string; parentId: number | null }[];
  applicationOptions: { value: number; label: string; parentId: number | null }[];
  setPolicies: React.Dispatch<React.SetStateAction<Policy[]>>;
}

export const PolicyForm = ({
  categoryOptions,
  applicationOptions,
  setPolicies,
}: PolicyFormProps) => {
  const [schedule, setSchedule] = useState<{ [key: string]: string[] | string }>({});
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);

  const {
    handleSubmit,
    setValue,
    reset,
  } = useForm<PolicyFormData>({
    resolver: zodResolver(schema),
  });

  // Update both local state and form state for schedule
  const updateSchedule = (newSchedule: { [key: string]: string[] | string }) => {
    setSchedule(newSchedule); // Update local state
    setValue("schedule", newSchedule); // Update form state
  };

  // Handle category selection
  const handleCategoryChange = (selectedOptions: readonly SelectOption[]) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    const updatedCategories = new Set(selectedIds);
  
    // Automatically select subcategories if a parent category is selected
    categoryOptions.forEach((option) => {
      if (option.parentId && selectedIds.includes(option.parentId)) {
        updatedCategories.add(option.value);
      }
    });
  
    const selectedCategoryArray = Array.from(updatedCategories);
    setSelectedCategories(selectedCategoryArray);
  
    // Update traffic field based on selected categories
    if (selectedCategoryArray.length > 0) {
      const trafficString = `any(dns.content_category[*] in {${selectedCategoryArray.join(" ")}})`;
      setValue("trafficCategories", trafficString);
    } else {
      setValue("trafficCategories", ""); // Clear if no categories are selected
    }
  };

  // Handle application selection
  const handleApplicationChange = (selectedOptions: readonly SelectOption[]) => {
    const updatedApplications = new Set<number>();
    const updatedApplicationTypes = new Set<number>();

    // Classify selected options into applications and types
    selectedOptions.forEach((option) => {
      if (option.parentId) {
        updatedApplications.add(option.value);
      } else {
        updatedApplicationTypes.add(option.value);
      }
    });

    // Automatically select subcategories if a parent category is selected
    applicationOptions.forEach((option) => {
      if (option.parentId && updatedApplicationTypes.has(option.parentId)) {
        updatedApplications.add(option.value);
      }
    });

    // Convert sets to arrays
    const selectedApplicationTypesArray = Array.from(updatedApplicationTypes);
    const selectedApplicationsArray = Array.from(updatedApplications);

    // Find applications whose parentId is not in selectedApplicationTypesArray
    const selectedApplicationsNotInAppTypesArray = Array.from(updatedApplications).filter(
      (appId) => {
        const option = applicationOptions.find((option) => option.value === appId);
        return option && option.parentId && !selectedApplicationTypesArray.includes(option.parentId);
      }
    );

    // Set the selected values
    setSelectedApplications([...selectedApplicationsArray, ...selectedApplicationTypesArray]);

    // Update traffic field based on selected applications
    let trafficString = "";

    const appsNotInTypes =
      selectedApplicationsNotInAppTypesArray.length > 0
        ? `any(app.ids[*] in {${selectedApplicationsNotInAppTypesArray.join(" ")}})`
        : "";

    const appTypes =
      selectedApplicationTypesArray.length > 0
        ? `any(app.type.ids[*] in {${selectedApplicationTypesArray.join(" ")}})`
        : "";

    if (appsNotInTypes && appTypes) {
      trafficString = `${appsNotInTypes} or ${appTypes}`;
    } else if (appsNotInTypes || appTypes) {
      trafficString = appsNotInTypes || appTypes;
    }

    setValue("trafficApplications", trafficString);
  };

  // Handle form submission
  const onSubmit = (data: PolicyFormData) => {
    data.schedule = schedule;

    const formattedSchedule = Object.entries(data.schedule).reduce(
      (acc: Record<string, string>, [day, timeRanges]) => {
        if (day !== "time_zone" && timeRanges && timeRanges[0] !== "") {
          const ranges = (timeRanges as string[]).reduce((result, time, index, arr) => {
            if (time && index % 2 === 0) {
              result.push({ start: time, end: arr[index + 1] });
            }
            return result;
          }, [] as { start: string; end: string }[]);

          const timeToMinutes = (time: string) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
          };

          ranges.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

          const mergedRanges = [];
          let currentStart = ranges[0].start;
          let currentEnd = ranges[0].end;

          for (let i = 1; i < ranges.length; i++) {
            const { start, end } = ranges[i];
            if (timeToMinutes(start) <= timeToMinutes(currentEnd)) {
              currentEnd = timeToMinutes(end) > timeToMinutes(currentEnd) ? end : currentEnd;
            } else {
              mergedRanges.push(`${currentStart}-${currentEnd}`);
              currentStart = start;
              currentEnd = end;
            }
          }

          mergedRanges.push(`${currentStart}-${currentEnd}`);
          acc[day] = mergedRanges.join(",");
        }
        return acc;
      },
      {} as Record<string, string>
    );

    const isScheduleEmpty = Object.values(formattedSchedule).every(
      (value) => value === "" || value === null
    );

    const formData = {
      ...data,
      ...(isScheduleEmpty ? { schedule: undefined } : { schedule: { ...formattedSchedule, time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone } }),
    };

    const trafficString: string[] = [];
    if (formData.trafficCategories) {
      trafficString.push(formData.trafficCategories);
    }
    if (formData.trafficApplications) {
      trafficString.push(formData.trafficApplications);
    }

    const policy: Policy = {
      action: "block",
      traffic: trafficString.join(" or "),
      schedule: formData.schedule,
    };

    policyService
      .post<Policy>(policy)
      .then(() => {
        const { req } = policyService.getAll<Policy>();
        return req;
      })
      .then((res) => {
        setPolicies(res.data);
        reset();
        setSchedule({});
        setSelectedCategories([]);
        setSelectedApplications([]);
      })
      .catch((error: any) => {
        alert(error.message || "Failed to create policy");
      });
  };

  return (
    <div>
      <h2>Create a New Policy</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Categories:</label>
          <Select
            isMulti
            name="categories"
            options={categoryOptions}
            onChange={handleCategoryChange}
            closeMenuOnSelect={false}
            value={categoryOptions.filter((option) =>
              selectedCategories.includes(option.value)
            )}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => String(e.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Applications:</label>
          <Select
            isMulti
            name="applications"
            options={applicationOptions}
            onChange={handleApplicationChange}
            closeMenuOnSelect={false}
            value={applicationOptions.filter((option) =>
              selectedApplications.includes(option.value)
            )}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => String(e.value)}
          />
        </div>

        <SchedulePicker onChange={updateSchedule} />

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};