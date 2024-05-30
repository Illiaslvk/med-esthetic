import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { request } from '../../../Pages/api/axios_helper';
import '../Holiday.css';

const AddHolidayForm = ({ userId, onClose }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await request('GET', '/employees');
            if (response.status === 200) {
                const employeesWithNames = response.data.map(employee => ({
                    ...employee,
                    empName: `${employee.firstName} ${employee.lastName}`
                }));
                setEmployees(employeesWithNames);
            } else {
                console.error('Failed to fetch employees');
            }
        } catch (error) {
            console.error('Error fetching employees:', error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', '/holidays/add', {
                userId: selectedEmployee,
                date,
                reason,
            });
            if (response.status === 201) {
                toast.success('Holiday added successfully');
                onClose();
            } else {
                toast.error('Failed to add holiday');
            }
        } catch (error) {
            toast.error('Error adding holiday.');
        }
    };

    return (
        <div className="add-holiday-form-container">
            <form onSubmit={handleSubmit} className="add-holiday-form">
                <h3 className="header3">Add Holiday</h3>
                <label>
                    Employee:
                    <select
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.empName}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Reason:
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Add Holiday</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddHolidayForm;
