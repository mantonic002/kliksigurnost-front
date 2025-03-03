import { Appointment } from "../models/Appointment";
import apiClient from "./api-client";

class AppointmentService {
    async getFreeTimeslots(date: string): Promise<string[]> {
        try {
            const response = await apiClient.get<string[]>(`/appointments/available?date=${date}`);
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createAppointment(appointment: Appointment): Promise<Appointment> {
        try {
            const response = await apiClient.post<Appointment>(`/appointments`, appointment);
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default new AppointmentService();
