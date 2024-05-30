import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { request } from '../../Pages/api/axios_helper';
import AddHolidayForm from './Forms/AddHolidayForm';
import './Holiday.css';
import { format } from 'date-fns';

const ManageHolidays = () => {
    const [holidays, setHolidays] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (user && user.id) {
            fetchHolidays(user.id);
        }
    }, [user]);

    const fetchUserDetails = async () => {
        try {
            const response = await request('GET', '/user/me');
            if (response.status === 200) {
                setUser(response.data);
            } else {
                toast.error('Failed to fetch user details. Please log in.');
            }
        } catch (error) {
            toast.error('Error fetching user details.');
        }
    };

    const fetchHolidays = async () => {
        try {
            const response = await request('GET', `/holidays`);
            if (response.status === 200) {
                setHolidays(response.data);
            } else {
                toast.error('Failed to fetch holidays');
            }
        } catch (error) {
            toast.error('Error fetching holidays.');
        }
    };

    const handleDeleteHoliday = async (holidayId) => {
        try {
            const response = await request('DELETE', `/holidays/delete/${holidayId}`);
            if (response.status === 204) {
                toast.success('Holiday deleted successfully');
                setHolidays(holidays.filter(holiday => holiday.id !== holidayId));
            } else {
                toast.error('Failed to delete holiday');
            }
        } catch (error) {
            toast.error('Error deleting holiday.');
        }
    };

    const handleAddHolidayClick = () => {
        setShowAddForm(true);
    };

    const handleCloseAddHolidayForm = () => {
        setShowAddForm(false);
        if (user && user.id) {
            fetchHolidays(user.id);
        }
    };

    return (
        <div className="manage-holiday-container">
            <div className="holiday-header-container">
                <h1 className="main-heading-holiday">Manage Holidays</h1>
                <button className="add-holiday-button" onClick={handleAddHolidayClick}>
                    Add Holiday
                </button>
            </div>
            {holidays.length === 0 ? (
                    <p>No holidays added yet.</p>
                ) : (
                    <div className="table-container">
                        <table className="holiday-table">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Reason</th>
                                <th>Employee</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {holidays.map((holiday) => (
                                <tr key={holiday.id}>
                                    <td>{format(new Date(holiday.date), 'yyyy-MM-dd')}</td>
                                    <td>{holiday.reason}</td>
                                    <td>{holiday.empName}</td>
                                    <td>
                                        <button className="delete-button" onClick={() => handleDeleteHoliday(holiday.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            {showAddForm && (
                <AddHolidayForm userId={user.id} onClose={handleCloseAddHolidayForm} />
            )}
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
};

export default ManageHolidays;
