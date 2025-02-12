import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface PolicyTableProps {
  policies: any[];
  isLoading: boolean;
  categoryMap: Map<number, string>;
  applicationMap: Map<number, string>;
}

export const PolicyTable = ({
  policies,
  isLoading,
  categoryMap,
  applicationMap,
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

  const formatSchedule = (schedule: any) => {
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

  return (
    <div>
      {isLoading ? (
        <div className="spinner-border"></div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Categories</th>
              <th>Applications</th>
              <th>Schedule</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => {
              const categoryIds = extractCategoryIds(policy.traffic);
              const categoryNames = getCategoryNames(categoryIds);
              const applicationIds = extractApplicationIds(policy.traffic);
              const applicationNames = getApplicationNames(applicationIds);
              const schedule = formatSchedule(policy.schedule || {});

              return (
                <tr key={policy.id}>
                  <td>{policy.name}</td>
                  <td>{policy.action}</td>
                  <td>{renderCategoriesWithTooltip(categoryNames)}</td>
                  <td>{renderApplicationsWithTooltip(applicationNames)}</td>
                  <td>{schedule}</td>
                </tr>
              );
            })}
          </tbody>
      </table>
      )}
    </div>
  );
};