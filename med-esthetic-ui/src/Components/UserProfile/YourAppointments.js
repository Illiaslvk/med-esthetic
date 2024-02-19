import React, { useState } from 'react';
import './YourAppointments.css'; 

const YourAppointments = () => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(0);
//  const [appointmentsuccesscont, setAppointmentsuccesscont] = useRecoilState(appointmentSuccessfulProvider);
  const [appointmentData, setAppointmentData] = useState([]);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/appointments');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch appointment data');
  //       }
  //       const data = await response.json();
  //       setAppointmentData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleViewAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    //setAppointmentsuccesscont(true);
  };

  return (
    <div className='YourAppointments'>
      <h1 className='mainhead1'>Your Appointments</h1>
      {/* {appointmentsuccesscont && (
        <AppointmentSuccessful
          appointmentId={selectedAppointmentId}
          message={`Appointment ID: ${selectedAppointmentId}`}
        />
      )} */}
      <table className='yourappointmentstable'>
        <thead>
          <tr>
            <th scope='col'>Appointment ID</th>
            <th scope='col'>Date</th>
            <th scope='col'>Status</th>
            <th scope='col'>View</th>
          </tr>
        </thead>
        <tbody>
          {appointmentData.map((appointment) => (
            <tr key={appointment.id}>
              <td data-label='Appointment ID'>{appointment.id}</td>
              <td data-label='Date'>{appointment.date}</td>
              <td data-label='Status'>{appointment.status}</td>
              <td data-label='View'>
                <button
                  className='mainbutton1'
                  onClick={() => handleViewAppointment(appointment.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourAppointments;
