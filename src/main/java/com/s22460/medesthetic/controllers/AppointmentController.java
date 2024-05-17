package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.AppointmentDTO;
import com.s22460.medesthetic.dtos.CreateAppointmentRequestDTO;
import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.entities.Appointment;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.AppoServiceService;
import com.s22460.medesthetic.services.AppointmentService;
import com.s22460.medesthetic.services.UserService;
import com.s22460.medesthetic.utils.NotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final AppoServiceService appoServiceService;
    private final UserRepository userRepository;


    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        List<AppointmentDTO> appointmentDTOs = appointments.stream()
                .map(AppointmentDTO::fromEntity)
                .collect(Collectors.toList());
        return new ResponseEntity<>(appointmentDTOs, HttpStatus.OK);
    }

    @GetMapping("/appointments/{id}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        if (appointment != null) {
            AppointmentDTO appointmentDTO = AppointmentDTO.fromEntity(appointment);
            return ResponseEntity.ok(appointmentDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/appointments/canceled")
    public ResponseEntity<List<AppointmentDTO>> getAllCanceledAppointments() {
        List<Appointment> canceledAppointments = appointmentService.getAllCanceledAppointments();
        List<AppointmentDTO> canceledAppointmentDTOs = canceledAppointments.stream()
                .map(AppointmentDTO::fromEntity)
                .collect(Collectors.toList());
        return new ResponseEntity<>(canceledAppointmentDTOs, HttpStatus.OK);
    }

    @PostMapping("/appointments/cancel/{appointmentId}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long appointmentId,@RequestBody String cancellationReason) {
        try {
            appointmentService.cancelAppointment(appointmentId, cancellationReason);
            return new ResponseEntity<>("Appointment canceled successfully", HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while processing the request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/appointments/create")
    public ResponseEntity<AppointmentDTO> createAppointment(@Valid @RequestBody CreateAppointmentRequestDTO requestDTO, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("User not found"));

        Appointment appointment = appointmentService.createAppointment(requestDTO, user);
        AppointmentDTO appointmentDTO = AppointmentDTO.fromEntity(appointment);
        return new ResponseEntity<>(appointmentDTO, HttpStatus.CREATED);
    }


    @GetMapping("/appointments/employee/{employeeId}/date/{date}/booked-times")
    public ResponseEntity<List<String>> getBookedTimesForDate(@PathVariable Long employeeId, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<String> bookedTimes = appointmentService.getBookedTimesForEmployeeAndDate(employeeId, date);
        return new ResponseEntity<>(bookedTimes, HttpStatus.OK);
    }

//    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/appointments/booked")
    public ResponseEntity<List<AppointmentDTO>> getAllBookedAppointments() {
        List<Appointment> bookedAppo = appointmentService.getAllBookedAppo();
        List<AppointmentDTO> bookedAppoDTOs = bookedAppo.stream()
                .map(AppointmentDTO::fromEntity)
                .collect(Collectors.toList());
        return new ResponseEntity<>(bookedAppoDTOs, HttpStatus.OK);
    }

    @GetMapping("/appo/booked")
    public ResponseEntity<List<AppointmentDTO>> getAllBookedAppointmentsForUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails.getAuthorities().contains(new SimpleGrantedAuthority("EMPLOYEE"))) {
            // Fetch appointments for employee
            Long employeeId = getUserIdFromUserDetails(userDetails);
            List<Appointment> bookedAppo = appointmentService.getAllBookedAppoForEmployee(employeeId);
            List<AppointmentDTO> bookedAppoDTOs = bookedAppo.stream()
                    .map(AppointmentDTO::fromEntity)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(bookedAppoDTOs, HttpStatus.OK);
        } else {
            // Fetch appointments for regular user
            String userEmail = userDetails.getUsername();
            List<Appointment> bookedAppo = appointmentService.getAllBookedAppoForUser(userEmail);
            List<AppointmentDTO> bookedAppoDTOs = bookedAppo.stream()
                    .map(AppointmentDTO::fromEntity)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(bookedAppoDTOs, HttpStatus.OK);
        }
    }

    private Long getUserIdFromUserDetails(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername()).get().getId();
    }
}