import { Appointment } from "../models/Appointment";
import { ContactFormMessage } from "../models/ContactFormMessage";
import { CloudflareAccount, UserProfile } from "../models/UserProfile";
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

  async getAllAccounts(): Promise<CloudflareAccount[]> {
    try {
      const response = await apiClient.get<CloudflareAccount[]>(
        "/admin/accounts"
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAppointments(params: {
    start: string;
    end: string;
  }): Promise<Appointment[]> {
    try {
      const response = await apiClient.get<Appointment[]>(
        "/admin/appointments",
        {
          params: { ...params },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async setupAccount(data: {
    accountId: string;
    email: string;
    organizationName: string;
    authorizationToken: string;
  }): Promise<void> {
    try {
      await apiClient.post("/admin/accounts/setup", data);
    } catch (error) {
      throw error;
    }
  }

  async switchUserLock(userId: number): Promise<UserProfile> {
    try {
      const response = await apiClient.put<UserProfile>(
        `/admin/users/lock/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllMessages(): Promise<ContactFormMessage[]> {
    try {
      const response = await apiClient.get<ContactFormMessage[]>(
        "/admin/contact"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all contact messages:", error);
      throw error;
    }
  }

  async getPendingMessages(): Promise<ContactFormMessage[]> {
    try {
      const response = await apiClient.get<ContactFormMessage[]>(
        "/admin/contact/pending"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching pending contact messages:", error);
      throw error;
    }
  }

  async resolveMessage(id: number): Promise<ContactFormMessage> {
    try {
      const response = await apiClient.put<ContactFormMessage>(
        `/admin/contact/resolve/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error resolving contact message ${id}:`, error);
      throw error;
    }
  }
}

export default new AdminService();
