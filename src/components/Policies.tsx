import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import policyService, { Policy } from "../services/policy-service";
import { CanceledError } from "axios";
import Select from "react-select";
import categoriesData from "../data/content-categories.json";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillPlusCircle,
  AiFillPlusSquare,
} from "react-icons/ai";

// Define the schedule schema
const scheduleSchema = z.object({
  mon: z.array(z.string()).optional(),
  tue: z.array(z.string()).optional(),
  wed: z.array(z.string()).optional(),
  thu: z.array(z.string()).optional(),
  fri: z.array(z.string()).optional(),
  sat: z.array(z.string()).optional(),
  sun: z.array(z.string()).optional(),
  time_zone: z.string().optional(),
});

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  action: z.string().min(1, { message: "Action is required" }),
  traffic: z.string().min(1, { message: "Traffic is required" }),
  schedule: scheduleSchema,
});

type PolicyFormData = z.infer<typeof schema>;

function PolicyManager() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]); // To track selected categories and subcategories
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleFormOpen, setScheduleFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<PolicyFormData>({
    resolver: zodResolver(schema),
  });

  const [days, setDays] = useState<
    Partial<Record<keyof PolicyFormData["schedule"], string | string[]>>
  >({
    mon: ["", ""],
    tue: ["", ""],
    wed: ["", ""],
    thu: ["", ""],
    fri: ["", ""],
    sat: ["", ""],
    sun: ["", ""],
    time_zone: "", // Change this to an empty string instead of an array
  });

  const addTimeRange = (day: keyof PolicyFormData["schedule"]) => {
    setDays((prevDays) => ({
      ...prevDays,
      [day]: [...(prevDays[day] || []), "", ""],
    }));
  };

  // Fetch policies on component mount
  useEffect(() => {
    setIsLoading(true);
    const { req, cancel } = policyService.getAll<Policy>();
    req
      .then((res) => {
        setPolicies(res.data);
        setIsLoading(false);
      })
      .catch((error: any) => {
        if (error instanceof CanceledError) return;
        setError(error.message || "Failed to fetch policies");
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

  // Flatten category structure and create options for react-select
  const categoryOptions = categoriesData.categories.flatMap((category) => [
    { value: category.id, label: category.name, parentId: null }, // Parent category
    ...(category.subcategories
      ? category.subcategories.map((sub) => ({
          value: sub.id,
          label: `— ${sub.name}`, // Indented label for subcategory
          parentId: category.id, // Indicate the parent category
        }))
      : []),
  ]);

  // Handle category selection and automatically select subcategories if parent category is selected
  const handleCategoryChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.value);
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
    const trafficString = `any(dns.content_category[*] in {${selectedCategoryArray.join(
      " "
    )}})`;
    setValue("traffic", trafficString);
  };

  const onSubmit = (data: PolicyFormData) => {
    const formattedSchedule = Object.entries(data.schedule).reduce(
      (acc, [day, timeRanges]) => {
        if (day !== "time_zone") {
          const formattedRanges = (timeRanges as string[])
            .reduce((result, time, index, arr) => {
              if (time && index % 2 === 0) {
                result.push(`${time}-${arr[index + 1]}`);
              }
              return result;
            }, [] as string[])
            .join(",");
          acc[day as keyof PolicyFormData["schedule"]] = formattedRanges;
        }
        return acc;
      },
      {} as Record<keyof PolicyFormData["schedule"], string>
    );

    const formData = {
      ...data,
      schedule: {
        ...formattedSchedule,
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    policyService
      .post<Policy>(formData)
      .then(() => {
        const { req } = policyService.getAll<Policy>();
        return req;
      })
      .then((res) => {
        setPolicies(res.data);
      })
      .catch((error: any) => {
        setError(error.message || "Failed to create policy");
      });
  };

  return (
    <div className="container">
      <h1>Cloudflare Policies</h1>

      {error && <p className="text-danger">{error}</p>}

      <div>
        <h2>Policies</h2>
        <ul>
          {policies.map((policy) => (
            <li key={policy.id}>
              <strong>{policy.name}</strong> - {policy.action} -{" "}
              {policy.traffic}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Create a New Policy</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input {...register("name")} id="name" className="form-control" />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="action" className="form-label">
              Action:
            </label>
            <input
              {...register("action")}
              id="action"
              className="form-control"
            />
            {errors.action && (
              <p className="text-danger">{errors.action.message}</p>
            )}
          </div>

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

          {/* Schedule Picker */}
          <div className="mb-3">
            <label className="form-label">Schedule</label>
            {scheduleFormOpen ? (
              <>
                <AiFillCaretUp
                  className="iconButton"
                  onClick={() => setScheduleFormOpen(!scheduleFormOpen)}
                ></AiFillCaretUp>
                <div className="scheduleForm">
                  {Object.keys(days).map((day) => {
                    const dayKey = day as keyof PolicyFormData["schedule"];
                    if (dayKey === "time_zone") return null;
                    return (
                      <div key={dayKey} className="scheduleContainer">
                        <label className="label form-label">
                          {dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}:
                        </label>
                        <div className="timeRangeContainer">
                          {Array.isArray(days[dayKey]) &&
                            days[dayKey]?.map((_, index) => {
                              if (index % 2 === 0) {
                                return (
                                  <div key={index} className="timeRange">
                                    <input
                                      type="time"
                                      {...register(
                                        `schedule.${dayKey}.${index}` as const
                                      )}
                                      placeholder="Start Time"
                                    />
                                    <input
                                      type="time"
                                      {...register(
                                        `schedule.${dayKey}.${
                                          index + 1
                                        }` as const
                                      )}
                                      placeholder="End Time"
                                    />
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </div>
                        <AiFillPlusSquare
                          className="iconButton"
                          size="40"
                          onClick={() => addTimeRange(dayKey)}
                        ></AiFillPlusSquare>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <AiFillCaretDown
                className="iconButton"
                onClick={() => setScheduleFormOpen(!scheduleFormOpen)}
              ></AiFillCaretDown>
            )}
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PolicyManager;
