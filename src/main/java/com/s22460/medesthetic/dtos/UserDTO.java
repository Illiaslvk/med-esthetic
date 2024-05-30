package com.s22460.medesthetic.dtos;

import com.s22460.medesthetic.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private boolean banned;
    private String additionalInfo; // banned status message
    private boolean remindersEnabled;
    private String role;

    public static UserDTO fromEntity(User user) {
        UserDTO dto = new UserDTO();
        dto.id = user.getId();
        dto.firstName = user.getFirstName();
        dto.lastName = user.getLastName();
        dto.email = user.getEmail();
        dto.banned = user.isBanned();
        dto.remindersEnabled = user.isRemindersEnabled();
        dto.role = user.getRole().name();

        return dto;
    }
}