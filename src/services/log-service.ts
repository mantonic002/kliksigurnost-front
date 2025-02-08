import { Log } from "../models/Logs";
import apiClient from "./api-client";

class LogService {
  async getLogs(startDateTime: string, endDateTime: string): Promise<Log[]> {
    try {
      const response = await apiClient.get<Log[]>('/api/policies/userLogs', {
        params: {
          startDateTime,
          endDateTime,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new LogService();
