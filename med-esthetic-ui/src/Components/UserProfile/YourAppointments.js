import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { request } from "../../Pages/api/axios_helper";
import CancelAppointmentForm from '../AdminProfile/Forms/CancelAppointmentForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YourAppointments = ({ userRole }) => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCancelFormVisible, setIsCancelFormVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await request('GET', '/appo/booked', {});
        if (response.status !== 200) {
          throw new Error('Failed to fetch appointment data');
        }
        setAppointmentData(response.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async () => {
    try {
      const response = await request('POST', `/appointments/cancel/${selectedAppointmentId}`, { cancellationReason: cancelReason });
      if (response.status !== 200) {
        throw new Error('Failed to cancel appointment');
      }
      setAppointmentData(appointmentData.filter(app => app.id !== selectedAppointmentId));
      toast.success('Appointment canceled successfully');
      closeCancelForm();
    } catch (error) {
      setErrorMessage(error.message);
      toast.error('Failed to cancel appointment');
    }
  };

  const openCancelForm = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setIsCancelFormVisible(true);
  };

  const closeCancelForm = () => {
    setSelectedAppointmentId(null);
    setIsCancelFormVisible(false);
    setCancelReason('');
  };

  const handleReasonChange = (event) => {
    setCancelReason(event.target.value);
  };

  return (
      <div className='your-appo'>
        <h1 className='main-heading'>Appointments History</h1>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <div className='appo-table-wrapper'>
          <table className={`your-appo-table ${userRole === "ADMIN" || userRole === "EMPLOYEE" ? "admin-employee" : ""}`}>
            <thead>
            <tr>
              <th>Service Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Employee</th>
              {(userRole === "ADMIN" || userRole === "EMPLOYEE") && <th>User</th>}
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {appointmentData.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.serviceName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.duration}</td>
                  <td>{appointment.empName}</td>
                  {(userRole === "ADMIN" || userRole === "EMPLOYEE") && <td>{appointment.userEmail}</td>}
                  <td>
                    <button className="cancel-button" onClick={() => openCancelForm(appointment.id)}>Cancel</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        {isCancelFormVisible && (
            <CancelAppointmentForm
                onSubmit={handleCancelAppointment}
                onCancel={closeCancelForm}
                cancelReason={cancelReason}
                onReasonChange={handleReasonChange}
            />
        )}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
  );
};

export default YourAppointments;