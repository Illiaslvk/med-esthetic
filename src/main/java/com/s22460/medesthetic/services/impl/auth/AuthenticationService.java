package com.s22460.medesthetic.services.impl.auth;

import com.s22460.medesthetic.dtos.auth.JwtAuthenticationResponse;
import com.s22460.medesthetic.dtos.auth.RefreshTokenRequest;
import com.s22460.medesthetic.dtos.auth.SignUpRequest;
import com.s22460.medesthetic.dtos.auth.SigninRequest;
import com.s22460.medesthetic.entities.User;

public interface AuthenticationService {
    User signup(SignUpRequest signUpRequest);
    JwtAuthenticationResponse signin(SigninRequest signinRequest);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
