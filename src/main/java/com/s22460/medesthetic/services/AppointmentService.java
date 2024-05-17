package com.s22460.medesthetic.services;

import com.s22460.medesthetic.dtos.CreateAppointmentRequestDTO;
import com.s22460.medesthetic.entities.Appointment;
import com.s22460.medesthetic.entities.User;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {

    List<Appointment> getAllAppointments();
    Appointment getAppointmentById(Long appointmentId);
    List<Appointment> getAllCanceledAppointments();
//    Appointment createAppointment(CreateAppointmentRequestDTO requestDTO);
    Appointment createAppointment(CreateAppointmentRequestDTO requestDTO, User user);
    Appointment cancelAppointment(Long appointmentId, String cancellationReason);
    List<String> getBookedTimesForEmployeeAndDate(Long employeeId, LocalDate date);
    List<Appointment> getAllBookedAppo();
    List<Appointment> getAllBookedAppoForUser(String userEmail);
    List<Appointment> getAllBookedAppoForEmployee(Long employeeId);

}