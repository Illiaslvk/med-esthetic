import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ user, onClose, onUpdateRole }) => {
    const [newRole, setNewRole] = useState(user.role);

    const handleRoleChange = (e) => {
        setNewRole(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            await onUpdateRole(user.id, newRole);
            onClose();
        } catch (error) {
            console.error('Error updating role:', error.message);
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-inner">
                <h2>User Details</h2>
                <p>Name: {user.firstName}</p>
                <p>Email: {user.email}</p>
                <p>Current Role: {user.role}</p>
                {/*htmlFor provides connection between label and the input element*/}
                <label htmlFor="new-role">New Role:</label>
                <select
                    id="new-role"
                    value={newRole}
                    onChange={handleRoleChange}
                >
                    <option value="ADMIN">ADMIN</option>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="USER">USER</option>
                </select>
                <div className="button-container">
                    <button className="update-button" onClick={handleSubmit}>Update Role</button>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
