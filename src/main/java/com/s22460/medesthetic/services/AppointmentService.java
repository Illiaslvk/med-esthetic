package com.s22460.medesthetic.services;

import com.s22460.medesthetic.dtos.AppointmentDTO;
import com.s22460.medesthetic.dtos.CreateAppointmentRequestDTO;
import com.s22460.medesthetic.entities.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentService {

    List<Appointment> getAllAppointments();
    Appointment getAppointmentById(Long appointmentId);
    List<Appointment> getAllCanceledAppointments();

    //Appo possibilities
//    Appointment addAppointment(Appointment appointment, Long serviceId);
    Appointment createAppointment(CreateAppointmentRequestDTO requestDTO);
    Appointment cancelAppointment(Long appointmentId, String cancellationReason);

}
