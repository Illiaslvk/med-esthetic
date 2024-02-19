package com.s22460.medesthetic.services;

import com.s22460.medesthetic.entities.Review;

import java.util.List;

public interface ReviewService {
    Review createReview(Review review, String userEmail);

    Review getReviewById(Long reviewId);

    List<Review> getAllReviews();

    Review updateReview(Long reviewId, Review updatedReview);

    void deleteReview(Long reviewId);

    Review findById(Long id);

    Review save(Review review);
}
