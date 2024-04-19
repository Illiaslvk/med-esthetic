package com.s22460.medesthetic.services.impl.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Map;

public interface JWTService {
    String extractUserName(String token);
    String generateToken(UserDetails userDetails);
    String generateTokenBasedOnRole(UserDetails userDetails);
    boolean isTokenValid(String token, UserDetails userDetails);
    //    String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails);
    boolean isRefreshTokenValid(String token, UserDetails userDetails);

    boolean shouldTokenBeRefreshed(String token);
    long getAccessTokenExpiration();

}
