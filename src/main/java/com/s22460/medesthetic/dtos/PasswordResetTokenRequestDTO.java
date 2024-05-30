package com.s22460.medesthetic.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetTokenRequestDTO {
    private String token;
    private String newPassword;
}
