package com.s22460.medesthetic.dtos.auth;

import com.s22460.medesthetic.entities.User;
import lombok.Data;
import org.springframework.stereotype.Repository;

@Data
public class JwtAuthenticationResponse {
    private String token;
    private String refreshToken;
    private User userDetails;
}
