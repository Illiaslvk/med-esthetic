package com.s22460.medesthetic.Tests;

import com.s22460.medesthetic.dtos.AppointmentDTO;
import com.s22460.medesthetic.services.impl.EmailServiceImpl;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class EmailReminderTest {

    @InjectMocks
    private EmailServiceImpl emailService;

    @Mock
    private JavaMailSender emailSender;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSendEmail() {
        String to = "test@example.com";
        String subject = "Test Subject";
        String body = "Test Body";

        emailService.sendEmail(to, subject, body);

        ArgumentCaptor<SimpleMailMessage> messageCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(emailSender).send(messageCaptor.capture());
        SimpleMailMessage sentMessage = messageCaptor.getValue();

        assertEquals(to, sentMessage.getTo()[0]);
        assertEquals(subject, sentMessage.getSubject());
        assertEquals(body, sentMessage.getText());
    }

    @Test
    public void testSendReminderEmail() throws MessagingException {
        // Create a mock MimeMessage
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(emailSender.createMimeMessage()).thenReturn(mimeMessage);

        // Call the method under test
        emailService.sendReminderEmail("illiaslvk@gmail.com", "Test Subject", "Test Body");

        // Verify interactions
        verify(emailSender, times(1)).send(mimeMessage);
    }

    @Test
    public void testSendEmailWithAppointmentDTO() {
        AppointmentDTO appointmentDTO = new AppointmentDTO();
        appointmentDTO.setUserEmail("test@example.com");
        appointmentDTO.setServiceName("Service Name");
        appointmentDTO.setEmpName("Employee Name");
        appointmentDTO.setDate("2024-05-22");
        appointmentDTO.setTime("10:00 AM");
        appointmentDTO.setDuration(60);

        String to = appointmentDTO.getUserEmail();
        String subject = "Appointment Reminder";
        String body = String.format("Dear %s, you have an appointment for %s on %s at %s.",
                appointmentDTO.getEmpName(), appointmentDTO.getServiceName(), appointmentDTO.getDate(), appointmentDTO.getTime());

        emailService.sendEmail(to, subject, body);

        ArgumentCaptor<SimpleMailMessage> messageCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(emailSender).send(messageCaptor.capture());
        SimpleMailMessage sentMessage = messageCaptor.getValue();

        assertEquals(to, sentMessage.getTo()[0]);
        assertEquals(subject, sentMessage.getSubject());
        assertEquals(body, sentMessage.getText());
    }
}
