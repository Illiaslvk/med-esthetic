package com.s22460.medesthetic.dtos;

import com.s22460.medesthetic.entities.AvailableSlots;
import com.s22460.medesthetic.entities.User;

public class Mapper {
    //helper to convert between entity and dto
    public static UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setBanned(user.isBanned());

        return userDTO;
    }

    public static AvailableSlotsDTO convertAvailableSlotsToDTO(AvailableSlots availableSlots) {
        AvailableSlotsDTO dto = new AvailableSlotsDTO();
        dto.setId(availableSlots.getId());
        dto.setDate(availableSlots.getDate());
        dto.setStartTime(availableSlots.getStartTime());
        dto.setEndTime(availableSlots.getEndTime());
        return dto;
    }

    public static AvailableSlots convertAvailableSlotsToEntity(AvailableSlotsDTO dto) {
        AvailableSlots availableSlots = new AvailableSlots();
        availableSlots.setId(dto.getId());
        availableSlots.setDate(dto.getDate());
        availableSlots.setStartTime(dto.getStartTime());
        availableSlots.setEndTime(dto.getEndTime());
        return availableSlots;
    }

}
