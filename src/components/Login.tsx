import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const schema = z.object({
  email: z.string().email({ message: "Email nije validan" }),
  password: z
    .string()
    .min(5, { message: "Lozinka mora biti duža od 6 karaktera" }),
});

type FormData = z.infer<typeof schema>;

function Login() {
  const [err, setErr] = useState("");
  let navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const googleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/authenticate/google";
  };

  const onSubmit = (data: FieldValues) => {
    authService
      .login(data.email, data.password)
      .then(() => {
        console.log(authService.getToken());
        login();
        navigate("/home");
      })
      .catch((error) => {
        setErr(error.message);
        console.log(err);
      });
  };

  return (
    <>
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
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
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
        {err && <p className="text-danger">Pogrešan email ili lozinka</p>}

        <button id="submit" type="submit" className="btn btn-primary">
          Potvrdi
        </button>
      </form>

      <button onClick={googleLogin} className="btn btn-success">
        Prijavite se pomoču google naloga
      </button>
      <div>
        <a href="/register" onClick={() => navigate("/register")}>
          Kreirajte novi nalog
        </a>
      </div>
    </>
  );
}

export default Login;
