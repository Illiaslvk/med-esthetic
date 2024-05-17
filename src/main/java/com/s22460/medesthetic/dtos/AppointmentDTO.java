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
    private String date;
    private String time;
    private boolean canceled;
    private String cancellationReason;
    private String serviceName;
    private String empName;
    private String userEmail;
    private int duration;

    public static AppointmentDTO fromEntity(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.id = appointment.getId();
        dto.serviceName = appointment.getAppoService().getServiceName();
        dto.empName = appointment.getUser().getFirstName() + " " + appointment.getUser().getLastName();
        dto.userEmail = appointment.getUserEmail();
        dto.date = appointment.getDate().toString();
        dto.canceled = appointment.isCanceled();
        dto.time = (appointment.getTime());
        dto.cancellationReason = appointment.getCancellationReason();
        dto.setDuration(appointment.getAppoService().getDuration());
        return dto;
    }
}