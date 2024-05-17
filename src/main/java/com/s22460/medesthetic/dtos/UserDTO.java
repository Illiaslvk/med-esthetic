package com.s22460.medesthetic.dtos;

import com.s22460.medesthetic.entities.User;
import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private boolean banned;
    private String additionalInfo; // banned status message

    public static UserDTO fromEntity(User user) {
        UserDTO dto = new UserDTO();
        dto.id = user.getId();
        dto.firstName = user.getFirstName();
        dto.lastName = user.getLastName();
        dto.email = user.getEmail();
        dto.banned = user.isBanned();
        return dto;
    }
}