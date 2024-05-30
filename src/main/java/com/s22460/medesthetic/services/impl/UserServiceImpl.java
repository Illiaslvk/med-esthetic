package com.s22460.medesthetic.services.impl;

import com.s22460.medesthetic.dtos.*;
import com.s22460.medesthetic.entities.AvailableSlots;
import com.s22460.medesthetic.entities.BannedUser;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.AvailableSlotsRepository;
import com.s22460.medesthetic.repository.BannedUserRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.UserService;
import com.s22460.medesthetic.utils.NotFoundException;
import com.s22460.medesthetic.utils.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final BannedUserRepository bannedUserRepository;
    private final AvailableSlotsRepository availableSlotsRepository;

    //loadUserByUsername
    @Override
    public UserDetailsService userDetailsService() {
        return email -> userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setLastLoginTime(LocalDateTime.now());
        userRepository.save(user);
        return user;
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
    public void banUser(Long userId, String reason) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        BannedUser bannedUser = new BannedUser();
        bannedUser.setUser(user);
        bannedUser.setReason(reason);
        bannedUser.setEmail(user.getEmail());
        bannedUserRepository.save(bannedUser);

        user.setBanned(true);
        userRepository.save(user);
    }

    public List<BannedUserDTO> getAllBannedUsers() {
        return bannedUserRepository.findAll().stream()
                .map(BannedUserDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void unbanUser(Long userId) {
        User userToUnban = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        BannedUser bannedUser = bannedUserRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("BannedUser entry not found"));
        bannedUserRepository.delete(bannedUser);

        userToUnban.setBanned(false);
        userRepository.save(userToUnban);
    }

    public void updateUserRole(Long userId, Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        user.setRole(newRole);
        userRepository.save(user);
    }

    // related to appo booking
    @Override
    public List<User> getAllEmployees() {
        return userRepository.findAllByRole(Role.EMPLOYEE);
    }

    public AvailableSlotsDTO addAvailabilitySlot(Long employeeId, AvailableSlotsDTO availableSlotsDTO) {
        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new NotFoundException("Employee not found"));
        AvailableSlots availableSlots = Mapper.convertAvailableSlotsToEntity(availableSlotsDTO);
        availableSlots.setUser(employee);
        AvailableSlots savedSlot = availableSlotsRepository.save(availableSlots);
        return Mapper.convertAvailableSlotsToDTO(savedSlot);
    }


    public AvailableSlotsDTO updateAvailabilitySlot(Long employeeId, Long availabilitySlotId, AvailableSlotsDTO availableSlotsDTO) {
        AvailableSlots existingSlot = availableSlotsRepository.findById(availabilitySlotId)
                .orElseThrow(() -> new NotFoundException("Availability slot not found"));
        // Check if slot belongs to employee
        if (!existingSlot.getUser().getId().equals(employeeId)) {
            throw new IllegalArgumentException("Availability slot does not belong to the specified employee");
        }
        // Convert DTO to entity
        AvailableSlots updatedSlot = Mapper.convertAvailableSlotsToEntity(availableSlotsDTO);
        updatedSlot.setId(availabilitySlotId);
        // Update slot
        AvailableSlots savedSlot = availableSlotsRepository.save(updatedSlot);
        // Convert entity to DTO and return
        return Mapper.convertAvailableSlotsToDTO(savedSlot);
    }

    public void deleteAvailabilitySlot(Long employeeId, Long availabilitySlotId) {
        // Retrieve slot based on availabilitySlotId
        AvailableSlots availableSlots = availableSlotsRepository.findById(availabilitySlotId)
                .orElseThrow(() -> new NotFoundException("Availability slot not found"));
        // Check if slot belongs to employee
        if (!availableSlots.getUser().getId().equals(employeeId)) {
            throw new IllegalArgumentException("Availability slot does not belong to the specified employee");
        }

        availableSlotsRepository.delete(availableSlots);
    }

    @Override
    public void clearAvailabilitySlots(Long userId) {
        List<AvailableSlots> existingSlots = availableSlotsRepository.findByUserId(userId);
        availableSlotsRepository.deleteAll(existingSlots);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void updateRemindersPreference(Long userId, boolean remindersEnabled) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with ID: " + userId));
        user.setRemindersEnabled(remindersEnabled);
        userRepository.save(user);
    }

    @Override
    public void changePassword(String email, ChangePasswordRequestDTO changePasswordRequestDTO) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        String newPasswordEncoded = changePasswordRequestDTO.getNewPassword();
        user.setPassword(newPasswordEncoded);
        userRepository.save(user);
    }

    @Scheduled(cron = "0 0 0 * * ?") // Runs daily at midnight
    public void deleteInactiveUsers() {
        LocalDateTime sixMonthsAgo = LocalDateTime.now().minusMonths(6);
        List<User> inactiveUsers = userRepository.findByLastLoginTimeBefore(sixMonthsAgo);
        userRepository.deleteAll(inactiveUsers);
    }
}