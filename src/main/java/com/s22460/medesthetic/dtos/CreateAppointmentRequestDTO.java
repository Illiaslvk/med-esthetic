package com.s22460.medesthetic.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateAppointmentRequestDTO {
    private Long employeeId;
    private Long serviceId;
    private LocalDate date;
    private String time;
}