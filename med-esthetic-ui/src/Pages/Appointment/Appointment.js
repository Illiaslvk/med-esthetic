import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api/axios_helper";
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Appointment.css";

const Appointment = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [assignedServices, setAssignedServices] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    serviceId: "",
    date: "",
    time: "",
  });
  const navigate = useNavigate();
  const [bookedTimes, setBookedTimes] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchEmployees();
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await request("GET", "/user/me");
      if (response.status === 200) {
        setUser(response.data);
        setFormData((prevData) => ({
          ...prevData,
          lastName: response.data.lastName,
          userEmail: response.data.email,
        }));
      }} catch (error) {
      toast.error("Please log in.");
    }
  };

  useEffect(() => {
    if (selectedEmployee) {
      fetchAssignedServices(selectedEmployee);
    }
  }, [selectedEmployee]);

  const fetchEmployees = async () => {
    try {
      const response = await request("GET", "/employees");
      if (response.status === 200) {
        setEmployees(response.data);
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const fetchAssignedServices = async (employeeId) => {
    try {
      const response = await request("GET", `/employees/${employeeId}/services`);
      if (response.status === 200) {
        setAssignedServices(response.data);
      } else {
        console.error("Failed to fetch assigned services");
      }
    } catch (error) {
      console.error("Error fetching assigned services:", error.message);
    }
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
    setFormData({ ...formData, employeeId: e.target.value });
    setAssignedServices([]); // Reset services if employee changes
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setFormData({ ...formData, date: selectedDate });

    try {
      const bookedTimesResponse = await request("GET", `/appointments/employee/${selectedEmployee}/date/${selectedDate}/booked-times`);
      if (bookedTimesResponse.status === 200) {
        setBookedTimes(bookedTimesResponse.data);
      } else {
        throw new Error('Failed to fetch booked times');
      }

      const holidayResponse = await request("GET", `/holidays/employee/${selectedEmployee}/date/${selectedDate}`);
      if (holidayResponse.data.isHoliday) {
        toast.error('Cannot book appointment on a holiday');
        setAvailableTimes([]); // Clear available times if its a holiday
      } else {
        const availableTimes = Array.from({ length: 9 }, (_, index) => index + 10)
            .filter(hour => {
              const time = `${hour}:00-${hour + 1}:00`;
              const dayOfWeek = new Date(selectedDate).getDay();
              // Check if the current time slot is booked
              const isBooked = bookedTimesResponse.data.some(bookedTime => {
                // "some" - method used to check if any of the booked times conflict with the current time slot
                const [bookedStart, bookedEnd] = bookedTime.split('-');
                const [start, end] = time.split('-');
                return bookedStart === start || bookedEnd === end;
              });
              return !isBooked && dayOfWeek !== 0 && dayOfWeek !== 6 && time !== "13:00";
            })
            .map(hour => `${hour}:00-${hour + 1}:00`);
        setAvailableTimes(availableTimes);
      }
    } catch (error) {
      toast.error('Error fetching booked times or holiday status');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to book an appointment.");
      return;
    }

    if (!formData.employeeId) {
      toast.error("Please select an employee.");
      return;
    }

    try {
      const response = await request("POST", "/appointments/create", formData);
      if (response.status === 201) {
        toast.success("Appointment booked successfully!");

        // Remove the booked time from availableTimes
        const newBookedTime = formData.time;
        setAvailableTimes(prevTimes => prevTimes.filter(time => time !== newBookedTime));
        setFormData({ ...formData, time: '' });

        navigate("/");
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      toast.error("Error booking appointment");
    }
  };


  return (
      <div className="appo-container">
        <div className="header-appo">
          <div className="text-appo">Appointment</div>
          <div className="underline"></div>
        </div>
        <form className="appo-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input">
              <select name="employeeId" value={selectedEmployee} onChange={handleEmployeeChange} required>
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="input">
              <select name="serviceId" value={formData.serviceId} onChange={handleInputChange} required>
                <option value="">Select Service</option>
                {assignedServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.serviceName}
                    </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="input">
              <input type="date" name="date" value={formData.date} onChange={handleDateChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="input">
              <select name="time" value={formData.time} onChange={handleInputChange} required>
                <option value="">Select Time</option>
                {availableTimes.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="submit-container">
            <button type="submit" className="submit-button">
              Book Appointment
            </button>
          </div>
        </form>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
  );
};

