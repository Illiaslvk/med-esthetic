package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.auth.JwtAuthenticationResponse;
import com.s22460.medesthetic.dtos.auth.RefreshTokenRequest;
import com.s22460.medesthetic.dtos.auth.SignUpRequest;
import com.s22460.medesthetic.dtos.auth.SigninRequest;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.impl.auth.AuthenticationService;
import com.s22460.medesthetic.services.impl.auth.JWTService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;

    @CrossOrigin
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(authenticationService.signup(signUpRequest));
    }

    @CrossOrigin
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest, HttpServletResponse response) {
        JwtAuthenticationResponse jwtResponse = authenticationService.signin(signinRequest, response);
        UserDetails userDetails = userDetailsService.loadUserByUsername(signinRequest.getEmail());

        // Set the JWT token in a cookie
        Cookie authTokenCookie = new Cookie("auth_token", jwtResponse.getToken());
        //authTokenCookie.setMaxAge(2*60); // 2 minute
        authTokenCookie.setHttpOnly(true);
        authTokenCookie.setSecure(true);
        authTokenCookie.setPath("/");
        response.addCookie(authTokenCookie);

        // Set the refresh token in a separate cookie
        Cookie refreshTokenCookie = new Cookie("refresh_token", jwtResponse.getRefreshToken());
        // Check if the user has the ADMIN role for refresh token expiration
        int refreshTokenMaxAge = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))
                ? 12 * 60 * 60  // 12 hours for ADMIN
                : 2 * 60 * 60;  // 2 hours for others
        //refreshTokenCookie.setMaxAge(refreshTokenMaxAge);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);

        // Extract roles from UserDetails and convert them to strings
        List<String> roles = userDetails.getAuthorities().stream()
                //Lambda replaced with method reference
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        jwtResponse.setRoles(roles);

        return ResponseEntity.ok(jwtResponse);
    }

    @CrossOrigin
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest, HttpServletResponse response) {
        try {
            String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            // Check if the refresh token is still valid
            if (jwtService.isRefreshTokenValid(refreshTokenRequest.getToken(), userDetails)) {
                // Generate a new access token
                System.out.println("Refresh token is valid for user: " + userEmail);
                String newToken = jwtService.generateToken(userDetails);
//                String newToken = jwtService.generateTokenBasedOnRole(userDetails);

                // Set the new token in a cookie
                Cookie newTokenCookie = new Cookie("auth_token", newToken);
                //newTokenCookie.setMaxAge((int) (jwtService.getAccessTokenExpiration() / 1000)); // Convert milliseconds to seconds
                newTokenCookie.setHttpOnly(true);
                newTokenCookie.setSecure(true);
                newTokenCookie.setPath("/");
                response.addCookie(newTokenCookie);

                // Return the new token along with the refresh token
                return ResponseEntity.ok(new JwtAuthenticationResponse(newToken, refreshTokenRequest.getToken()));
            } else {
                System.out.println("Refresh token is invalid or expired for user: " + userEmail);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid request");
        }
    }


    @CrossOrigin
    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            // User is authenticated
            return ResponseEntity.ok(Map.of("isAuthenticated", true));
        } else {
            // User is not authenticated
            return ResponseEntity.ok(Map.of("isAuthenticated", false));
        }
    }

    @CrossOrigin
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Clear the authentication cookies
        Cookie authTokenCookie = new Cookie("auth_token", null);
        authTokenCookie.setMaxAge(0); // Immediate expiration
        authTokenCookie.setHttpOnly(true);
        authTokenCookie.setSecure(true);
        authTokenCookie.setPath("/");
        response.addCookie(authTokenCookie);

        Cookie refreshTokenCookie = new Cookie("refresh_token", null);
        refreshTokenCookie.setMaxAge(0); // Immediate expiration
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok("Logged out successfully");
    }

}