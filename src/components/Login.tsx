import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
  password: z
    .string()
    .min(5, { message: "Password must be longer than 5 characters" }),
});

type FormData = z.infer<typeof schema>;

function Login() {
  const [err, setErr] = useState("");
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    authService
      .login(data.email, data.password)
      .then(() => {
        console.log(authService.getToken());
        navigate("/");
      })
      .catch((error) => {
        setErr(error.message);
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          {...register("email")}
          id="email"
          type="text"
          className="form-control"
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          className="form-control"
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>
      {err && <p className="text-danger">Wrong email or password</p>}

      <button id="submit" type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Login;
