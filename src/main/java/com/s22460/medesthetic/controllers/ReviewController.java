package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.ReviewDTO;
import com.s22460.medesthetic.entities.Review;
import com.s22460.medesthetic.services.ReviewService;
import com.s22460.medesthetic.utils.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/create/{userEmail}")
    public ResponseEntity<Review> createReview(@RequestBody Review review, @PathVariable String userEmail) {
        try {
            Review createdReview = reviewService.createReview(review, userEmail);
            return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        List<ReviewDTO> reviewDTOs = reviews.stream()
                .map(ReviewDTO::new)
                .collect(Collectors.toList());
        return new ResponseEntity<>(reviewDTOs, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ReviewDTO> updateReview(@PathVariable Long id, @RequestBody ReviewDTO reviewDTO) {
        Review existingReview = reviewService.findById(id);

        if (existingReview != null) {
            // Update review with DTO values
            existingReview.setRating(reviewDTO.getRating());
            existingReview.setComment(reviewDTO.getComment());
            existingReview.setDate(reviewDTO.getDate());

            // Save the updated review
            Review updatedReview = reviewService.save(existingReview);

            // Convert the updated review to DTO and return it
            ReviewDTO updatedReviewDTO = new ReviewDTO(updatedReview);
            return ResponseEntity.ok(updatedReviewDTO);
        } else {
            // Review with the given ID not found
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}