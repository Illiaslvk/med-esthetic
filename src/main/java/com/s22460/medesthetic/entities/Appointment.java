package com.s22460.medesthetic.entities;

import com.s22460.medesthetic.utils.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "appointment")
@NoArgsConstructor
@AllArgsConstructor
@Builder
//@ToString
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Future(message = "Date should be in the future")
    private LocalDate date;

    private boolean canceled;

    @Column(name = "cancellation_reason", length = 50)
    private String cancellationReason;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = true) // Nullable because it's optional
    private AppoService appoService;

//    @Enumerated(EnumType.STRING)
//    @Column(name = "employee_role", nullable = false)
//    private Role employeeRole;

    // Getters and setters

}