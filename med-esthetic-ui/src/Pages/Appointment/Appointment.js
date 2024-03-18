import React, { useState } from "react";
import "./Appointment.css";

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="appo-container">
      <div className="header">
        <div className="text">Appointment</div>
        <div className="underline"></div>
      </div>
      <form className="appo-form" onSubmit={handleSubmit}>
        <div className="form-row"> {/* First row */}
          <div className="input">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="input">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
            />
          </div>
        </div>
        <div className="form-row"> {/* Second row */}
          <div className="input">
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Service</option>
              <option value="service1">Service 1</option>
              <option value="service2">Service 2</option>
              <option value="service3">Service 3</option>
            </select>
          </div>
          <div className="input">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
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
}

export default Appointment;
