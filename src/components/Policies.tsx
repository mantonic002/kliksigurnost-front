import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import policyService, { Policy } from "../services/policy-service";
import { CanceledError } from "axios";
import Select from "react-select";
import categoriesData from "../data/content-categories.json";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {
  AiFillCaretDown,
  AiFillCaretUp,
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
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleFormOpen, setScheduleFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<PolicyFormData>({
    resolver: zodResolver(schema),
  });

  const defDays = {
    mon: ["", ""],
    tue: ["", ""],
    wed: ["", ""],
    thu: ["", ""],
    fri: ["", ""],
    sat: ["", ""],
    sun: ["", ""],
    time_zone: "",
  };
  const [days, setDays] =
    useState<
      Partial<Record<keyof PolicyFormData["schedule"], string | string[]>>
    >(defDays);

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

  // Preprocess categories into a structure that makes lookups easy
  const { categoryOptions, categoryMap } = useMemo(() => {
    const categoryMap = new Map<number, string>();
    const categoryOptions = categoriesData.categories.flatMap((category) => [
      { value: category.id, label: category.name, parentId: null }, // Parent category
      ...(category.subcategories
        ? category.subcategories.map((sub) => ({
            value: sub.id,
            label: `— ${sub.name}`,
            parentId: category.id,
          }))
        : []),
    ]);

    categoriesData.categories.forEach((category) => {
      categoryMap.set(category.id, category.name);
      category.subcategories?.forEach((sub) => {
        categoryMap.set(sub.id, sub.name);
      });
    });

    return { categoryOptions, categoryMap };
  }, []);

  // Helper function to extract category IDs from traffic string
  const extractCategoryIds = (traffic: string): number[] => {
    const match = traffic.match(/{([^}]+)}/);
    return match ? match[1].split(" ").map(Number) : [];
  };

  // Function to get category names from IDs using the preprocessed categoryMap
  const getCategoryNames = (categoryIds: number[]): string[] => {
    return categoryIds.map((id) => categoryMap.get(id) || "Unknown");
  };

  // Helper function to truncate category list
  const truncateCategoryNames = (
    categoryNames: string[],
    maxLength: number = 3
  ) => {
    if (categoryNames.length > maxLength) {
      return [...categoryNames.slice(0, maxLength), "..."];
    }
    return categoryNames;
  };

  const renderCategoriesWithTooltip = (categoryNames: string[]) => {
    const categoryText = categoryNames.join(", ");
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="tooltip-categories">{categoryText}</Tooltip>}
      >
        <span>{truncateCategoryNames(categoryNames).join(", ")}</span>
      </OverlayTrigger>
    );
  };

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
        if (day !== "time_zone" && timeRanges[0] !== "") {
          console.log(timeRanges);

          // Create a list of ranges
          const ranges = (timeRanges as string[]).reduce(
            (result, time, index, arr) => {
              if (time && index % 2 === 0) {
                result.push({ start: time, end: arr[index + 1] });
              }
              return result;
            },
            [] as { start: string; end: string }[]
          );

          const timeToMinutes = (time: string) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
          };

          // Sort ranges by start time
          ranges.sort(
            (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
          );

          // Merge overlapping ranges
          const mergedRanges = [];
          let currentStart = ranges[0].start;
          let currentEnd = ranges[0].end;

          for (let i = 1; i < ranges.length; i++) {
            const { start, end } = ranges[i];
            if (timeToMinutes(start) <= timeToMinutes(currentEnd)) {
              // Overlapping or touching ranges, merge them
              currentEnd =
                timeToMinutes(end) > timeToMinutes(currentEnd)
                  ? end
                  : currentEnd;
            } else {
              // No overlap, push the previous range and start a new one
              mergedRanges.push(`${currentStart}-${currentEnd}`);
              currentStart = start;
              currentEnd = end;
            }
          }

          // Push the last merged range
          mergedRanges.push(`${currentStart}-${currentEnd}`);

          // Join the merged ranges into a string and assign to the accumulator
          acc[day as keyof PolicyFormData["schedule"]] = mergedRanges.join(",");
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
        reset(); // Clears the form
        setScheduleFormOpen(false);
        setDays(defDays);
        handleCategoryChange([]);
      })
      .catch((error: any) => {
        setError(error.message || "Failed to create policy");
      });
  };

  return (
    <div className="container">
      <h1 className="mb-4">Cloudflare Policies</h1>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-4">
        <h2>Policies</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => {
              const categoryIds = extractCategoryIds(policy.traffic);
              const categoryNames = getCategoryNames(categoryIds);
              return (
                <tr key={policy.id}>
                  <td>{policy.name}</td>
                  <td>{policy.action}</td>
                  <td>{renderCategoriesWithTooltip(categoryNames)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Create a New Policy</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
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
                />
                <div
                  className="border p-3 rounded"
                  style={{ minWidth: "450px" }}
                >
                  {Object.keys(days).map((day) => {
                    const dayKey = day as keyof PolicyFormData["schedule"];
                    if (dayKey === "time_zone") return null;
                    return (
                      <div key={dayKey} className="d-flex align-items-top mb-3">
                        <label className="form-label flex-shrink-0 w-25">
                          {dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}:
                        </label>
                        <div className="d-flex flex-column w-75">
                          {Array.isArray(days[dayKey]) &&
                            days[dayKey]?.map((_, index) => {
                              if (index % 2 === 0) {
                                return (
                                  <div key={index} className="d-flex mb-2">
                                    <input
                                      type="time"
                                      {...register(
                                        `schedule.${dayKey}.${index}` as const
                                      )}
                                      placeholder="Start Time"
                                      className="form-control me-2 w-50"
                                    />
                                    <input
                                      type="time"
                                      {...register(
                                        `schedule.${dayKey}.${
                                          index + 1
                                        }` as const
                                      )}
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
                            onClick={() => addTimeRange(dayKey)}
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

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PolicyManager;
