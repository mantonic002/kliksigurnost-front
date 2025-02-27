import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import authService from "../services/auth-service";
import Cookies from 'js-cookie';

const OAuthSuccess = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    if (accessToken && refreshToken) {
      authService.loginGoogle(accessToken, refreshToken);

      login();

      // Clear cookies (optional, depending on your security requirements)
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      // Redirect to the desired page
      navigate("/home");
    }
  }, [login, navigate]);

  return null;
};

export default OAuthSuccess;