import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import policyService from "../services/policy-service";
import { Policy } from "../models/Policy";
import { PolicyTable } from "./PolicyTable";
import { PolicyForm } from "./PolicyForm";
import { useCategories } from "./useCategories";
import { useApplications } from "./useApplications";
import { PredefinedPolicyForm } from "./PolicyFormPredefined";

function PolicyManager() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { categoryOptions, categoryMap } = useCategories();
  const { applicationOptions, applicationMap } = useApplications();

  const handleDelete = (policyId: string) => {
    setPolicies((prevPolicies) =>
      prevPolicies.filter((policy) => policy.id !== policyId)
    );
  };

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

  return (
    <div className="container">
      <h1 className="mb-5">Cloudflare Policies</h1>

      {error && <p className="text-danger">{error}</p>}


      <PolicyTable
        policies={policies}
        isLoading={isLoading}
        categoryMap={categoryMap}
        applicationMap={applicationMap}
        onDelete={handleDelete}
      />

      <PredefinedPolicyForm setPolicies={setPolicies} />

      <PolicyForm
        categoryOptions={categoryOptions}
        applicationOptions={applicationOptions}
        setPolicies={setPolicies}
      />
    </div>
  );
}

export default PolicyManager;
