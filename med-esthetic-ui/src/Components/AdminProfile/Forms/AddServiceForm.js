import React, { useState } from 'react';
import { request } from "../../../Pages/api/axios_helper";
import { toast } from 'react-toastify';
import './CommonForm.css';

const AddServiceForm = ({ onClose, onServiceAdded }) => {
    const [formData, setFormData] = useState({
        serviceName: '',
        duration: '',
        price: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', '/services/add', formData);
            if (response.status === 201) {
                toast.success("Service added successfully!");
                onServiceAdded();
                onClose();
            } else {
                toast.error("Failed to add service");
            }
        } catch (error) {
            console.error('Error adding service:', error.message);
            toast.error('Error adding service');
        }
    };

    return (
        <div className="common-form">
            <h2>Add New Service</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Service Name:
                    <input type="text" name="serviceName" value={formData.serviceName} onChange={handleChange} required />
                </label>
                <label>
                    Duration (minutes):
                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} required min={5} max={60} />
                </label>
                <label>
                    Price:
                    <input type="text" name="price" value={formData.price} onChange={handleChange} required />
                </label>
                <label>
                    Description (max 200 characters):
                    <input type="text" name="description" value={formData.description} onChange={handleChange} maxLength={200} />
                </label>
                <button type="submit">Add Service</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddServiceForm;
