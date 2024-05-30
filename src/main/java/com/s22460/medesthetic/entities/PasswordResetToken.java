package com.s22460.medesthetic.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "password_reset_token")
@NoArgsConstructor
@RequiredArgsConstructor
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @NonNull
    private String token;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    @NonNull
    private User user;

    @Column(nullable = false)
    @NonNull
    private LocalDateTime expirationDate;

}

