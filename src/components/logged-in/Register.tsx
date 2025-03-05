import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../../services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const schema = z
  .object({
    email: z.string().email({ message: "Email nije validan" }),
    password: z
      .string()
      .min(5, { message: "Lozinka mora biti duža od 5 karaktera" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Lozinka mora biti duža od 5 karaktera" }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Lozinka nije ista u oba polja",
        path: ["confirmPassword"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

function Register() {
  const [err, setErr] = useState("");
  let navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    authService
      .register(data.email, data.password)
      .then(() => {
        console.log(authService.getToken());
        login();
        navigate("/home");
        //TODO: check for errors
      })
      .catch((error) => {
        setErr(error.message);
        console.log(err);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 "
      style={{ minWidth: "100vw" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-10 border p-3 rounded"
      >
        <div className="m-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            {...register("email")}
            id="email"
            type="text"
            className="form-control"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="m-3">
          <label htmlFor="password" className="form-label">
            Lozinka:
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

        <div className="m-3">
          <label htmlFor="confirm-password" className="form-label">
            Potvrdi lozinku:
          </label>
          <input
            {...register("confirmPassword")}
            id="confirm-password"
            type="password"
            className="form-control"
          />
          {errors.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>
        <button id="submit" type="submit" className="btn btn-primary m-3">
          Potvrdi
        </button>
        <div className="m-3">
          <a href="/login" onClick={() => navigate("/login")}>
            Vec imate nalog? Prijavite se.
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
