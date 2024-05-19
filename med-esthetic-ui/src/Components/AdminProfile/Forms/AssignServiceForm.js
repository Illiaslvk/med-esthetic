import React, { useState, useEffect } from 'react';
import { request } from "../../../Pages/api/axios_helper";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './CommonForm.css';

const AssignServiceForm = ({ onCancel, onServiceAssigned }) => {
    const [employees, setEmployees] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedService, setSelectedService] = useState('');

    useEffect(() => {
        fetchEmployees();
        fetchServices();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await request('GET', '/employees');
            if (response.status === 200) {
                setEmployees(response.data);
            } else {
                console.error('Failed to fetch employees');
            }
        } catch (error) {
            console.error('Error fetching employees:', error.message);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await request('GET', '/services/admin/list');
            if (response.status === 200) {
                setServices(response.data);
            } else {
                console.error('Failed to fetch services');
            }
        } catch (error) {
            console.error('Error fetching services:', error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', `/services/assign/${selectedEmployee}/${selectedService}`);
            if (response.status === 200) {
                toast.success("Service assigned successfully");
                onServiceAssigned();
                onCancel();
            } else {
                console.error('Failed to assign service');
                toast.error("Failed to assign service");
            }
        } catch (error) {
            console.error('Error assigning service:', error.message);
            toast.error("Error assigning service");
        }
    };

    return (
        <div className="common-form">
            <h2>Assign Service</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Employee:
                    <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                        <option value="">Select Employee</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Service:
                    <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                        <option value="">Select Service</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>{service.serviceName}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Assign</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AssignServiceForm;
