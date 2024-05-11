package com.s22460.medesthetic.dtos;

import com.s22460.medesthetic.entities.Appointment;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
public class CreateAppointmentRequestDTO {

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotNull(message = "Service ID is required")
    private Long serviceId;

    @NotNull(message = "Date is required")
    @Future(message = "Date should be in the future")
    private LocalDate date;

    @NotBlank(message = "Time is required")
    private String time;

    @NotBlank(message = "Full Name is required")
    private String fullName;

    @NotBlank(message = "User Email is required")
    @Email(message = "Invalid email format")
    private String userEmail;
}