import React from 'react';
import './UserProfile.css';

const ChangePassword = () => {
    return (
        <div className='change-password'>
            <h1 className='main-heading'>Change Password</h1>

            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='oldpass'>Old Password <span>*</span></label>
                    <input type="password" />
                </div>

                <div className='form-group'>
                    <label htmlFor='newpass'>New Password <span>*</span></label>
                    <input type="password" />
                </div>
            </div>

            <button className='main-button'>Save Changes</button>
        </div>
    );
}

export default ChangePassword;
