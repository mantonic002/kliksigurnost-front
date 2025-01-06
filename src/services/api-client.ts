import axios, {CanceledError} from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
})

apiClient.interceptors.request.use(
    (config) => {
        // Check if token exists in localStorage and add it to the Authorization header
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
export {CanceledError};