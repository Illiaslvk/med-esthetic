package com.s22460.medesthetic.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CancelAppointmentRequestDTO {
    private Long appointmentId;
    private String cancellationReason;
}
