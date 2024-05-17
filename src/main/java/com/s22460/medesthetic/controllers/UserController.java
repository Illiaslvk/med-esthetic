package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.*;
import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.BannedUserRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.AppoServiceService;
import com.s22460.medesthetic.services.UserService;
import com.s22460.medesthetic.utils.NotFoundException;
import com.s22460.medesthetic.utils.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final BannedUserRepository bannedUserRepository;
    private final UserRepository userRepository;
    private final AppoServiceService appoServiceService;

    //Admin
    @GetMapping("/admin/users")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/admin/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable Long userId) {

        User user = userService.getUserById(userId);
        UserDTO userDTO = Mapper.convertToDTO(user);

        if (user.isBanned()) {
            userDTO.setAdditionalInfo("This user is currently banned.");
        } else {
            userDTO.setAdditionalInfo("This user is not currently in ban.");
        }
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/admin/banUser")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> banUser(@RequestBody Map<String, String> request) {
        String adminEmail = request.get("adminEmail");
        String userToBanEmail = request.get("userToBanEmail");
        String banReason = request.get("banReason");
        // Handle banning a user
        try {
            userService.banUserByEmail(adminEmail, userToBanEmail, banReason);
            return ResponseEntity.ok("User banned successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    //                  MAKE UNBAN
    @PostMapping("/admin/unbanUser")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> unbanUser(@RequestBody Map<String, String> request) {
        String adminEmail = request.get("adminEmail");
        String userToUnbanEmail = request.get("userToUnbanEmail");

        try {
            userService.unbanUserByEmail(adminEmail, userToUnbanEmail);
            return ResponseEntity.ok("User unbanned successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("/admin/{userId}/role")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateUserRole(@PathVariable Long userId, @RequestBody UpdateRoleRequest updateRoleRequest) {
        try {
            Role newRole = updateRoleRequest.getRole();
            User user = userService.getUserById(userId);
            Role currentRole = user.getRole();

            userService.updateUserRole(userId, newRole);

            // If new role is EMPLOYEE assign work hours from 8 am to 5 pm on weekdays
            if (newRole == Role.EMPLOYEE) {
                assignWorkHours(userId);
            }
            // If new role is USER and the current role was EMPLOYEE clear work hours
            else if (newRole == Role.USER && currentRole == Role.EMPLOYEE) {
                userService.clearAvailabilitySlots(userId);
            }

            return ResponseEntity.ok("User role updated successfully");
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user role");
        }
    }


    private void assignWorkHours(Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            userService.clearAvailabilitySlots(userId);
            // Assign work hours from 8 am to 5 pm on weekdays
            List<AvailableSlotsDTO> workHours = generateWorkHours();
            for (AvailableSlotsDTO slot : workHours) {
                userService.addAvailabilitySlot(userId, slot);
            }
        }
    }

    private List<AvailableSlotsDTO> generateWorkHours() {
        List<AvailableSlotsDTO> workHours = new ArrayList<>();
        for (DayOfWeek dayOfWeek : DayOfWeek.values()) {
            if (dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY) {
                AvailableSlotsDTO workSlot = new AvailableSlotsDTO();
                workSlot.setDayOfWeek(dayOfWeek);
                workSlot.setStartTime(LocalTime.of(8, 0)); // Start time is 8 am
                workSlot.setEndTime(LocalTime.of(17, 0)); // End time is 5 pm
                workHours.add(workSlot);
            }
        }
        return workHours;
    }


    @DeleteMapping("/admin/delete/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user");
        }
    }

    //Employee
    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<User> employees = userService.getAllEmployees();
        List<EmployeeDTO> employeeDTOs = new ArrayList<>();
        for (User employee : employees) {
            employeeDTOs.add(new EmployeeDTO(employee.getId(),employee.getFirstName(), employee.getLastName()));
        }
        return ResponseEntity.ok(employeeDTOs);
    }

    @GetMapping("/employees/{employeeId}/services")
    public ResponseEntity<List<AppoServiceDTO>> getEmployeeServices(@PathVariable Long employeeId) {
        try {
            List<AppoService> employeeServices = appoServiceService.getServicesForUser(employeeId);
            List<AppoServiceDTO> employeeServiceDTOs = employeeServices.stream()
                    .map(AppoServiceDTO::fromEntity)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(employeeServiceDTOs);
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //User
    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/addUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.addUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PutMapping("/updateUserById/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/deleteUserById/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/full-name")
    public ResponseEntity<User> findByFullName(@RequestParam String firstName, @RequestParam String lastName) {
        User user = userService.findByFullName(firstName, lastName);
        return ResponseEntity.ok(user);
    }


//    @GetMapping("/current")
//    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
//        String userEmail = userDetails.getUsername();
//        User user = userRepository.findByEmail(userEmail).orElse(null);
//
//        if (user != null) {
//            return ResponseEntity.ok(user);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @GetMapping("/findByFirstName")
    public ResponseEntity<User> findUserByFirstName(@RequestParam String firstName) {
        User user = userRepository.findByFirstName(firstName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found by first name: " + firstName));
        return ResponseEntity.ok(user);
    }

    // USED IN FRONT
    @GetMapping("/user/details")
    public ResponseEntity<UserDTO> getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String userEmail = userDetails.getUsername();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserDTO userDTO = Mapper.convertToDTO(user);
        if (user.isBanned()) {
            userDTO.setAdditionalInfo("This user is currently banned.");
        } else {
            userDTO.setAdditionalInfo("This user is not currently in ban.");
        }
        return ResponseEntity.ok(userDTO);
    }

    //For EMP availability
    @PostMapping("/emp/{employeeId}/availability")
    public ResponseEntity<AvailableSlotsDTO> addAvailabilitySlot(
            @PathVariable Long employeeId,
            @RequestBody AvailableSlotsDTO availableSlotsDTO
    ) {
        AvailableSlotsDTO addedSlot = userService.addAvailabilitySlot(employeeId, availableSlotsDTO);
        return ResponseEntity.ok(addedSlot);
    }

    @PutMapping("/emp/{employeeId}/availability/{availabilitySlotId}")
    public ResponseEntity<AvailableSlotsDTO> updateAvailabilitySlot(
            @PathVariable Long employeeId,
            @PathVariable Long availabilitySlotId,
            @RequestBody AvailableSlotsDTO availableSlotsDTO
    ) {
        AvailableSlotsDTO updatedSlot = userService.updateAvailabilitySlot(employeeId, availabilitySlotId, availableSlotsDTO);
        return ResponseEntity.ok(updatedSlot);
    }

    @DeleteMapping("/emp/{employeeId}/availability/{availabilitySlotId}")
    public ResponseEntity<Void> deleteAvailabilitySlot(
            @PathVariable Long employeeId,
            @PathVariable Long availabilitySlotId
    ) {
        userService.deleteAvailabilitySlot(employeeId, availabilitySlotId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("User not found"));
        return ResponseEntity.ok(UserDTO.fromEntity(user));
    }

}