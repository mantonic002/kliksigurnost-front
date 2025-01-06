import axios, {CanceledError} from "axios";

export default axios.create({
    baseURL: 'http://localhost:8080'
    //headers
})

export interface LoginRequest {
    email: number;
    name: string;
}

function login(entity:T) {
    return apiClient.post(this.endpoint + '/', entity)
}

export {CanceledError}