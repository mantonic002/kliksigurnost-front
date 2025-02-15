import apiClient from "./api-client";

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>() {
        const controller = new AbortController();
        const req = apiClient
        .get<T[]>(this.endpoint, {
            signal: controller.signal,
        })
        return {req, cancel: () => controller.abort()}
    }

    delete(id: string) {
        return apiClient.delete(this.endpoint + '/' + id);
    }

    post<T>(entity:T) {
        return apiClient.post(this.endpoint, entity)
    }
}

const create = (endpoint: string) => new HttpService(endpoint);
export default create;