package com.s22460.medesthetic.controllers;

import com.s22460.medesthetic.dtos.Mapper;
import com.s22460.medesthetic.dtos.UserDTO;
import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.repository.BannedUserRepository;
import com.s22460.medesthetic.repository.UserRepository;
import com.s22460.medesthetic.services.UserService;
import com.s22460.medesthetic.utils.NotFoundException;
import com.s22460.medesthetic.utils.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final BannedUserRepository bannedUserRepository;
    private final UserRepository userRepository;


    //Admin
    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/admin/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('ADMIN')")
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


    //Employee


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


    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        User user = userRepository.findByEmail(userEmail).orElse(null);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/findByFirstName")
    public ResponseEntity<User> findUserByFirstName(@RequestParam String firstName) {
        User user = userRepository.findByFirstName(firstName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found by first name: " + firstName));
        return ResponseEntity.ok(user);
    }

    // USED IN FRONT
    @GetMapping("/user/details")
    public ResponseEntity<UserDTO> getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
        // Check if the user is authenticated
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Get the email of the authenticated user
        String userEmail = userDetails.getUsername();

        // Retrieve the user from the database based on the email
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Map the user entity to a DTO
        UserDTO userDTO = Mapper.convertToDTO(user);

        // Additional details based on user status (banned or not)
        if (user.isBanned()) {
            userDTO.setAdditionalInfo("This user is currently banned.");
        } else {
            userDTO.setAdditionalInfo("This user is not currently in ban.");
        }

        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/admin/{userId}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserRole(@PathVariable Long userId, @RequestBody Role newRole) {
        try {
            userService.updateUserRole(userId, newRole);
            return ResponseEntity.ok("User role updated successfully");
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user role");
        }
    }



    @DeleteMapping("/admin/delete/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user");
        }
    }

}