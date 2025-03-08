import { useState } from "react";
import Select from "react-select";
import { SchedulePicker } from "./SchedulePicker";
import { Policy } from "../../models/Policy";
import policyService from "../../services/policy-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AiOutlineClose } from "react-icons/ai";

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
  categoryOptions: SelectOption[];
  applicationOptions: SelectOption[];
  setPolicies: React.Dispatch<React.SetStateAction<Policy[]>>;
}

export const PolicyForm = ({
  categoryOptions,
  applicationOptions,
  setPolicies,
}: PolicyFormProps) => {
  const [_, setSchedule] = useState<{ [key: string]: string[] | string }>({});
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<number[]>(
    []
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { handleSubmit, setValue, reset } = useForm<PolicyFormData>({
    resolver: zodResolver(schema),
  });

  const updateSchedule = (newSchedule: {
    [key: string]: string[] | string;
  }) => {
    setSchedule(newSchedule);
    setValue("schedule", newSchedule);
  };

  const handleCategoryChange = (selectedOptions: readonly SelectOption[]) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    const updatedCategories = new Set(selectedIds);

    categoryOptions.forEach((option) => {
      if (option.parentId && selectedIds.includes(option.parentId)) {
        updatedCategories.add(option.value);
      }
    });

    const selectedCategoryArray = Array.from(updatedCategories);
    setSelectedCategories(selectedCategoryArray);

    if (selectedCategoryArray.length > 0) {
      const trafficString = `any(dns.content_category[*] in {${selectedCategoryArray.join(
        " "
      )}})`;
      setValue("trafficCategories", trafficString);
    } else {
      setValue("trafficCategories", "");
    }
  };

  const handleApplicationChange = (
    selectedOptions: readonly SelectOption[]
  ) => {
    const updatedApplications = new Set<number>();
    const updatedApplicationTypes = new Set<number>();

    selectedOptions.forEach((option) => {
      if (option.parentId) {
        updatedApplications.add(option.value);
      } else {
        updatedApplicationTypes.add(option.value);
      }
    });

    applicationOptions.forEach((option) => {
      if (option.parentId && updatedApplicationTypes.has(option.parentId)) {
        updatedApplications.add(option.value);
      }
    });

    const selectedApplicationTypesArray = Array.from(updatedApplicationTypes);
    const selectedApplicationsArray = Array.from(updatedApplications);

    const selectedApplicationsNotInAppTypesArray = Array.from(
      updatedApplications
    ).filter((appId) => {
      const option = applicationOptions.find(
        (option) => option.value === appId
      );
      return (
        option &&
        option.parentId &&
        !selectedApplicationTypesArray.includes(option.parentId)
      );
    });

    setSelectedApplications([
      ...selectedApplicationsArray,
      ...selectedApplicationTypesArray,
    ]);

    let trafficString = "";

    const appsNotInTypes =
      selectedApplicationsNotInAppTypesArray.length > 0
        ? `any(app.ids[*] in {${selectedApplicationsNotInAppTypesArray.join(
            " "
          )}})`
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

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const formatTimeRanges = (timeSlots: string[]) => {
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

  const onSubmit = (data: PolicyFormData) => {
    const formattedSchedule = Object.entries(data.schedule || {}).reduce(
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

    const isScheduleEmpty = Object.entries(formattedSchedule)
      .filter(([key]) => key !== "time_zone")
      .every(([_, value]) => value === "" || value === null);

    const formData = {
      ...data,
      ...(isScheduleEmpty
        ? { schedule: undefined }
        : {
            schedule: {
              ...formattedSchedule,
              time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
          }),
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
        setIsFormOpen(false);
      })
      .catch((error: any) => {
        alert(error.message || "Failed to create policy");
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        New policy
      </button>
      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Create new policy</h5>
              <AiOutlineClose onClick={() => setIsFormOpen(false)} />
            </div>
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
        </div>
      )}
    </>
  );
};
