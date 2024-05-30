import React from 'react';
import { toast } from 'react-toastify';
import './CommonForm.css';

const CancelAppointmentForm = ({ onSubmit, onCancel, cancelReason, onReasonChange }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await onSubmit();
        } catch (error) {
            console.error('Error canceling appointment:', error.message);
            toast.error('Failed to cancel appointment');
        }
    };

    return (
        <div className="common-form">
            <h2>Cancel Appointment</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Reason for Canceling:
                    <input type="text" placeholder="Enter reason" value={cancelReason} onChange={onReasonChange} required/>
                </label>
                <button type="submit">Confirm</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default CancelAppointmentForm;
