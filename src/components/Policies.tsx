import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import policyService, { Policy } from "../services/policy-service";
import { AxiosResponse, CanceledError } from "axios";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  action: z.string().min(1, { message: "Action is required" }),
  traffic: z.string().min(1, { message: "Traffic is required" }),
});

type PolicyFormData = z.infer<typeof schema>;



function PolicyManager() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<PolicyFormData>({ resolver: zodResolver(schema) });

  // Fetch policies on component mount
  useEffect(() => {
    setIsLoading(true);
    const { req, cancel } = policyService.getAll<Policy>()
      req.then((res) => {
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

  // Handle form submission
  const onSubmit = (data: PolicyFormData) => {
    policyService
      .post<PolicyFormData>(data)
      .then(() => {
        const { req } = policyService.getAll<Policy>();
        return req;
      })
      .then((res) => {
        setPolicies(res.data);
      })
      .catch((error: any) => {
        setError(error.message || "Failed to create policy");
      });
  };

  return (
    <div className="container">
      <h1>Cloudflare Policies</h1>

      {/* Display Error Messages */}
      {error && <p className="text-danger">{error}</p>}

      {/* Policies List */}
      <div>
        <h2>Policies</h2>
        <ul>
          {policies.map((policy) => (
            <li key={policy.id}>
              <strong>{policy.name}</strong> - {policy.action} - {policy.traffic}
            </li>
          ))}
        </ul>
      </div>

      {/* Policy Form */}
      <div>
        <h2>Create a New Policy</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input {...register("name")} id="name" className="form-control" />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="action" className="form-label">Action:</label>
            <input {...register("action")} id="action" className="form-control" />
            {errors.action && <p className="text-danger">{errors.action.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="traffic" className="form-label">Traffic:</label>
            <input {...register("traffic")} id="traffic" className="form-control" />
            {errors.traffic && <p className="text-danger">{errors.traffic.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary">Create Policy</button>
        </form>
      </div>
    </div>
  );
}

export default PolicyManager;
