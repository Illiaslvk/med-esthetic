package com.s22460.medesthetic.services.impl.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Service
public class JWTServiceImpl implements JWTService {

    @Value("${jwt.secret-key}")
    private String secretKey;

    private static final long ACCESS_TOKEN_EXPIRATION = 5 * 60 * 1000; // 5 minutes
    private static final long REFRESH_TOKEN_EXPIRATION = 2 * 60 * 60 * 1000; // 2 hours
    private static final long ADMIN_REFRESH_TOKEN_EXPIRATION = 12 * 60 * 60 * 1000; // 12 hours for admin

    public String generateToken(UserDetails userDetails){
        // System.currentTimeMillis() + 1000 * 60 * 24
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("role", userDetails.getAuthorities())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(getSigninKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String generateTokenBasedOnRole(UserDetails userDetails) {
        long expiration = userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))
                ? ADMIN_REFRESH_TOKEN_EXPIRATION
                : REFRESH_TOKEN_EXPIRATION;
        return generateTokenWithExpiration(userDetails, expiration);
    }

    private String generateTokenWithExpiration(UserDetails userDetails, long expiration) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("role", userDetails.getAuthorities())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigninKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public String extractUserName(String token) {
        return extraClaim(token, Claims::getSubject); // will return email stored in particular token
    }

    private <T> T extraClaim(String token, Function<Claims, T> claimsResolvers){
        final Claims claims = extractAllClaims(token); // extractAllClaims -> get a particular token
        return claimsResolvers.apply(claims);
    }

    private Key getSigninKey(){
        byte[] key = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(key);
    }


    private Claims extractAllClaims(String token){
        //will return all the claims from our token
        return Jwts.parserBuilder().setSigningKey(getSigninKey()).build().parseClaimsJws(token).getBody();
    }
    // checks whether a token is currently valid
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenAboutToExpire(String token) {
        Date expirationDate = extractAllClaims(token).getExpiration();
        long thresholdMillis = 60 * 1000; // 60sec
        Date currentDateTime = new Date();
        // Check if the token is already expired or about to expire within the threshold
        return expirationDate.before(currentDateTime) || expirationDate.getTime() - currentDateTime.getTime() < thresholdMillis;
    }
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    public boolean isRefreshTokenValid(String token, UserDetails userDetails) {
        try {
            // Check if the token is expired
            Claims claims = extractAllClaims(token);
            if (claims.getExpiration().before(new Date())) {
                return false;
            }

            // Check if the token's subject matches the user's username
            String username = claims.getSubject();
            if (username == null || !username.equals(userDetails.getUsername())) {
                return false;
            }

            return true; // valid
        } catch (Exception e) {
            return false; // invalid
        }
    }

}