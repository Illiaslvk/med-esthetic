package com.s22460.medesthetic.dtos;

import com.s22460.medesthetic.entities.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {

    private Long id;
    private String serviceName;
    private String userEmail;
    private String date;
    private boolean canceled;
    private String cancellationReason;

    public static AppointmentDTO fromEntity(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.id = appointment.getId();
        dto.serviceName = appointment.getAppoService().getServiceName();
        dto.userEmail = appointment.getUser().getEmail();
        dto.date = appointment.getDate().toString();
        dto.canceled = appointment.isCanceled();
        dto.cancellationReason = appointment.getCancellationReason();
        return dto;
    }
}
