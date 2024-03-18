package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.dtos.Mapper;
import com.s22460.medesthetic.dtos.UserDTO;
import com.s22460.medesthetic.entities.BannedUser;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.BannedUserRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final BannedUserRepository bannedUserRepository;

    //loadUserByUsername
    @Override
    public UserDetailsService userDetailsService() {
        return email -> userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        getUserById(id); // Ensure the user exists
        user.setId(id);// Set the id of the provided user to the existing user id
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        getUserById(id);
        userRepository.deleteById(id);
    }

    @Override
    public User findByFullName(String firstName, String lastName) {
        return userRepository.findByFirstNameAndLastName(firstName, lastName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    //Block User
    @Override
    public UserDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return Mapper.convertToDTO(user);
    }

    @Override
    public void banUserByEmail(String adminEmail, String userToBanEmail, String banReason) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));

        if (admin.isAdmin()) {
            User userToBan = userRepository.findByEmail(userToBanEmail)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            if (!userToBan.isBanned()) {
                userToBan.banUser();

                // Save user with ban status
                userRepository.save(userToBan);

                // add reason for ban
                BannedUser bannedUser = new BannedUser();
                bannedUser.setUser(userToBan);
                bannedUser.setReason(banReason);

                bannedUserRepository.save(bannedUser);
            } else {
                throw new IllegalStateException("User is already banned");
            }
        } else {
            throw new IllegalStateException("Only admins can ban users");
        }
    }

    @Override
    public void unbanUserByEmail(String adminEmail, String userToUnbanEmail) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));

        if (!admin.isAdmin()) {
            throw new AccessDeniedException("Only admins can unban users");
        }

        User userToUnban = userRepository.findByEmail(userToUnbanEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (userToUnban.isBanned()) {
            userToUnban.unbanUser();

            // Save user with unban status
            userRepository.save(userToUnban);

            // Remove BannedUser entity
            BannedUser bannedUser = bannedUserRepository.findByUser(userToUnban)
                    .orElseThrow(() -> new IllegalStateException("BannedUser entry not found"));
            bannedUserRepository.delete(bannedUser);
        } else {
            throw new IllegalStateException("User is not currently banned");
        }
    }

    public User findUserByFirstName(String firstName) {
        return userRepository.findByFirstName(firstName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found by first name: " + firstName));
    }

}
