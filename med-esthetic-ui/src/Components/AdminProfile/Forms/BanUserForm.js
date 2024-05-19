import React, { useState } from 'react';
import { request } from "../../../Pages/api/axios_helper";
import { toast } from 'react-toastify';
import './CommonForm.css';

const BanUserForm = ({ onClose, userId, fetchUserList }) => {
    const [banReason, setBanReason] = useState('');

    const handleChange = (e) => {
        setBanReason(e.target.value);
    };

    const handleBanUser = async (e) => {
        e.preventDefault(); // Prevent form submitting from reloading the page
        try {
            const response = await request('POST', `/admin/banUser/${userId}`, { reason: banReason });
            if (response.status === 200) {
                toast.success("User banned successfully!");
                fetchUserList();
                onClose();
            } else {
                toast.error("Failed to ban user");
            }
        } catch (error) {
            console.error('Error banning user:', error.message);
            toast.error('Error banning user');
        }
    };

    return (
        <div className="common-form">
            <h2>Ban User</h2>
            <form onSubmit={handleBanUser}>
                <label>
                    Ban Reason:
                    <input type="text" value={banReason} onChange={handleChange} required />
                </label>
                <button type="submit">Ban User</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default BanUserForm;
