import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import authService from "../../services/auth-service";
import Cookies from "js-cookie";

const OAuthSuccess = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const accessToken = Cookies.get("access_token");
      const refreshToken = Cookies.get("refresh_token");

      if (accessToken && refreshToken) {
        try {
          await authService.loginGoogle(accessToken, refreshToken);
          await login();

          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          navigate("/home");
        } catch (error) {
          navigate("/login");
        }
      }
    };

    handleAuth();
  }, [login, navigate]);

  return null;
};

export default OAuthSuccess;
