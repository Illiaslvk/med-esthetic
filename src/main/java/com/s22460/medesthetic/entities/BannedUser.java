package com.s22460.medesthetic.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "banned_user")
public class BannedUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String reason;

}
