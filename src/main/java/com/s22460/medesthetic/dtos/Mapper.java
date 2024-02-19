package com.s22460.medesthetic.dtos;

import com.s22460.medesthetic.entities.User;

public class Mapper {

    public static UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setBanned(user.isBanned());

        return userDTO;
    }


}
