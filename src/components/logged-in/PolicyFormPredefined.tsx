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

  const [isFormOpen, setIsFormOpen] = useState(false);

  const { handleSubmit, setValue, reset } = useForm<PolicyFormData>({
    resolver: zodResolver(schema),
  });

  const { isLoading, sendRequest } = useRequest();

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

    sendRequest(async () => {
      await policyService.post<Policy>(policy);
      setNewPolicies();
      reset();
      setSelectedPolicy(null);
      reset();
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
        alert(
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
              <div className="inline-form">
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
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
