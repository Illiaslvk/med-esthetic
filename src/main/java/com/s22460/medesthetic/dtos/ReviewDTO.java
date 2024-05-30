package com.s22460.medesthetic.dtos;

import com.s22460.medesthetic.entities.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {

    private Long id;
    private int rating;
    private String comment;
    private LocalDate date;
    private Long userId;
    private String userName;

    public ReviewDTO(Review review) {
        this.id = review.getId();
        this.rating = review.getRating();
        this.comment = review.getComment();
        this.date = review.getDate();
        this.userId = review.getUser().getId();
        this.userName = review.getUser().getFirstName();
    }

}
