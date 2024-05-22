package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.dtos.ReviewDTO;
import com.s22460.medesthetic.entities.Review;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.ReviewRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.ReviewService;
import com.s22460.medesthetic.utils.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Override
    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll().stream().map(ReviewDTO::new).collect(Collectors.toList());
    }

    @Override
    public ReviewDTO addReview(ReviewDTO reviewDTO) {
        Review review = new Review();
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setDate(reviewDTO.getDate());
        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        review.setUser(user);
        Review savedReview = reviewRepository.save(review);
        return new ReviewDTO(savedReview);
    }

    @Override
    public ReviewDTO updateReview(Long id, ReviewDTO reviewDTO) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
        review.setRating(reviewDTO.getRating());
        review.setComment(reviewDTO.getComment());
        review.setDate(reviewDTO.getDate());
        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));
        review.setUser(user);
        Review updatedReview = reviewRepository.save(review);
        return new ReviewDTO(updatedReview);
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
