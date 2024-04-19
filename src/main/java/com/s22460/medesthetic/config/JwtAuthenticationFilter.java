package com.s22460.medesthetic.config;

import com.s22460.medesthetic.services.impl.auth.JWTService;
import com.s22460.medesthetic.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * filter responsible for validating JWT for every API request
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String jwt = extractJwtFromCookies(request);
        String userEmail = null;

        if (jwt != null) {
            userEmail = jwtService.extractUserName(jwt);
        }

        if (jwt != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userService.userDetailsService().loadUserByUsername(userEmail);
            if (jwtService.isTokenValid(jwt, userDetails)) {
                setSecurityContext(userDetails, request);

                // Check if the token should be refreshed
                if (jwtService.shouldTokenBeRefreshed(jwt)) {
                    System.out.println("Refreshing JWT token for user: " + userEmail);
                    String newJwt = jwtService.generateTokenBasedOnRole(userDetails);
                    setNewTokenInResponseCookies(response, newJwt);
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private void setSecurityContext(UserDetails userDetails, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    private void setNewTokenInResponseCookies(HttpServletResponse response, String jwt) {
        Cookie jwtCookie = new Cookie("auth_token", jwt);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setPath("/");
        jwtCookie.setSecure(true);
        jwtCookie.setMaxAge((int) (jwtService.getAccessTokenExpiration() / 1000));
        response.addCookie(jwtCookie);
    }

    private String extractJwtFromCookies(HttpServletRequest request) {
        return extractTokenFromCookies(request, "auth_token");
    }

    private String extractTokenFromCookies(HttpServletRequest request, String cookieName) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}