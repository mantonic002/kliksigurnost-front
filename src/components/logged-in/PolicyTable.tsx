import { useState } from "react";
import policyService from "../../services/policy-service";
import { Policy, Schedule } from "../../models/Policy";
import { BsFillTrashFill, BsTrash } from "react-icons/bs";

interface PolicyTableProps {
  policies: Policy[];
  isLoading: boolean;
  categoryMap: Map<number, string>;
  applicationMap: Map<number, string>;
  onDelete: (policyId: string) => void;
}

export const PolicyTable = ({
  policies,
  isLoading,
  categoryMap,
  applicationMap,
  onDelete,
}: PolicyTableProps) => {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [deletingPolicyLoading, setdeletingPolicyLoading] =
    useState<String>("");

  const extractCategoryIds = (traffic: string): number[] => {
    const match = traffic.match(/{([^}]+)}/);
    return match ? match[1].split(" ").map(Number) : [];
  };

  const getCategoryNames = (categoryIds: number[]): string[] => {
    return categoryIds
      .filter((id) => categoryMap.has(id))
      .map((id) => categoryMap.get(id)!);
  };

  const extractApplicationIds = (traffic: string): number[] => {
    const appIdsMatch = traffic.match(/app.ids\[\*] in {([^}]+)}/);
    const appTypeIdsMatch = traffic.match(/app.type.ids\[\*] in {([^}]+)}/);
    const appIds = appIdsMatch ? appIdsMatch[1].split(" ").map(Number) : [];
    const appTypeIds = appTypeIdsMatch
      ? appTypeIdsMatch[1].split(" ").map(Number)
      : [];
    return [...appIds, ...appTypeIds];
  };

  const getApplicationNames = (appIds: number[]): string[] => {
    return appIds
      .filter((id) => applicationMap.has(id))
      .map((id) => applicationMap.get(id)!);
  };

  // Helper function to convert time to minutes
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Format time ranges the same way as in PolicyForm
  const formatTimeRanges = (timeRanges: string): string => {
    if (!timeRanges) return "";

    // Split the time ranges string into individual time slots
    const timeSlots = timeRanges.split(",").flatMap((range) => {
      if (range.includes("-")) {
        const [start, end] = range.split("-");
        const slots = [];
        let current = timeToMinutes(start);
        const endMinutes = timeToMinutes(end);

        while (current <= endMinutes) {
          const hours = Math.floor(current / 60)
            .toString()
            .padStart(2, "0");
          const minutes = (current % 60).toString().padStart(2, "0");
          slots.push(`${hours}:${minutes}`);
          current += 30; // Assuming 30-minute intervals as in PolicyForm
        }
        return slots;
      }
      return [range];
    });

    // Now format them the same way as in PolicyForm
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

    return ranges.join(", ");
  };

  const formatSchedule = (schedule: Schedule | undefined): string => {
    if (!schedule) return "";

    const dayNameMapping: Record<string, string> = {
      mon: "Ponedeljak",
      tue: "Utorak",
      wed: "Sreda",
      thu: "Četvrtak",
      fri: "Petak",
      sat: "Subota",
      sun: "Nedelja",
    };

    return Object.entries(schedule)
      .filter(([day]) => day !== "time_zone")
      .map(([day, timeRanges]) => {
        if (!timeRanges) return null;
        const formattedDay = dayNameMapping[day] || day;
        const formattedTime = formatTimeRanges(timeRanges);
        return formattedTime ? `${formattedDay}: ${formattedTime}` : null;
      })
      .filter(Boolean)
      .join(" | ");
  };

  const handleDelete = async (policyId: string) => {
    setdeletingPolicyLoading(policyId);
    try {
      await policyService.delete(policyId);
      onDelete(policyId);
    } catch (error) {
      console.error("Greška pri brisanju pravila:", error);
    }
  };

  const handleCardClick = (policy: Policy) => {
    setSelectedPolicy(policy);
  };

  const closeModal = () => {
    setSelectedPolicy(null);
  };

  if (isLoading) {
    return <div className="spinner-border"></div>;
  }

  return (
    <div className="card-container">
      {/* Default policy */}
      <div className="card card-disabled">
        <div className="text-danger-alert">Blokirano</div>

        <div className="card-item-overflow">
          <strong>Naziv:</strong> Virusi i pretnje
        </div>
        <div className="card-item-overflow">
          <strong>Kategorije:</strong> Virusi, Online prevare, Ostale pretnje
        </div>
      </div>

      {/* Other policies  */}
      {policies.map((policy) => {
        if (policy.action != "allow") {
          const categoryIds = extractCategoryIds(policy.traffic);
          const categoryNames =
            getCategoryNames(categoryIds).length > 0
              ? getCategoryNames(categoryIds).join(", ")
              : "";
          const applicationIds = extractApplicationIds(policy.traffic);
          const applicationNames =
            getApplicationNames(applicationIds).join(", ");
          const schedule = formatSchedule(policy.schedule);

          return (
            <div
              key={policy.id}
              className="card"
              onClick={() => handleCardClick(policy)}
            >
              {policy.action == "block" && (
                <div className="text-danger-alert">Blokirano</div>
              )}
              {policy.name && (
                <div className="card-item">
                  <strong>Naziv:</strong> {policy.name}
                </div>
              )}
              {categoryNames !== "" && (
                <div className="card-item">
                  <strong>Kategorije:</strong> {categoryNames}
                </div>
              )}
              {applicationNames !== "" && (
                <div className="card-item">
                  <strong>Aplikacije:</strong> {applicationNames}
                </div>
              )}
              {schedule && (
                <div className="card-item">
                  <strong>Raspored:</strong> ...
                </div>
              )}

              {!schedule && (
                <div className="card-item">
                  <strong>Raspored:</strong> Uvek aktivno
                </div>
              )}
              <div className="card-item actions">
                <div
                  className="action-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(policy.id!);
                  }}
                >
                  {policy.id !== deletingPolicyLoading ? (
                    <div className="icon-wrapper">
                      <BsTrash className="action-red outlined" size={24} />
                      <BsFillTrashFill
                        className="action-red filled"
                        size={24}
                      />
                    </div>
                  ) : (
                    <div className="action-red spinner-border"></div>
                  )}
                </div>
              </div>
            </div>
          );
        }
      })}

      {/* Modal for detailed view */}
      {selectedPolicy && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedPolicy.name}</h2>
              <button className="modal-close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-content">
              {selectedPolicy.action == "block" && (
                <div className="text-danger-alert">Blokirano</div>
              )}
              {selectedPolicy.action == "allow" && (
                <div className="text-success-alert">Dozvoljeno</div>
              )}
              {selectedPolicy.traffic &&
                (() => {
                  const categories = getCategoryNames(
                    extractCategoryIds(selectedPolicy.traffic)
                  );
                  const applications = getApplicationNames(
                    extractApplicationIds(selectedPolicy.traffic)
                  );

                  return (
                    <>
                      {categories.length > 0 && (
                        <p>
                          <strong>Kategorije:</strong> {categories.join(", ")}
                        </p>
                      )}
                      {applications.length > 0 && (
                        <p>
                          <strong>Aplikacije:</strong> {applications.join(", ")}
                        </p>
                      )}
                    </>
                  );
                })()}
              {selectedPolicy.schedule && (
                <div className="schedule-display card mt-3">
                  <div className="card-header">
                    <h6 className="mb-0">Raspored:</h6>
                  </div>
                  <div className="card-body">
                    <ul>
                      {Object.entries(selectedPolicy.schedule)
                        .filter(([day]) => day !== "time_zone")
                        .map(([day, timeRanges]) => {
                          if (!timeRanges) return null;
                          const formattedDay =
                            {
                              mon: "Ponedeljak",
                              tue: "Utorak",
                              wed: "Sreda",
                              thu: "Četvrtak",
                              fri: "Petak",
                              sat: "Subota",
                              sun: "Nedelja",
                            }[day] || day;
                          const formattedTime = formatTimeRanges(timeRanges);
                          return formattedTime ? (
                            <li key={day}>
                              <strong>{formattedDay}:</strong> {formattedTime}
                            </li>
                          ) : null;
                        })}
                      {selectedPolicy.schedule.time_zone && (
                        <li>
                          <small className="text-muted">
                            Vremenska zona: {selectedPolicy.schedule.time_zone}
                          </small>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
              {!selectedPolicy.schedule && (
                <p>
                  <strong>Raspored: </strong>Ovo pravilo je uvek aktivno!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
