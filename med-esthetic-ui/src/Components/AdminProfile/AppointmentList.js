import React, { useState, useEffect } from 'react';
import { request } from '../../Pages/api/axios_helper';
import { toast } from 'react-toastify';
import './AdminProfile.css';
import CancelAppointmentForm from './Forms/CancelAppointmentForm';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [cancelReason, setCancelReason] = useState('');
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [isCancelFormVisible, setIsCancelFormVisible] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await request('GET', '/appo/all');
            if (response.status === 200) {
                setAppointments(response.data);
            } else {
                toast.error('Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error.message);
            toast.error('Failed to fetch appointments');
        }
    };

    const handleCancelReasonChange = (event) => {
        setCancelReason(event.target.value);
    };

    const handleCancelAppointment = (appointmentId) => {
        setSelectedAppointmentId(appointmentId);
        setIsCancelFormVisible(true);
    };

    const handleCancel = () => {
        setIsCancelFormVisible(false);
        setSelectedAppointmentId(null);
        setCancelReason('');
    };

    const confirmCancelAppointment = async () => {
        try {
            const response = await request('POST', `/appointments/cancel/${selectedAppointmentId}`, { cancellationReason: cancelReason });
            if (response.status === 200) {
                toast.success('Appointment canceled successfully');
                fetchAppointments();
            } else {
                toast.error('Failed to cancel appointment');
            }
        } catch (error) {
            console.error('Error canceling appointment:', error.message);
            toast.error('Failed to cancel appointment');
        } finally {
            handleCancel();
        }
    };

    return (
        <div className="appointment-list">
            <h1>Appointment List</h1>
            <div className="appo-table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Service</th>
                        <th>User</th>
                        <th>Employee</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.serviceName}</td>
                            <td>{appointment.userEmail}</td>
                            <td>{appointment.empName}</td>
                            <td>
                                <button className="cancel-button" onClick={() => handleCancelAppointment(appointment.id)}>Cancel</button>
                                {selectedAppointmentId === appointment.id && isCancelFormVisible && (
                                    <CancelAppointmentForm
                                        onCancel={handleCancel}
                                        onSubmit={confirmCancelAppointment}
                                        cancelReason={cancelReason}
                                        onReasonChange={handleCancelReasonChange}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentList;
