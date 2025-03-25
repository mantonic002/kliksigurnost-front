import axios, { CanceledError } from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Separate instance for auth-related requests to avoid sending the expired token
const authClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Add request interceptor to set the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Make the refresh request using authClient (which doesn't have Authorization headers)
          const response = await authClient.post("/auth/refresh", {
            refreshToken,
          });
          const newAccessToken = response.data.token;
          localStorage.setItem("token", newAccessToken);

          // Update the authorization header for future requests
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiClient(originalRequest);
        } catch (err) {
          // Handle refresh token failure (e.g., logout the user)
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/prijava";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { CanceledError };
