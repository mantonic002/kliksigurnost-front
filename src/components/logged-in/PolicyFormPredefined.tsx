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
import { BsInfoCircleFill, BsXLg } from "react-icons/bs";
import { useRequest } from "../../services/useRequest";
import { Alert } from "react-bootstrap";
import { SchedulePicker } from "./SchedulePicker";

const dayNameMapping: Record<string, string> = {
  pon: "mon",
  uto: "tue",
  sre: "wed",
  čet: "thu",
  pet: "fri",
  sub: "sat",
  ned: "sun",
};

const schema = z.object({
  action: z.string(),
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
    // Convert Serbian day names to English
    const convertedSchedule = Object.entries(newSchedule).reduce(
      (acc: Record<string, string[] | string>, [day, timeSlots]) => {
        const englishDay = dayNameMapping[day] || day;
        acc[englishDay] = timeSlots;
        return acc;
      },
      {} as Record<string, string[] | string>
    );

    setValue("schedule", convertedSchedule);

    // Update display format
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

  const handlePolicyChange = (selectedOption: SelectOption | null) => {
    setSelectedPolicy(selectedOption);

    if (selectedOption) {
      const policy = predefinedPolicies.find(
        (p) => p.name === selectedOption.label
      );
      if (policy && policy.name !== "Youtube") {
        const trafficCategories = `any(dns.content_category[*] in {${policy.categories.join(
          " "
        )}})`;
        const trafficApplications = policy.applications
          .map((appId) => `any(app.ids[*] in {${appId}})`)
          .join(" or ");

        setValue("trafficCategories", trafficCategories);
        setValue("trafficApplications", trafficApplications);
        setValue("action", "block");
      } else {
        setValue("action", "ytrestricted");
      }
    }
  };

  const onSubmit = (data: PolicyFormData) => {
    const trafficString: string[] = [];
    if (data.trafficCategories) {
      trafficString.push(data.trafficCategories);
    }
    if (data.trafficApplications) {
      trafficString.push(data.trafficApplications);
    }

    // Format the schedule for the backend
    const formattedScheduleReq = Object.entries(data.schedule || {}).reduce(
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

    const isScheduleEmpty = Object.entries(formattedScheduleReq)
      .filter(([key]) => key !== "time_zone")
      .every(([_, value]) => value === "" || value === null);

    const policy: Policy = {
      action: data.action,
      traffic: trafficString.join(" or "),
      ...(!isScheduleEmpty && {
        schedule: {
          ...formattedScheduleReq,
          time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
    };

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
              <h5>Izaberite predefinisano pravilo</h5>
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
            <Alert>
              <BsInfoCircleFill size={30} className="me-2" />
              <strong>YouTube pravilo</strong>
              <p>
                Ovo pravilo ograničava prikaz sadržaja YouTube-a na video snimke
                koji su označeni kao pogodni za sve uzraste. Blokira video
                zapise sa eksplicitnim jezikom, nasiljem, odraslim sadržajem i
                slično.
                <hr></hr>
                <div className="disabled small">
                  Ovo pravilo je trenutno u testnoj fazi, pa u retkim
                  slučajevima možda neće raditi kao što je planirano.
                </div>
              </p>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};
