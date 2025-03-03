import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AppointmentService from '../services/AppointmentService';
import { useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            const date = selectedDate.toISOString().split('T')[0];
            AppointmentService.getFreeTimeslots(date)
                .then((res) => {
                    // Convert UTC times to local time
                    const localSlots = res.map((slot) => {
                        const utcDate = new Date(slot);
                        return new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000).toString();
                    });
                    setAvailableSlots(localSlots);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchAvailableSlots();
    }, [selectedDate]);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!selectedDate) {
            alert("Please select a date and time.");
            return;
        }
        
        const appointment = {
            appointmentDateTime: selectedDate.toISOString(),
        };
        

        AppointmentService.createAppointment(appointment)
            .then(() => {
                navigate('/home');
            })
            .catch((error) => {
                console.error("Failed to schedule appointment:", error);
            });
    };

    // Convert available slots to Date objects for easier comparison
    const availableSlotDates = availableSlots.map((slot) => new Date(slot));

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Date and Time:</label>
                <DatePicker
                    className="form-control"    
                    selected={selectedDate}
                    onChange={(date) => date ? setSelectedDate(date) : {}}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    filterTime={(time) => {
                        return availableSlotDates.some(
                            (slot) => slot.getTime() === time.getTime()
                        );
                    }}
                    required
                />
            </div>
            <button 
                type="submit" 
                className="btn btn-primary"
                >
                    Schedule Appointment
            </button>
        </form>
    );
};

export default AppointmentForm;