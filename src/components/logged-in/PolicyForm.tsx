import { useEffect, useState } from "react";
import Select from "react-select";
import { SchedulePicker } from "./SchedulePicker";
import { Policy } from "../../models/Policy";
import policyService from "../../services/policy-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { BsXLg } from "react-icons/bs";
import { useRequest } from "../../services/useRequest";
import {
  dayNameMapping,
  formatScheduleForBackend,
  isScheduleEmpty,
  createPolicyObject,
  formatTimeRanges,
} from "./policyHelpers";

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
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<number[]>(
    []
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formattedSchedule, setFormattedSchedule] = useState<
    Record<string, string>
  >({});

  const { handleSubmit, setValue, reset } = useForm<PolicyFormData>({
    resolver: zodResolver(schema),
  });

  const { isLoading, sendRequest } = useRequest();

  const updateScheduleForm = (newSchedule: {
    [key: string]: string[] | string;
  }) => {
    const convertedSchedule = Object.entries(newSchedule).reduce(
      (acc: Record<string, string[] | string>, [day, timeSlots]) => {
        const englishDay = dayNameMapping[day] || day;
        acc[englishDay] = timeSlots;
        return acc;
      },
      {} as Record<string, string[] | string>
    );
    setValue("schedule", convertedSchedule);
  };

  const updateScheduleDisplay = (newSchedule: {
    [key: string]: string[] | string;
  }) => {
    const formatted = Object.entries(newSchedule).reduce(
      (acc: Record<string, string>, [day, timeSlots]) => {
        if (day === "time_zone") {
          acc[day] = timeSlots as string;
        } else if (Array.isArray(timeSlots) && timeSlots.length > 0) {
          acc[day] = formatTimeRanges(timeSlots);
        }
        return acc;
      },
      {}
    );
    setFormattedSchedule(formatted);
  };

  const updateSchedule = (newSchedule: {
    [key: string]: string[] | string;
  }) => {
    updateScheduleForm(newSchedule);
    updateScheduleDisplay(newSchedule);
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

  const onSubmit = (data: PolicyFormData) => {
    const formattedScheduleReq = formatScheduleForBackend(data.schedule);

    const trafficString: string[] = [];
    if (data.trafficCategories) trafficString.push(data.trafficCategories);
    if (data.trafficApplications) trafficString.push(data.trafficApplications);

    const policy = createPolicyObject(
      "block",
      trafficString.join(" or "),
      isScheduleEmpty(formattedScheduleReq)
        ? undefined
        : {
            ...formattedScheduleReq,
            time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
    );

    sendRequest(async () => {
      await policyService.post<Policy>(policy);
      setNewPolicies();
      reset();
      setSelectedCategories([]);
      setSelectedApplications([]);
      setIsFormOpen(false);
      toast.success("Pravilo uspešno kreirano!");
    });
  };

  const setNewPolicies = () => {
    const { req } = policyService.getAll<Policy>();
    req
      .then((res) => {
        setPolicies(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.message ||
            "Neuspešno učitavanje pravila. Molimo pokušajte kasnije"
        );
      });
  };

  useEffect(() => {
    if (!isFormOpen) {
      reset();
      setFormattedSchedule({});
    }
  }, [isFormOpen]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <FaPlus className="mb-1" /> Novo pravilo
      </button>
      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Kreirajte novo pravilo</h5>
              <BsXLg onClick={() => setIsFormOpen(false)} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
              <div className="mb-3">
                <label className="form-label">Kategorije:</label>
                <Select
                  isMulti
                  name="categories"
                  options={categoryOptions}
                  onChange={handleCategoryChange}
                  placeholder="Izaberite"
                  closeMenuOnSelect={false}
                  value={categoryOptions.filter((option) =>
                    selectedCategories.includes(option.value)
                  )}
                  getOptionLabel={(e) => e.label}
                  getOptionValue={(e) => String(e.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Aplikacije:</label>
                <Select
                  isMulti
                  name="applications"
                  options={applicationOptions}
                  onChange={handleApplicationChange}
                  placeholder="Izaberite"
                  closeMenuOnSelect={false}
                  value={applicationOptions.filter((option) =>
                    selectedApplications.includes(option.value)
                  )}
                  getOptionLabel={(e) => e.label}
                  getOptionValue={(e) => String(e.value)}
                />
              </div>

              <SchedulePicker onChange={updateSchedule} />

              {Object.keys(formattedSchedule).length > 0 && (
                <div className="schedule-display">
                  <h6>Izabrani raspored:</h6>
                  <ul>
                    {Object.entries(formattedSchedule).map(([day, time]) => (
                      <li key={day}>
                        {day !== "time_zone" && (
                          <strong>{day.toUpperCase()}:</strong>
                        )}
                        {time}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-success"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner-border"></div>
                ) : (
                  <>Sačuvaj</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
