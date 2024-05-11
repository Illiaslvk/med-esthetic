package com.s22460.medesthetic.services.impl.auth;

import com.s22460.medesthetic.dtos.auth.JwtAuthenticationResponse;
import com.s22460.medesthetic.dtos.auth.RefreshTokenRequest;
import com.s22460.medesthetic.dtos.auth.SignUpRequest;
import com.s22460.medesthetic.dtos.auth.SigninRequest;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.utils.Role;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    // handle signup by saving user details to the database
    public User signup(SignUpRequest signUpRequest) {
        User user = new User();

        user.setEmail(signUpRequest.getEmail());
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        return userRepository.save(user);
    }

    // validate user credentials
    public JwtAuthenticationResponse signin(SigninRequest signinRequest, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    signinRequest.getEmail(), signinRequest.getPassword()));

            User user = userRepository.findByEmail(signinRequest.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

            String jwt = jwtService.generateToken(user);
            String refreshToken = jwtService.generateTokenBasedOnRole(user);

            JwtAuthenticationResponse jwtResponse = new JwtAuthenticationResponse();
            jwtResponse.setToken(jwt);
            jwtResponse.setRefreshToken(refreshToken);

            return jwtResponse;
        } catch (AuthenticationException e) {
            throw new IllegalArgumentException("Invalid email or password");
        }
    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        // Check if the refresh token is valid and generate a new JWT
        if(jwtService.isTokenValid(refreshTokenRequest.getToken(), user)){
            System.out.println("Refreshing JWT token for user: " + userEmail);
            String jwt = jwtService.generateToken(user);
            System.out.println("New JWT token generated: " + jwt);
            // Create and return JwtAuthenticationResponse
            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getToken());

            return jwtAuthenticationResponse;
        }
        return null;
    }

}