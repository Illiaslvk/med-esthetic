package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.dtos.CreateAppointmentRequestDTO;
import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.entities.Appointment;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.AppointmentRepository;
import com.s22460.medesthetic.repository.AppoServiceRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.AppointmentService;
import com.s22460.medesthetic.services.EmailService;
import com.s22460.medesthetic.services.HolidayService;
import com.s22460.medesthetic.utils.NotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final AppoServiceRepository appoServiceRepository;
    private final EmailService emailService;
    private final HolidayService holidayService;

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll()
                .stream()
                .filter(appointment -> !appointment.isCanceled())
                .collect(Collectors.toList());
    }

    @Override
    public List<Appointment> getAllCanceledAppointments() {
        return appointmentRepository.findByCanceledTrue();
    }

    @Override
    public Appointment getAppointmentById(Long appointmentId) {
        return appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new NotFoundException("Appointment not found with ID: " + appointmentId));
    }

    public Appointment createAppointment(CreateAppointmentRequestDTO requestDTO, User user) {
        AppoService appoService = appoServiceRepository.findById(requestDTO.getServiceId())
                .orElseThrow(() -> new NotFoundException("AppoService not found with ID: " + requestDTO.getServiceId()));
        User employee = userRepository.findById(requestDTO.getEmployeeId())
                .orElseThrow(() -> new NotFoundException("Employee not found with ID: " + requestDTO.getEmployeeId()));

        if (isOverlappingAppointment(requestDTO.getDate(), requestDTO.getTime(), employee.getId())) {
            throw new IllegalArgumentException("Appointment time overlaps with an existing appointment.");
        }

        if (hasUserMultipleBookings(requestDTO.getDate(), requestDTO.getTime(), user.getEmail())) {
            throw new IllegalArgumentException("User already has an appointment at the requested time.");
        }

        if (holidayService.isHoliday(requestDTO.getEmployeeId(), requestDTO.getDate())) {
            throw new IllegalStateException("Cannot book appointment on a holiday");
        }

        Appointment appointment = new Appointment();
        appointment.setUser(employee);
        appointment.setAppoService(appoService);
        appointment.setDate(requestDTO.getDate());
        appointment.setTime(requestDTO.getTime());
        appointment.setCanceled(false);
        appointment.setUserEmail(user.getEmail());

        scheduleReminder(appointment);

        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment cancelAppointment(Long appointmentId, String cancellationReason) {
        Appointment appointment = getAppointmentById(appointmentId);

        if (appointment.isCanceled()) {
            throw new IllegalArgumentException("Appointment is already canceled");
        }

        LocalDateTime appointmentDateTime = appointment.getDate().atTime(LocalTime.parse(appointment.getTime().split("-")[0]));
        LocalDateTime now = LocalDateTime.now();

        if (appointmentDateTime.isBefore(now.plusHours(2))) {
            throw new IllegalArgumentException("Cannot cancel the appointment less than 2 hours before the appointment time");
        }

        appointment.setCanceled(true);
        appointment.setCancellationReason(cancellationReason);

        appointmentRepository.save(appointment);

        return appointment;
    }

    @Override
    public void deleteAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new NotFoundException("Appointment not found with ID: " + appointmentId));

        appointmentRepository.delete(appointment);
    }

    @Override
    public List<String> getBookedTimesForEmployeeAndDate(Long employeeId, LocalDate date) {
        List<Appointment> appointments = appointmentRepository.findByUserIdAndDate(employeeId, date);
        List<String> bookedTimes = appointments.stream()
                .map(Appointment::getTime)
                .collect(Collectors.toList());
        return bookedTimes;
    }

    @Override
    public List<Appointment> getAllBookedAppo() {
        return appointmentRepository.findByCanceledFalse();
    }

    @Override
    public List<Appointment> getAllBookedAppoForUser(String userEmail) {
        return appointmentRepository.findByUserEmailAndCanceledFalse(userEmail);
    }

    @Override
    public List<Appointment> getAllBookedAppoForEmployee(Long employeeId) {
        return appointmentRepository.findByUserIdAndCanceledFalse(employeeId);
    }

    private boolean isOverlappingAppointment(LocalDate date, String time, Long employeeId) {
        List<Appointment> appointments = appointmentRepository.findByUserIdAndDate(employeeId, date);
        for (Appointment appointment : appointments) {
            // Check if the requested time matches an existing appointment time
            if (appointment.getTime().equals(time)) {
                return true;
            }
            // Split the booked time
            String[] bookedTimeRange = appointment.getTime().split("-");
            String bookedStartTime = bookedTimeRange[0];
            String bookedEndTime = bookedTimeRange[1];
            // Split the requested time
            String[] requestedTimeRange = time.split("-");
            String requestedStartTime = requestedTimeRange[0];
            String requestedEndTime = requestedTimeRange[1];

            if (requestedStartTime.equals(bookedStartTime) || requestedEndTime.equals(bookedEndTime)) {
                return true;
            }
        }
        return false;
    }

    private boolean hasUserMultipleBookings(LocalDate date, String time, String userEmail) {
        List<Appointment> appointments = appointmentRepository.findByUserEmailAndDate(userEmail, date);
        //check if any of the appointments match the requested time
        return appointments.stream().anyMatch(appointment -> appointment.getTime().equals(time));
    }

    private void scheduleReminder(Appointment appointment) {
        String startTime = appointment.getTime().split("-")[0];//split string[10:00-11:00] in 2 arrays and take 1st
        System.out.println("scheduleReminder startTime"+startTime);
        LocalDateTime appoDateTime = appointment.getDate().atTime(LocalTime.parse(startTime));
        LocalDateTime reminderTime = appoDateTime.minusHours(2);
        appointment.setReminderScheduledTime(reminderTime);
        appointment.setReminderSent(false);
    }

    //runs every hour and checks appointments with scheduled reminder times within the past hour that have not yet had a reminder sent
    @Scheduled(cron = "0 0 * * * *") // Run every hour
    public void sendReminders() {
        List<Appointment> appointments = appointmentRepository.findAll()
                .stream()
                .filter(appointment -> !appointment.isReminderSent() && appointment.getReminderScheduledTime().isBefore(LocalDateTime.now()))
                .collect(Collectors.toList());

        for (Appointment appointment : appointments) {
            if (appointment.getUser().isRemindersEnabled()) {
                sendReminder(appointment);
            }
        }
    }
    //change to private
    public void sendReminder(Appointment appointment) {
        String to = appointment.getUserEmail();
        String subject = "Appointment Reminder";
        String body = String.format("This is a reminder for your appointment on %s at %s for the service %s.",
                appointment.getDate(),
                appointment.getTime(),
                appointment.getAppoService().getServiceName());
        emailService.sendEmail(to, subject, body);
        appointment.setReminderSent(true);
        appointmentRepository.save(appointment);
    }


}
