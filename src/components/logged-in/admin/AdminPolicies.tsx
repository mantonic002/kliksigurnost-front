import { Policy, Schedule } from "../../../models/Policy";
import { Spinner, Table } from "react-bootstrap";
import { useCategories } from "../useCategories";
import { useApplications } from "../useApplications";

interface AdminPoliciesProps {
  policies: Policy[];
  isLoading: boolean;
}

export const AdminPolicies = ({ policies, isLoading }: AdminPoliciesProps) => {
  const { categoryMap } = useCategories();
  const { applicationMap } = useApplications();

  const extractCategoryIds = (traffic: string): number[] => {
    const match = traffic.match(/{([^}]+)}/);
    return match ? match[1].split(" ").map(Number) : [];
  };

  const getCategoryNames = (categoryIds: number[]): string[] => {
    return categoryIds.map((id) => categoryMap.get(id) || "");
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
    return appIds.map((id) => applicationMap.get(id) || "");
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

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="container  mt-4">
      <Table bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
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
            const schedule = formatSchedule(policy.schedule);

            return (
              <tr key={policy.id}>
                <td>{policy.name || "N/A"}</td>
                <td>
                  {policy.action === "block" ? (
                    <span className="text-danger">Blokirano</span>
                  ) : (
                    <span className="text-success">Dozvoljeno</span>
                  )}
                </td>
                <td>{categoryNames.join(", ")}</td>
                <td>{applicationNames.join(", ")}</td>
                <td>{schedule || "Always active"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
