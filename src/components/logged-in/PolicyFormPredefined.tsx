import { useState } from "react";
import Select from "react-select";
import { Policy } from "../../models/Policy";
import policyService from "../../services/policy-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import predefinedPolicies from "../../data/predefined-policies.json";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import { useRequest } from "../../services/useRequest";
import { SchedulePicker } from "./SchedulePicker";
import {
  dayNameMapping,
  formatTimeRanges,
  formatScheduleForBackend,
  isScheduleEmpty,
  createPolicyObject,
} from "./policyHelpers";

const schema = z.object({
  action: z.string(),
  trafficString: z.string().optional(),
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
};

interface PredefinedPolicyFormProps {
  setPolicies: React.Dispatch<React.SetStateAction<Policy[]>>;
}

export const PredefinedPolicyForm = ({
  setPolicies,
}: PredefinedPolicyFormProps) => {
  const [selectedPolicy, setSelectedPolicy] = useState<SelectOption | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formattedSchedule, setFormattedSchedule] = useState<
    Record<string, string>
  >({});

  const { handleSubmit, setValue, reset } = useForm<PolicyFormData>({
    resolver: zodResolver(schema),
  });

  const { isLoading, sendRequest } = useRequest();

  const updateSchedule = (newSchedule: {
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

    const formatted = Object.entries(convertedSchedule).reduce(
      (acc: Record<string, string>, [day, timeSlots]) => {
        if (day === "time_zone") {
          acc[day] = timeSlots as string;
        } else if (Array.isArray(timeSlots)) {
          acc[day] = formatTimeRanges(timeSlots);
        }
        return acc;
      },
      {}
    );
    setFormattedSchedule(formatted);
  };

  const handlePolicyChange = (selectedOption: SelectOption | null) => {
    setSelectedPolicy(selectedOption);

    if (selectedOption) {
      const policy = predefinedPolicies.find(
        (p) => p.name === selectedOption.label
      );
      if (policy) {
        const trafficParts = [];

        if (policy.categories.length > 0) {
          trafficParts.push(
            `any(dns.content_category[*] in {${policy.categories.join(" ")}})`
          );
        }

        if (policy.applicationTypes.length > 0) {
          trafficParts.push(
            `any(app.type.ids[*] in {${policy.applicationTypes.join(" ")}})`
          );
        }

        if (policy.applications.length > 0) {
          trafficParts.push(
            `any(app.ids[*] in {${policy.applications.join(" ")}})`
          );
        }

        const trafficString = trafficParts.join(" or ");

        setValue("trafficString", trafficString);
        setValue("action", "block");
      }
    }
  };

  const onSubmit = (data: PolicyFormData) => {
    const formattedScheduleReq = formatScheduleForBackend(data.schedule);
    const policy = createPolicyObject(
      data.action,
      data.trafficString,
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
      setSelectedPolicy(null);
      setFormattedSchedule({});
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

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <FaPlus className="mb-1" /> Predefinisana pravila
      </button>
      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Izaberite šta želite da blokirate:</h5>
              <BsXLg onClick={() => setIsFormOpen(false)} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
              <div className="mb-3">
                <Select
                  className="form-control"
                  name="predefinedPolicies"
                  options={predefinedPolicies.map((policy, index) => ({
                    value: index,
                    label: policy.name,
                  }))}
                  onChange={handlePolicyChange}
                  value={selectedPolicy}
                  placeholder="Izaberite"
                  getOptionLabel={(e) => e.label}
                  getOptionValue={(e) => String(e.value)}
                />
              </div>

              <SchedulePicker onChange={updateSchedule} />

              {Object.keys(formattedSchedule).length > 0 && (
                <div className="schedule-display mb-3">
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
