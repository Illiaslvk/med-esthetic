package com.s22460.medesthetic.services;

import com.s22460.medesthetic.dtos.ReviewDTO;
import com.s22460.medesthetic.entities.Review;

import java.util.List;

public interface ReviewService {
    List<ReviewDTO> getAllReviews();
    ReviewDTO addReview(ReviewDTO reviewDTO);
    ReviewDTO updateReview(Long id, ReviewDTO reviewDTO);
    void deleteReview(Long id);

}
