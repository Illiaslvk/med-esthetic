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


    @Override
    public Appointment createAppointment(CreateAppointmentRequestDTO requestDTO) {
        // Validate the request
        if (requestDTO == null || requestDTO.getAppoServiceId() == null || requestDTO.getUserEmail() == null || requestDTO.getDate() == null) {
            throw new IllegalArgumentException("Invalid appointment request. Please provide all required fields.");
        }

        // Fetch user and appoService entities from the database
        User user = userRepository.findByEmail(requestDTO.getUserEmail())
                .orElseThrow(() -> new NotFoundException("User not found with email: " + requestDTO.getUserEmail()));

        AppoService appoService = appoServiceRepository.findById(requestDTO.getAppoServiceId())
                .orElseThrow(() -> new NotFoundException("AppoService not found with ID: " + requestDTO.getAppoServiceId()));

        // Create the Appointment entity
        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setAppoService(appoService);
        appointment.setDate(requestDTO.getDate());
        appointment.setCanceled(false);

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


}
