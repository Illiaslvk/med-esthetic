import React, { useState } from 'react';
import { request } from '../../Pages/api/axios_helper';
import './ChangePassword.css';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await request('PUT', '/user/change-password', {
                currentPassword,
                newPassword,
            });

            if (response && response.status === 200) {
                setSuccess(true);
                setError(null);
            } else {
                setError("Failed to change password.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="change-password-container">
            <h2 className="change-password-title">Change Password</h2>
            <form className="change-password-form" onSubmit={handleChangePassword}>
                <label>
                    Current Password:
                    <input className="change-password-input" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required/>
                </label>
                <label>
                    New Password:
                    <input className="change-password-input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
                </label>
                <label>
                    Confirm New Password:
                    <input className="change-password-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </label>
                <button type="submit" className="change-password-button">Change Password</button>
                {error && <p className="change-password-error">{error}</p>}
                {success && <p className="change-password-success">Password changed successfully.</p>}
            </form>
        </div>
    );
};

export default ChangePassword;
