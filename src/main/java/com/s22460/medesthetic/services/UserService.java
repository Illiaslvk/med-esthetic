package com.s22460.medesthetic.services;

import com.s22460.medesthetic.dtos.AvailableSlotsDTO;
import com.s22460.medesthetic.dtos.BannedUserDTO;
import com.s22460.medesthetic.dtos.UserDTO;
import com.s22460.medesthetic.entities.AvailableSlots;
import com.s22460.medesthetic.entities.BannedUser;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.utils.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.time.LocalDate;
import java.util.List;


public interface UserService {
    UserDetailsService userDetailsService();

    List<User> getAllUsers();

    User getUserById(Long id);

    User addUser(User user);

    User updateUser(Long id, User user);

    void deleteUser(Long id);

    User findByFullName(String firstName, String lastName);

    UserDTO getUserProfile(Long userId);

    void updateUserRole(Long userId, Role newRole);

    List<User> getAllEmployees();

    AvailableSlotsDTO addAvailabilitySlot(Long employeeId, AvailableSlotsDTO availableSlotsDTO);
    AvailableSlotsDTO updateAvailabilitySlot(Long employeeId, Long availabilitySlotId, AvailableSlotsDTO availableSlotsDTO);
    void deleteAvailabilitySlot(Long employeeId, Long availabilitySlotId);

    void clearAvailabilitySlots(Long userId);

    List<BannedUserDTO> getAllBannedUsers();

    void unbanUser(Long userId);

    void banUser(Long userId, String reason);

}
