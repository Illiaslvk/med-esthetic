import React, { useState } from 'react';
import { request } from "../api/axios_helper";
import { toast } from 'react-toastify';
import './ReviewForm.css'

const AddReviewForm = ({ onClose, onReviewAdded }) => {
    const [formData, setFormData] = useState({
        comment: '',
        rating: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', '/reviews/add', { ...formData, date: new Date().toISOString() });
            if (response.status === 200 || response.status === 201) {
                toast.success("Review added successfully!");
                onReviewAdded(formData);
                onClose();
            } else {
                console.error('Failed to add review');
                toast.error('Failed to add review');
            }
        } catch (error) {
            console.error('Error adding review:', error.message);
            toast.error('Error, Comment is too big/Rate should be 1-5');
        }
    };


    return (
        <div className="common-form-rev">
            <h2>Add New Review</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Review Comment:
                    <textarea name="comment" value={formData.comment} onChange={handleChange} required maxLength={200} rows="10" cols="25" />
                </label>
                <label>
                    Rating 1-5:
                    <input type="number" name="rating" value={formData.rating} onChange={handleChange} required min="1" max="5" />
                </label>
                <button type="submit">Add Review</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddReviewForm;
