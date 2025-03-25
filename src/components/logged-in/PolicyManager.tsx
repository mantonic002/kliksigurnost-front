import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import policyService from "../../services/policy-service";
import { Policy } from "../../models/Policy";
import { PolicyTable } from "./PolicyTable";
import { PolicyForm } from "./PolicyForm";
import { useCategories } from "./useCategories";
import { useApplications } from "./useApplications";
import { PredefinedPolicyForm } from "./PolicyFormPredefined";
import { toast } from "react-toastify";

function PolicyManager() {
  const [policies, setPolicies] = useState<Policy[]>([]);
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
        toast.error(
          error.message ||
            "Neuspešno učitavanje pravila. Molimo pokušajte kasnije"
        );
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

  return (
    <div className="container  mt-4">
      <h3 className="mb-4">Vaša pravila</h3>
      <div className="inline-form">
        <PolicyForm
          categoryOptions={categoryOptions}
          applicationOptions={applicationOptions}
          setPolicies={setPolicies}
        />

        <PredefinedPolicyForm setPolicies={setPolicies} />
      </div>
      <PolicyTable
        policies={policies}
        isLoading={isLoading}
        categoryMap={categoryMap}
        applicationMap={applicationMap}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default PolicyManager;
