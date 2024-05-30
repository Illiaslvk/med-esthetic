package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.entities.PasswordResetToken;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.PasswordResetTokenRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.PasswordResetTokenService;
import com.s22460.medesthetic.utils.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    @Value("${password.reset.token.expiration}")
    private Long tokenExpiration;

    @Override
    public String createPasswordResetToken(User user) {
        //UUID.randomUUID - generates unique identifier
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user, LocalDateTime.now().plusMinutes(tokenExpiration));
        passwordResetTokenRepository.save(passwordResetToken);
        return token;
    }

    @Override
    public boolean validatePasswordResetToken(String token) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
        return passwordResetToken != null && passwordResetToken.getExpirationDate().isAfter(LocalDateTime.now());
    }

    @Override
    public User getUserByPasswordResetToken(String token) throws NotFoundException {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
        if (passwordResetToken == null) {
            throw new NotFoundException("Invalid token");
        }
        return passwordResetToken.getUser();
    }
}
