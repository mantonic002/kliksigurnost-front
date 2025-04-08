import apiClient from "./api-client";

interface ContactFormData {
  name: string;
  userEmail: string;
  phoneNumber: string;
  message: string;
}

class ContactService {
  async submitForm(data: ContactFormData): Promise<void> {
    try {
      await apiClient.post<void>("/contact", data);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  }
}

export default new ContactService();
