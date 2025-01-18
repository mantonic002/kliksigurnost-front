import apiClient from "./api-client";

class AuthService {
    async register(email: string, password: string) {
        try {
            const response = await apiClient.post('/api/auth/register', {
                email,
                password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                this.setTokenToApiClient(response.data.token)
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
                this.setTokenToApiClient(response.data.token)
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    loginGoogle(token: string) {
        if (token) {
            localStorage.setItem('token', token);
            this.setTokenToApiClient(token)
        }
    }


    logout() {
        localStorage.removeItem('token');
        apiClient.interceptors.request.use(
          (config) => {
            delete config.headers['Authorization'];
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
      }
      

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

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