package com.s22460.medesthetic.services;

import com.s22460.medesthetic.dtos.UserDTO;
import com.s22460.medesthetic.entities.Appointment;
import com.s22460.medesthetic.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;


public interface UserService {
    UserDetailsService userDetailsService();

    List<User> getAllUsers();

    User getUserById(Long id);

    User addUser(User user);

    User updateUser(Long id, User user);

    void deleteUser(Long id);

    User findByFullName(String firstName, String lastName);

    // Block Users
    UserDTO getUserProfile(Long userId);
    void banUserByEmail(String adminEmail, String userToBanEmail, String banReason);

    void unbanUserByEmail(String adminEmail, String userToUnbanEmail);
}
