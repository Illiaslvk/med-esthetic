package com.s22460.medesthetic.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "service")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppoService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Service name cannot be blank")
    private String serviceName;

    // Duration in minutes
    private int duration;

    private String price;

    @OneToMany(mappedBy = "appoService", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointments;
}
