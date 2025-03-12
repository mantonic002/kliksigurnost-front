import { useState } from "react";
import Select from "react-select";
import { Policy } from "../../models/Policy";
import policyService from "../../services/policy-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import predefinedPolicies from "../../data/predefined-policies.json";

const schema = z.object({
  trafficApplications: z.string().optional(),
  trafficCategories: z.string().optional(),
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

  const { handleSubmit, setValue, reset } = useForm<PolicyFormData>({
    resolver: zodResolver(schema),
  });

  // Handle policy selection
  const handlePolicyChange = (selectedOption: SelectOption | null) => {
    setSelectedPolicy(selectedOption);

    if (selectedOption) {
      const policy = predefinedPolicies.find(
        (p) => p.name === selectedOption.label
      );

      if (policy) {
        // Generate traffic strings for categories and applications
        const trafficCategories = `any(dns.content_category[*] in {${policy.categories.join(
          " "
        )}})`;
        const trafficApplications = policy.applications
          .map((appId) => `any(app.ids[*] in {${appId}})`)
          .join(" or ");

        // Set form values
        setValue("trafficCategories", trafficCategories);
        setValue("trafficApplications", trafficApplications);
      }
    }
  };

  // Handle form submission
  const onSubmit = (data: PolicyFormData) => {
    const trafficString: string[] = [];
    if (data.trafficCategories) {
      trafficString.push(data.trafficCategories);
    }
    if (data.trafficApplications) {
      trafficString.push(data.trafficApplications);
    }

    const policy: Policy = {
      action: "block",
      traffic: trafficString.join(" or "),
    };

    policyService
      .post<Policy>(policy)
      .then(() => {
        const { req } = policyService.getAll<Policy>();
        return req;
      })
      .then((res) => {
        setPolicies(res.data);
        reset();
        setSelectedPolicy(null);
      })
      .catch((error: any) => {
        alert(error.message || "Failed to create policy");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="inline-form">
          <label className="form-label">Predefined Policies:</label>
          <Select
            className="form-control"
            name="predefinedPolicies"
            options={predefinedPolicies.map((policy, index) => ({
              value: index,
              label: policy.name,
            }))}
            onChange={handlePolicyChange}
            value={selectedPolicy}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => String(e.value)}
          />

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
