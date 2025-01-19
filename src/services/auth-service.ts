import apiClient from "./api-client";

class AuthService {
    constructor() {
        // Ensure the token is set when the app initializes
        this.setTokenToApiClient(localStorage.getItem('token'));
    }

    async register(email: string, password: string) {
        try {
            const response = await apiClient.post('/api/auth/register', {
                email,
                password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                this.setTokenToApiClient(response.data.token);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await apiClient.post('/api/auth/authenticate', {
                email,
                password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                this.setTokenToApiClient(response.data.token);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    loginGoogle(token: string) {
        if (token) {
            localStorage.setItem('token', token);
            this.setTokenToApiClient(token);
        }
    }

    logout() {
        localStorage.removeItem('token');
    }

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    // Set token to apiClient's headers
    setTokenToApiClient(token: string | null) {
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
