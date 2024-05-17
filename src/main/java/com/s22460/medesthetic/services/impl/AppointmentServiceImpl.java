package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.dtos.CreateAppointmentRequestDTO;
import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.entities.Appointment;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.AppointmentRepository;
import com.s22460.medesthetic.repository.AppoServiceRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.AppointmentService;
import com.s22460.medesthetic.utils.NotFoundException;
import com.s22460.medesthetic.utils.Role;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final AppoServiceRepository appoServiceRepository;


    @Override
    //all not cancelled appos
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
        // Validate the request
        // Fetch appoService entity from the database
        AppoService appoService = appoServiceRepository.findById(requestDTO.getServiceId())
                .orElseThrow(() -> new NotFoundException("AppoService not found with ID: " + requestDTO.getServiceId()));

        // Fetch the employee entity from the database using the provided employeeId
        User employee = userRepository.findById(requestDTO.getEmployeeId())
                .orElseThrow(() -> new NotFoundException("Employee not found with ID: " + requestDTO.getEmployeeId()));

        // Create the Appointment entity
        Appointment appointment = new Appointment();
        appointment.setUser(employee);
        appointment.setAppoService(appoService);
        appointment.setDate(requestDTO.getDate());
        appointment.setTime(requestDTO.getTime());
        appointment.setCanceled(false);
        appointment.setUserEmail(user.getEmail());
        // Save the appointment to the database
        return appointmentRepository.save(appointment);
    }




    @Override
    @Transactional
    public Appointment cancelAppointment(Long appointmentId, String cancellationReason) {
        Appointment appointment = getAppointmentById(appointmentId);

        if (appointment.isCanceled()) {
            throw new IllegalArgumentException("Appointment is already canceled");
        }

        appointment.setCanceled(true);
        appointment.setCancellationReason(cancellationReason);

        appointmentRepository.save(appointment);

        return appointment;
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



}