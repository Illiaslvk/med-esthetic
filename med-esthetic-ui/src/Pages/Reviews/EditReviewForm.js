import React, { useState } from 'react';
import { request } from "../api/axios_helper";
import { toast } from "react-toastify";
import './ReviewForm.css'

const EditReviewForm = ({ review, onUpdate, onClose }) => {
    const [updatedReview, setUpdatedReview] = useState(review);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedReview(prevReview => ({
            ...prevReview,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request('PUT', `/reviews/update/${review.id}`, updatedReview);
            if (response.status === 200) {
                toast.success("Review updated successfully!");
                onUpdate(updatedReview);
            } else {
                console.error('Failed to update review');
                toast.error('Failed to update review');
            }
        } catch (error) {
            console.error('Error updating review:', error.message);
            toast.error('Error updating review');
        }
    };

    return (
        <div className="common-form-edit">
            <h2>Edit Review</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating 1-5:
                    <input type="number" name="rating" value={updatedReview.rating} onChange={handleChange} />
                </label>
                <label>
                    Review Comment:
                    <textarea name="comment" value={updatedReview.comment} onChange={handleChange} maxLength={200} rows="10" cols="25" />
                </label>
                <button type="submit">Update Review</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditReviewForm;
