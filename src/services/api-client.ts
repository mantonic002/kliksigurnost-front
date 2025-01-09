import axios, {CanceledError} from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
})

export default apiClient;
export {CanceledError};