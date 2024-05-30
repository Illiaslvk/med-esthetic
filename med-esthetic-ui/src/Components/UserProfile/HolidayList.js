import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { request } from '../../Pages/api/axios_helper';
import { format } from 'date-fns';
import '../AdminProfile/Holiday.css';

const HolidayList = () => {
    const [holidays, setHolidays] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (user && user.id) {
            fetchHolidays();
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
            const response = await request('GET', '/holidays/current-user');
            if (response.status === 200) {
                setHolidays(response.data);
            } else {
                toast.error('Failed to fetch holidays');
            }
        } catch (error) {
            toast.error('Error fetching holidays.');
        }
    };

    const handleAddHolidayClick = () => {
        setShowAddForm(true);
    };

    const handleCloseAddHolidayForm = () => {
        setShowAddForm(false);
        fetchHolidays();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', '/holidays/add', {
                userId: user.id,
                date,
                reason,
            });
            if (response.status === 201) {
                toast.success('Holiday added successfully');
                handleCloseAddHolidayForm();
            } else {
                toast.error('Failed to add holiday');
            }
        } catch (error) {
            toast.error('Error adding holiday.');
        }
    };

    return (
        <div className="manage-holiday-container">
            <div className="holiday-header-container">
                <h1 className="main-heading-holiday">My Holidays</h1>
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
                        </tr>
                        </thead>
                        <tbody>
                        {holidays.map((holiday) => (
                            <tr key={holiday.id}>
                                <td>{format(new Date(holiday.date), 'yyyy-MM-dd')}</td>
                                <td>{holiday.reason}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showAddForm && (
                <div className="add-holiday-form-container">
                    <form onSubmit={handleSubmit} className="add-holiday-form">
                        <h3 className="header3">Add Holiday</h3>
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
                        <button type="button" onClick={handleCloseAddHolidayForm}>Cancel</button>
                    </form>
                </div>
            )}
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
};

export default HolidayList;
