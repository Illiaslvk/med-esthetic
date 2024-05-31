package com.s22460.medesthetic.services;

import jakarta.mail.MessagingException;

public interface EmailService {
    String sendEmail(String to, String subject, String body);
    void sendReminderEmail(String email, String testReminder, String s) throws MessagingException;

}
