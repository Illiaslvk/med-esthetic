package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.ReviewDTO;
import com.s22460.medesthetic.entities.Review;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.services.ReviewService;
import com.s22460.medesthetic.services.UserService;
import com.s22460.medesthetic.utils.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @PostMapping("/reviews/add")
    public ResponseEntity<ReviewDTO> addReview(@RequestBody ReviewDTO reviewDTO, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("User not found"));
        reviewDTO.setUserId(user.getId());
        return ResponseEntity.ok(reviewService.addReview(reviewDTO));
    }

    @PutMapping("/reviews/update/{id}")
    public ResponseEntity<ReviewDTO> updateReview(@PathVariable Long id, @RequestBody ReviewDTO reviewDTO, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("User not found"));
        reviewDTO.setUserId(user.getId());
        return ResponseEntity.ok(reviewService.updateReview(id, reviewDTO));
    }

    @DeleteMapping("/reviews/delete/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
