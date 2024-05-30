import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { request } from '../../api/axios_helper';
import './Password.css';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        try {
            const response = await request('POST', '/email/reset-password', {
                token,
                newPassword,
            });
            if (response.status === 200) {
                setMessage('Password reset successfully. You can now log in with your new password.');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setError('Failed to reset password.');
            }
        } catch (error) {
            setError('An error occurred while resetting password.');
            console.error('Error during password reset:', error.message);
        }
    };

    return (
        <div className="reset-password-container">
            <div className="password-container">
                <h2>Reset Password</h2>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={handleResetPassword}>Reset Password</button>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;