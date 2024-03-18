package com.s22460.medesthetic.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BannedUserDTO {

    private Long id;

    private String reason;

    @Email(message = "Invalid email address")
    @NotBlank(message = "Email cannot be blank")
    private String userEmail;

    @NotBlank(message = "First name cannot be blank")
    private String userFirstName;

    @NotBlank(message = "Last name cannot be blank")
    private String userLastName;
}