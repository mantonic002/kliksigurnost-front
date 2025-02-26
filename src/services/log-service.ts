import { Log } from "../models/Logs";
import apiClient from "./api-client";

class LogService {
  async getLogs(params: {
    startDateTime: string;
    endDateTime: string;
    page: number;
    pageSize: number;
    lastDateTime?: string;
    lastPolicyId?: string;
    direction: 'next' | 'prev';
  }): Promise<Log[]> {
    const response = await apiClient.get('/policies/userLogs', {
      params: { ...params }
    });
    return response.data;
  }
}

export default new LogService();
