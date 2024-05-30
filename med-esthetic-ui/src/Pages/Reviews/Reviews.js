import React, { useState, useEffect } from 'react';
import { request } from "../api/axios_helper";
import AddReviewForm from './AddReviewForm';
import EditReviewForm from './EditReviewForm';
import "./Reviews.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAddReviewFormVisible, setIsAddReviewFormVisible] = useState(false);
    const [editReview, setEditReview] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        const userRoles = JSON.parse(localStorage.getItem("userRoles"));
        setIsAdmin(userRoles?.includes("ADMIN"));
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await request('GET', '/reviews');
            if (response.status === 200) {
                setReviews(response.data);
            } else {
                console.error('Failed to fetch reviews');
            }
        } catch (error) {
            console.error('Error fetching reviews:', error.message);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await request('DELETE', `/reviews/delete/${reviewId}`);
            if (response.status === 204 || response.status === 200) {
                toast.success("Review deleted successfully!");
                setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
            } else {
                console.error('Failed to delete review');
            }
        } catch (error) {
            console.error('Error deleting review:', error.message);
            toast.error('Error deleting review');
        }
    };

    const handleEditReview = (review) => {
        setEditReview(review);
    };

    const handleUpdateReview = () => {
        setEditReview(null);
        fetchReviews();
    };

    return (
        <div className="reviews-page">
            <div className="main-heading-rev">
                <h2>Welcome to our Reviews page!</h2>
                <p>Add Your Review Here</p>
                <button className="main-button" onClick={() => setIsAddReviewFormVisible(true)}>Add a Review</button>
            </div>
            <div className="reviews-list">
                <div className="table-container">
                    <table className="review-table">
                        <thead>
                        <tr>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th>User</th>
                            {isAdmin && <th>Action</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {reviews.map((review) => (
                            <tr key={review.id}>
                                <td>{review.rating}</td>
                                <td>{review.comment}</td>
                                <td>{new Date(review.date).toLocaleDateString()}</td>
                                <td>{review.userName}</td>
                                {isAdmin && (
                                    <td>
                                        <button className="delete-button-rev" onClick={() => handleDeleteReview(review.id)}>Delete</button>
                                        <button className="edit-button-rev" onClick={() => handleEditReview(review)}>Edit</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isAddReviewFormVisible && (
                <AddReviewForm onClose={() => setIsAddReviewFormVisible(false)} onReviewAdded={fetchReviews} />
            )}
            {editReview && (
                <EditReviewForm review={editReview} onUpdate={handleUpdateReview} onClose={() => setEditReview(null)} />
            )}
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
};

export default Reviews;
