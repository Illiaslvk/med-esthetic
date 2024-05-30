package com.s22460.medesthetic.dtos;

import com.s22460.medesthetic.entities.Appointment;
import com.s22460.medesthetic.entities.BannedUser;
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
    private String userName;
    private String email;
    private Long userId;

    public static BannedUserDTO fromEntity(BannedUser bannedUser) {
        BannedUserDTO dto = new BannedUserDTO();
        dto.id = bannedUser.getId();
        dto.reason = bannedUser.getReason();
        dto.userName = bannedUser.getUser().getFirstName() + " " + bannedUser.getUser().getLastName();
        dto.userId = bannedUser.getUser().getId();
        dto.email = bannedUser.getEmail();
        return dto;
    }

}