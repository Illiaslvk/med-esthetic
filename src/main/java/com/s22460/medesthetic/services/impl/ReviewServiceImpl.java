package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.entities.Review;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.ReviewRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.ReviewService;
import com.s22460.medesthetic.utils.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Override
    public Review createReview(Review review, String userEmail) {
        // Fetch user entity from the database using userEmail
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("User not found with email: " + userEmail));

        // Set the user for the review
        review.setUser(user);

        // Set the current date for the review
        review.setDate(LocalDate.now());

        // Save the review to the database
        return reviewRepository.save(review);
    }

    @Override
    public Review getReviewById(Long reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException("Review not found with ID: " + reviewId));
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review updateReview(Long reviewId, Review updatedReview) {
        Review existingReview = getReviewById(reviewId);

        // Update fields as needed
        existingReview.setRating(updatedReview.getRating());
        existingReview.setComment(updatedReview.getComment());

        // Save the updated review
        return reviewRepository.save(existingReview);
    }

    @Override
    public void deleteReview(Long reviewId) {
        Review review = getReviewById(reviewId);
        reviewRepository.delete(review);
    }


    @Override
    public Review findById(Long id) {
        Optional<Review> optionalReview = reviewRepository.findById(id);
        return optionalReview.orElse(null);
    }

    @Override
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

}

