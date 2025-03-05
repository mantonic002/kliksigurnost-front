import { Appointment } from "../models/Appointment";
import apiClient from "./api-client";

class AppointmentService {
    async getAppointments(): Promise<Appointment[]> {
        try {
            const response = await apiClient.get<Appointment[]>(`/appointments`);
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getFreeTimeslots(date: string): Promise<string[]> {
        try {
            const response = await apiClient.get<string[]>(`/appointments/available?date=${date}`);
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteAppointment(appointmentId: number) {
        try {
            await apiClient.delete(`/appointments`+ '/' + appointmentId);
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
