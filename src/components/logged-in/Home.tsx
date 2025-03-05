import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import authService from "../../services/auth-service";

function Home() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      authService.loginGoogle(token);
      console.log(authService.getToken());
      login();
      navigate("/home");
    } else if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate, login]);

  return <div>Welcome</div>;
}

export default Home;
