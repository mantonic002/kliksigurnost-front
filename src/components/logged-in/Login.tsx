import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../../services/auth-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AiFillGoogleCircle } from "react-icons/ai";

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
        login();
        navigate("/home");
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
        {err && <p className="text-danger">Pogrešan email ili lozinka</p>}

        <button id="submit" type="submit" className="btn btn-primary m-3">
          Potvrdi
        </button>
        <hr></hr>
        <div className="m-3">
          <button onClick={googleLogin} className="btn btn-success">
            <AiFillGoogleCircle size={25} /> Prijavite se pomoću google naloga
          </button>
        </div>

        <div className="m-3">
          <a href="/register" onClick={() => navigate("/register")}>
            Kreirajte novi nalog
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
