import { UserProfile } from "../models/UserProfile";
import apiClient from "./api-client";

class AdminService {
  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const response = await apiClient.get<UserProfile[]>("/admin/users");

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllAccounts(): Promise<UserProfile[]> {
    try {
      const response = await apiClient.get<UserProfile[]>("/admin/users");

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default new AdminService();
