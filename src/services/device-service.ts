import { Device } from "../models/Device";
import apiClient from "./api-client";

class DeviceService {
    // Method to fetch devices
    async getDevices(): Promise<Device[]> {
        try {
            const response = await apiClient.get<Device[]>('/policies/devices');
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default new DeviceService();
