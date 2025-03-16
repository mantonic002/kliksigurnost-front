import apiClient from "./api-client";
import { jwtDecode } from "jwt-decode";

class AuthService {
  async register(email: string, password: string) {
    try {
      const response = await apiClient.post("/auth/register", {
        email,
        password,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await apiClient.post("/auth/authenticate", {
        email,
        password,
      });
      if (response.data.token && response.data.refreshToken) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        this.setEmailFromToken();
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  loginGoogle(token: string, refreshToken: string) {
    if (token && refreshToken) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.setEmailFromToken();
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getEmail() {
    return localStorage.getItem("email");
  }

  getRole() {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.role || "USER";
      } catch (error) {
        return "USER";
      }
    }
    return "USER";
  }

  setEmailFromToken() {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const email = decoded.email;
        if (email) {
          console.log("email:", email);
          localStorage.setItem("email", email);
        } else {
          console.warn("Email not found in token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
      }
    }
  }
}

export default new AuthService();
