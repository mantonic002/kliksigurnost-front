import { OverlayTrigger, Tooltip } from "react-bootstrap";
import policyService from "../services/policy-service";
import { Policy, Schedule } from "../models/Policy";
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
    if (!schedule) return "No schedule";
    return Object.entries(schedule)
      .map(([day, timeRanges]) => {
        if (day === "time_zone" || timeRanges === null) return null;
        return `${day}: ${timeRanges}`;
      })
      .filter(Boolean)
      .join(" | ");
  };

  const renderCategoriesWithTooltip = (categoryNames: string[]) => {
    const categoryText = categoryNames.join(", ");
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="tooltip-categories">{categoryText}</Tooltip>}
      >
        <span>{categoryNames.slice(0, 3).join(", ")}{categoryNames.length > 3 ? ", ..." : ""}</span>
      </OverlayTrigger>
    );
  };

  const renderApplicationsWithTooltip = (applicationNames: string[]) => {
    const applicationText = applicationNames.join(", ");
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="tooltip-applications">{applicationText}</Tooltip>}
      >
        <span>{applicationNames.slice(0, 3).join(", ")}{applicationNames.length > 3 ? ", ..." : ""}</span>
      </OverlayTrigger>
    );
  };

  const handleDelete = async (policyId: string) => {
    try {
      await policyService.delete(policyId);
      onDelete(policyId);
    } catch (error) {
      console.error("Failed to delete policy:", error);
    }
  };

  return (
    <div className="table-container">
      {isLoading ? (
        <div className="spinner-border"></div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
              <th>Categories</th>
              <th>Applications</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => {
              const categoryIds = extractCategoryIds(policy.traffic);
              const categoryNames = getCategoryNames(categoryIds);
              const applicationIds = extractApplicationIds(policy.traffic);
              const applicationNames = getApplicationNames(applicationIds);
              const schedule = formatSchedule(policy.schedule);

              return (
                <tr key={policy.id}>
                  <td>{policy.name}</td>
                  <td>{policy.action}</td>
                  <td>{renderCategoriesWithTooltip(categoryNames)}</td>
                  <td>{renderApplicationsWithTooltip(applicationNames)}</td>
                  <td>{schedule}</td>
                  <td className="action">
                    <div className="action-icon" onClick={() => handleDelete(policy.id!)}>
                      <AiOutlineDelete className="action-red outlined" />
                      <AiFillDelete className="action-red filled" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};