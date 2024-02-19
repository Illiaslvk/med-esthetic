package com.s22460.medesthetic.dtos;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private boolean banned;
    private String additionalInfo; // banned status message

}