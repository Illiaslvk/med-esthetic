package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.PasswordResetRequestDTO;
import com.s22460.medesthetic.dtos.PasswordResetTokenRequestDTO;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.EmailService;
import com.s22460.medesthetic.services.PasswordResetTokenService;
import com.s22460.medesthetic.services.UserService;
import com.s22460.medesthetic.services.impl.auth.AuthenticationService;
import com.s22460.medesthetic.utils.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
public class EmailController {
    private final EmailService emailService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordResetTokenService passwordResetTokenService;
    private final AuthenticationService authenticationService;
    @PostMapping("/send")
    public String sendEmail(String to, String subject, String body) {
        return emailService.sendEmail(to, subject, body);
    }

    @PutMapping("/{userId}/reminders")
    public ResponseEntity<String> updateRemindersPreference(@PathVariable Long userId, @RequestBody Map<String, Boolean> remindersEnabledMap) {
        try {
            boolean remindersEnabled = remindersEnabledMap.get("remindersEnabled");
            userService.updateRemindersPreference(userId, remindersEnabled);

            // Send a test email immediately
            if (remindersEnabled) {
                emailService.sendReminderEmail(userService.getUserById(userId).getEmail(), "Test Reminder", "This is a test reminder email.");
            }

            return ResponseEntity.ok("Reminders preference updated successfully and test email sent");
        } catch (NotFoundException e) {
            return ResponseEntity.status(404).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating the reminders preference");
        }
    }

    @PostMapping("/request-password-reset")
    public ResponseEntity<String> requestPasswordReset(@RequestBody PasswordResetRequestDTO passwordResetRequest) {
        Optional<User> userOptional = userRepository.findByEmail(passwordResetRequest.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOptional.get();
        String token = passwordResetTokenService.createPasswordResetToken(user);
        String resetUrl = "http://localhost:3000/reset-password?token=" + token;

        try {
            emailService.sendEmail(user.getEmail(), "Password Reset Request", "Click the link to reset your password: " + resetUrl);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email");
        }

        return ResponseEntity.ok("Password reset email sent");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetTokenRequestDTO passwordResetTokenRequest) {
        boolean isValid = passwordResetTokenService.validatePasswordResetToken(passwordResetTokenRequest.getToken());
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired password reset token");
        }

        try {
            User user = passwordResetTokenService.getUserByPasswordResetToken(passwordResetTokenRequest.getToken());
            authenticationService.updatePassword(user, passwordResetTokenRequest.getNewPassword());
            return ResponseEntity.ok("Password reset successfully");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

}
