import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import {request} from "../../Pages/api/axios_helper";

const YourAppointments = () => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(0);
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // const response = await request('GET', '/appointments', {});
        const response = await request('GET', '/appo/booked', {});
        if (response.status !== 200) {
          throw new Error('Failed to fetch appointment data');
        }
        setAppointmentData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  const handleViewAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
  };

  return (
      <div className='your-appo'>
        <h1 className='main-heading'>Appointments History</h1>
        <div className='appo-table-wrapper'>
          <table className='your-appo-table'>
            <thead>
            <tr>
              <th scope='col'>Service Name</th>
              <th scope='col'>Date</th>
              <th scope='col'>Time</th>
              <th scope='col'>Duration</th>
              <th scope='col'>Employee</th>
              <th scope='col'>View</th>
            </tr>
            </thead>
            <tbody>
            {appointmentData.map((appointment) => (
                <tr key={appointment.id}>
                  <td data-label='Service Name'>{appointment.serviceName}</td>
                  <td data-label='Date'>{appointment.date}</td>
                  <td data-label='Time'>{appointment.time}</td>
                  <td data-label='Duration'>{appointment.duration}</td>
                  <td data-label='EmpName'>{appointment.empName}</td>
                  <td data-label='View'>
                    <button className='main-button' onClick={() => handleViewAppointment(appointment.id)}>View</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default YourAppointments;
