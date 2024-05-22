import React from 'react';
import './AdminTab.css';

const AdminTab = () => {
    return (
        <div className='admin-tab'>
            <h1 className='main-heading-admin'>Admin Info:</h1>

            <div className='admin-info'>
                <ul>
                    <li>Role: Admin</li>
                    <li>Access Level: Full</li>
                </ul>
            </div>

        </div>
    );
}

export default AdminTab;
