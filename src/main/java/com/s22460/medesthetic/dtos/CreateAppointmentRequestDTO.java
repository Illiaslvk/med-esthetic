package com.s22460.medesthetic.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAppointmentRequestDTO {
    private Long employeeId;
    private Long serviceId;
    private LocalDate date;
    private String time;
}