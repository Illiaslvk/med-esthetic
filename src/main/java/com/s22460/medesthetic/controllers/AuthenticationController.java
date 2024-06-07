package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.auth.JwtAuthenticationResponse;
import com.s22460.medesthetic.dtos.auth.RefreshTokenRequest;
import com.s22460.medesthetic.dtos.auth.SignUpRequest;
import com.s22460.medesthetic.dtos.auth.SigninRequest;
import com.s22460.medesthetic.entities.BannedUser;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.BannedUserRepository;
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
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final BannedUserRepository bannedUserRepository;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(authenticationService.signup(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SigninRequest signinRequest, HttpServletResponse response) {
        BannedUser bannedUser = bannedUserRepository.findByEmail(signinRequest.getEmail());
        if (bannedUser != null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is banned. Reason: " + bannedUser.getReason());
        }
        JwtAuthenticationResponse jwtResponse = authenticationService.signin(signinRequest, response);
        UserDetails userDetails = userDetailsService.loadUserByUsername(signinRequest.getEmail());

        // Set the JWT token in a cookie
        setCookie(response, "auth_token", jwtResponse.getToken(), true, true, "/");

        // Set the refresh token in a separate cookie
        int refreshTokenMaxAge = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))
                ? 12 * 60 * 60  // 12 hours for ADMIN
                : 2 * 60 * 60;  // 2 hours for others
        setCookie(response, "refresh_token", jwtResponse.getRefreshToken(), true, true, "/");

        // Extract roles from UserDetails and convert them to strings
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        jwtResponse.setRoles(roles);

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest, HttpServletResponse response) {
        try {
            String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            if (jwtService.isRefreshTokenValid(refreshTokenRequest.getToken(), userDetails)) {
                String newToken = jwtService.generateToken(userDetails);

                setCookie(response, "auth_token", newToken, true, true, "/");

                return ResponseEntity.ok(new JwtAuthenticationResponse(newToken, refreshTokenRequest.getToken()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid request");
        }
    }

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

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        clearCookie(response, "auth_token");
        clearCookie(response, "refresh_token");
        return ResponseEntity.ok("Logged out successfully");
    }

    private void setCookie(HttpServletResponse response, String name, String value, boolean httpOnly, boolean secure, String path) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(httpOnly);
        cookie.setSecure(secure);
        cookie.setPath(path);
        cookie.setAttribute("SameSite", "None");
        response.addCookie(cookie);
    }

    private void clearCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "None");
        response.addCookie(cookie);
    }

}