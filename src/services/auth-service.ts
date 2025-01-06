import apiClient from "./api-client";

class AuthService {
    // Register method
    async register(email: string, password: string) {
        try {
            const response = await apiClient.post('/api/auth/register', {
                email,
                password,
            });
            // Store the JWT token in localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                this.setTokenToApiClient(response.data.token)
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Login method
    async login(email: string, password: string) {
        try {
            const response = await apiClient.post('/api/auth/authenticate', {
                email,
                password,
            });
            // Store the JWT token in localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                this.setTokenToApiClient(response.data.token)
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Logout method
    logout() {
        localStorage.removeItem('token');
    }

    // Check if user is authenticated by checking token in localStorage
    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    // Get token from localStorage
    getToken() {
        return localStorage.getItem('token');
    }

    setTokenToApiClient(token:string) {
        apiClient.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
}

export default new AuthService();