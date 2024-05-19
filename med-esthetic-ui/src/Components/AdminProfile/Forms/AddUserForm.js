import React, { useState } from 'react';
import { request } from "../../../Pages/api/axios_helper";
import { toast } from 'react-toastify';
import './CommonForm.css';

const AddUserForm = ({ onClose, onUserAdded }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', '/admin/add-user', formData);
            if (response.status === 201) {
                toast.success("User added successfully!");
                onUserAdded();
                onClose();
            } else {
                toast.error("Failed to add user");
            }
        } catch (error) {
            console.error('Error adding user:', error.message);
            toast.error('Error adding user');
        }
    };

    return (
        <div className="common-form">
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <button type="submit">Add User</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddUserForm;
