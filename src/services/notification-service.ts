import apiClient from "./api-client";
import { Notification } from "../models/Notification";

class DeviceService {
    // Method to fetch devices
    async getUnseenNotifications(): Promise<Notification[]> {
        try {
            const response = await apiClient.get<Notification[]>('/api/notifications/unseen');
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default new DeviceService();
