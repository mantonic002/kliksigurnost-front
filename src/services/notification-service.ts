import apiClient from "./api-client";
import { Notification } from "../models/Notification";

class DeviceService {
    async getUnseenNotifications(): Promise<Notification[]> {
        try {
            const response = await apiClient.get<Notification[]>('/notifications/unseen');
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getUnseenNotificationCount(): Promise<number> {
        try {
            const response = await apiClient.get<number>('/notifications/unseenCount');
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default new DeviceService();
