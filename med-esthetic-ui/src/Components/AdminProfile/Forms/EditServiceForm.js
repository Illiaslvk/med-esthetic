import React, { useState } from 'react';
import { toast } from "react-toastify";
import './CommonForm.css';

const EditServiceForm = ({ service, onSubmit, onCancel }) => {
    const [updatedService, setUpdatedService] = useState({
        serviceName: service.serviceName,
        duration: service.duration,
        price: service.price
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedService(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(service.id, updatedService);
            onCancel();
        } catch (error) {
            console.error('Error updating service:', error.message);
            toast.error("Error updating service");
        }
    };

    return (
        <div className="common-form">
            <h2>Edit Service</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Service Name:
                    <input type="text" name="serviceName" value={updatedService.serviceName} onChange={handleChange} />
                </label>
                <label>
                    Duration (minutes):
                    <input type="number" name="duration" value={updatedService.duration} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={updatedService.price} onChange={handleChange} />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditServiceForm;
