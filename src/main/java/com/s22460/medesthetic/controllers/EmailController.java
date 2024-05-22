package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.services.EmailService;
import com.s22460.medesthetic.services.UserService;
import com.s22460.medesthetic.utils.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
public class EmailController {
    private EmailService emailService;
    private final UserService userService;

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

}
