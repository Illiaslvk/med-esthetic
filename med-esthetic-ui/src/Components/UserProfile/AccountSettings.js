import React from 'react';
import './UserProfile.css';

const AccountSettings = () => {
    return (
        <div className='account-settings'>
            <h1 className='main-heading'>Personal Information</h1>

            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='name'>Your Name <span>*</span></label>
                    <input type='text' name='name' id='name' />
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email <span>*</span></label>
                    <input type='email' name='email' id='email' />
                </div>

                <div className='form-group'>
                    <label htmlFor='phone'>Phone/Mobile <span>*</span></label>
                    <input type='text' name='phone' id='phone' />
                </div>
            </div>

            <button className='main-button'>Save Changes</button>
        </div>
    );
}

export default AccountSettings;
