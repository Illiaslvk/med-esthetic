package com.s22460.medesthetic.Tests;

import com.s22460.medesthetic.dtos.CreateAppointmentRequestDTO;
import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.entities.Appointment;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.AppointmentRepository;
import com.s22460.medesthetic.repository.AppoServiceRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.HolidayService;
import com.s22460.medesthetic.services.impl.AppointmentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class AppointmentBookingTest {

    @Mock //isolate the code being tested and ensure that it functions correctly in isolation from its dependencies
    private AppointmentRepository appointmentRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AppoServiceRepository appoServiceRepository;

    @Mock
    private HolidayService holidayService;

    @InjectMocks
    private AppointmentServiceImpl appointmentService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateAppointment() {
        // Arrange
        User user = new User();
        user.setId(1L);
        user.setEmail("user@gmail.com");

        User employee = new User();
        employee.setId(2L);

        AppoService appoService = new AppoService();
        appoService.setId(1L);

        CreateAppointmentRequestDTO requestDTO = new CreateAppointmentRequestDTO();
        requestDTO.setServiceId(1L);
        requestDTO.setEmployeeId(2L);
        requestDTO.setDate(LocalDate.of(2024, 6, 1));
        requestDTO.setTime("10:00-11:00");

        when(appoServiceRepository.findById(1L)).thenReturn(Optional.of(appoService));
        when(userRepository.findById(2L)).thenReturn(Optional.of(employee));
        when(holidayService.isHoliday(2L, LocalDate.of(2024, 6, 1))).thenReturn(false);
        when(appointmentRepository.save(any(Appointment.class))).thenAnswer(inv -> inv.getArgument(0));

        appointmentService.createAppointment(requestDTO, user);
        // captures arguments passed to mocked methods
        ArgumentCaptor<Appointment> appointmentCaptor = ArgumentCaptor.forClass(Appointment.class);
        verify(appointmentRepository, times(1)).save(appointmentCaptor.capture());
        Appointment savedAppointment = appointmentCaptor.getValue();

        assertNotNull(savedAppointment); // The appointment should not be null
        assertEquals(user.getEmail(), savedAppointment.getUserEmail()); // Check user email
        assertEquals(appoService, savedAppointment.getAppoService()); // Check Service
        assertEquals(LocalDate.of(2024, 6, 1), savedAppointment.getDate()); // Check date
        assertEquals("10:00-11:00", savedAppointment.getTime()); // Check time
        assertFalse(savedAppointment.isCanceled()); // Check if not canceled
    }
}