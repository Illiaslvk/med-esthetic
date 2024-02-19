package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.AppointmentDTO;
import com.s22460.medesthetic.dtos.CreateAppointmentRequestDTO;
import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.entities.Appointment;
import com.s22460.medesthetic.services.AppoServiceService;
import com.s22460.medesthetic.services.AppointmentService;
import com.s22460.medesthetic.utils.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final AppoServiceService appoServiceService;

    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        List<AppointmentDTO> appointmentDTOs = appointments.stream()
                .map(AppointmentDTO::fromEntity)
                .collect(Collectors.toList());
        return new ResponseEntity<>(appointmentDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        if (appointment != null) {
            AppointmentDTO appointmentDTO = AppointmentDTO.fromEntity(appointment);
            return ResponseEntity.ok(appointmentDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/canceled")
    public ResponseEntity<List<AppointmentDTO>> getAllCanceledAppointments() {
        List<Appointment> canceledAppointments = appointmentService.getAllCanceledAppointments();
        List<AppointmentDTO> canceledAppointmentDTOs = canceledAppointments.stream()
                .map(AppointmentDTO::fromEntity)
                .collect(Collectors.toList());
        return new ResponseEntity<>(canceledAppointmentDTOs, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createAppointment(@RequestBody CreateAppointmentRequestDTO requestDTO) {
        try {
            appointmentService.createAppointment(requestDTO);
            return new ResponseEntity<>("Appointment created successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while processing the request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/cancel/{appointmentId}")
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




}
