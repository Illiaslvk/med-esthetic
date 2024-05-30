import React, { useState, useEffect } from 'react';
import { request } from '../../Pages/api/axios_helper';
import { toast } from 'react-toastify';
import './AdminProfile.css';

const CancelledAppointments = () => {
    const [cancelledAppointments, setCancelledAppointments] = useState([]);

    useEffect(() => {
        fetchCancelledAppointments();
    }, []);

    const fetchCancelledAppointments = async () => {
        try {
            const response = await request('GET', '/appointments/canceled');
            if (response.status === 200) {
                setCancelledAppointments(response.data);
            } else {
                toast.error('Failed to fetch cancelled appointments');
            }
        } catch (error) {
            console.error('Error fetching cancelled appointments:', error.message);
            toast.error('Failed to fetch cancelled appointments');
        }
    };

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            const response = await request('DELETE', `/appointments/delete/${appointmentId}`);
            if (response.status === 200) {
                toast.success('Appointment deleted successfully');
                fetchCancelledAppointments();
            } else {
                toast.error('Failed to delete appointment');
            }
        } catch (error) {
            console.error('Error deleting appointment:', error.message);
            toast.error('Failed to delete appointment');
        }
    };

    return (
        <div className="cancelled-appointments">
            <h1>Cancelled Appointments</h1>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Employee</th>
                        <th>User</th>
                        <th>Reason</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cancelledAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.empName}</td>
                            <td>{appointment.userEmail}</td>
                            <td>{appointment.cancellationReason}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CancelledAppointments;
