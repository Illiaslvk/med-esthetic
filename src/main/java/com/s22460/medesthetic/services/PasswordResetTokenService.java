package com.s22460.medesthetic.services;

import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.utils.NotFoundException;

public interface PasswordResetTokenService {
    String createPasswordResetToken(User user);
    boolean validatePasswordResetToken(String token);
    User getUserByPasswordResetToken(String token) throws NotFoundException;
}
