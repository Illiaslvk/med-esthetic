package com.s22460.medesthetic.services.impl.auth;

import com.s22460.medesthetic.dtos.auth.JwtAuthenticationResponse;
import com.s22460.medesthetic.dtos.auth.RefreshTokenRequest;
import com.s22460.medesthetic.dtos.auth.SignUpRequest;
import com.s22460.medesthetic.dtos.auth.SigninRequest;
import com.s22460.medesthetic.entities.User;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {
    User signup(SignUpRequest signUpRequest);
    JwtAuthenticationResponse signin(SigninRequest signinRequest, HttpServletResponse response);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
    void updatePassword(User user, String newPassword);
}
