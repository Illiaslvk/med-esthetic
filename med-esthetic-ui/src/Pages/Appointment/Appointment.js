import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api/axios_helper";
import {toast, ToastContainer} from 'react-toastify';
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
    fullName: "",
    userEmail: "",
  });
  const navigate = useNavigate()

  useEffect(() => {
    fetchEmployees();
  }, []);

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
      console.error("Error fetching employees: ", error.message);
    }
  };

  const fetchAssignedServices = async (employeeId) => {
    try {
      const response = await request("GET", `/employees/${employeeId}/services`);
      console.log("Response:", response);
      if (response && response.status === 200) {
        console.log("Assigned services:", response.data);
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request("POST", "/appointments/create", formData);
      if (response.status === 201) {
        console.log("Appointment booked successfully!");
        toast.success("Appointment booked successfully!");
        navigate("/");
      } else {
        console.error("Failed to book appointment");
        toast.error("Failed to book appointment")
      }
    } catch (error) {
      console.error("Error booking appointment:", error.message);
      toast.error("Error booking appointment");
    }
  };

  return (
      <div className="appo-container">
        <ToastContainer position="bottom-right" autoClose={5000} />
        <div className="header-appo">
          <div className="text">Appointment</div>
          <div className="underline"></div>
        </div>
        <form className="appo-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input">
              <select
                  name="employeeId"
                  value={selectedEmployee}
                  onChange={handleEmployeeChange}
                  required
              >
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
              <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleInputChange}
                  required
              >
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
              <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input">
              <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
              >
                <option value="">Select Time</option>
                {Array.from({ length: 9 }, (_, index) => index + 8).map((hour) => {
                  if (hour === 12) {
                    return null;
                  }
                  return (
                      <option key={hour} value={`${hour}:00`}>
                        {`${hour}:00-${hour + 1}:00`}
                      </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="input">
              <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
              />
            </div>
            <div className="input">
              <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  required
              />
            </div>
          </div>
          <div className="submit-container">
            <button type="submit" className="submit-button">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
  );
};

export default Appointment;
