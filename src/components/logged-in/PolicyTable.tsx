import { useState } from "react";
import policyService from "../../services/policy-service";
import { Policy, Schedule } from "../../models/Policy";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

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

  const extractCategoryIds = (traffic: string): number[] => {
    const match = traffic.match(/{([^}]+)}/);
    return match ? match[1].split(" ").map(Number) : [];
  };

  const getCategoryNames = (categoryIds: number[]): string[] => {
    return categoryIds.map((id) => categoryMap.get(id) || "Unknown");
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
    return appIds.map((id) => applicationMap.get(id) || "Unknown");
  };

  const formatSchedule = (schedule: Schedule | undefined): string => {
    if (!schedule) return "";
    return Object.entries(schedule)
      .map(([day, timeRanges]) => {
        if (day === "time_zone" || timeRanges === null) return null;
        return `${day}: ${timeRanges}`;
      })
      .filter(Boolean)
      .join(" | ");
  };

  const handleDelete = async (policyId: string) => {
    try {
      await policyService.delete(policyId);
      onDelete(policyId);
    } catch (error) {
      console.error("Failed to delete policy:", error);
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
      {policies.map((policy) => {
        const categoryIds = extractCategoryIds(policy.traffic);
        const categoryNames = getCategoryNames(categoryIds);
        const applicationIds = extractApplicationIds(policy.traffic);
        const applicationNames = getApplicationNames(applicationIds);
        const schedule = formatSchedule(policy.schedule);

        return (
          <div
            key={policy.id}
            className="card"
            onClick={() => handleCardClick(policy)}
          >
            {policy.name && (
              <div className="card-item">
                <strong>Name:</strong> {policy.name}
              </div>
            )}
            {policy.action && (
              <div className="card-item">
                <strong>Action:</strong> {policy.action}
              </div>
            )}
            {categoryNames.length > 0 && (
              <div className="card-item">
                <strong>Categories:</strong> {categoryNames.join(", ")}
              </div>
            )}
            {applicationNames.length > 0 && (
              <div className="card-item">
                <strong>Applications:</strong> {applicationNames.join(", ")}
              </div>
            )}
            {schedule && (
              <div className="card-item">
                <strong>Schedule:</strong> {schedule}
              </div>
            )}
            <div className="card-item actions">
              <div
                className="action-icon"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  handleDelete(policy.id!);
                }}
              >
                <div className="icon-wrapper">
                  <AiOutlineDelete className="action-red outlined" size={24} />
                  <AiFillDelete className="action-red filled" size={24} />
                </div>
              </div>
            </div>
          </div>
        );
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
              {selectedPolicy.action && (
                <p>
                  <strong>Action:</strong> {selectedPolicy.action}
                </p>
              )}
              {selectedPolicy.traffic && (
                <>
                  <p>
                    <strong>Categories:</strong>{" "}
                    {getCategoryNames(
                      extractCategoryIds(selectedPolicy.traffic)
                    ).join(", ")}
                  </p>
                  <p>
                    <strong>Applications:</strong>{" "}
                    {getApplicationNames(
                      extractApplicationIds(selectedPolicy.traffic)
                    ).join(", ")}
                  </p>
                </>
              )}
              {selectedPolicy.schedule && (
                <p>
                  <strong>Schedule:</strong>{" "}
                  {formatSchedule(selectedPolicy.schedule)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
