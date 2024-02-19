package com.s22460.medesthetic.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAppointmentRequestDTO {
    private Long appoServiceId;
    private String userEmail;
    private LocalDate date;


}
