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
    private Long userId;

    public static BannedUserDTO fromEntity(BannedUser bannedUser) {
        BannedUserDTO dto = new BannedUserDTO();
        dto.setId(bannedUser.getId());
        dto.setReason(bannedUser.getReason());
        dto.setUserName(bannedUser.getUser().getFirstName() + " " + bannedUser.getUser().getLastName());
        dto.setUserId(bannedUser.getUser().getId());

        return dto;
    }
}