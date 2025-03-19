import { UserProfile } from "../models/UserProfile";
import apiClient from "./api-client";
import { jwtDecode } from "jwt-decode";

class AuthService {
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await apiClient.get("/auth/me");
      localStorage.setItem("profile", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      this.logout();
      throw error;
    }
  }

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
        const profile = await this.getProfile();
        localStorage.setItem("profile", JSON.stringify(profile));
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const response = await apiClient.post("/auth/forgot-password", {
        email,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const response = await apiClient.post("/auth/reset-password", {
        token,
        newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async loginGoogle(token: string, refreshToken: string) {
    if (token && refreshToken) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      const profile = await this.getProfile();
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }

  getProfileFromStorage(): UserProfile | null {
    const profile = localStorage.getItem("profile");
    return profile ? JSON.parse(profile) : null;
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
