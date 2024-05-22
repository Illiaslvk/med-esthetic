package com.s22460.medesthetic.entities;

import com.s22460.medesthetic.utils.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name cannot be blank")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    private String lastName;

    @Email(message = "Invalid email address")
    @NotBlank(message = "Email cannot be blank")
    //@Column(unique = true)
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 4, message = "Password must be at least 4 characters")
    private String password;

    @Enumerated(EnumType.STRING) // Store as string
    @NotNull
    private Role role;

    // Connections

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Appointment> appointments = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<BannedUser> bannedUsers = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews = new HashSet<>();

    //for EMP
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AvailableSlots> availableSlots;

    // Blocking users
    private boolean banned;

    private boolean remindersEnabled = true;

//    public void banUser() {this.banned = true;}
//    public void unbanUser() {this.banned = false;}

    //Check role
    public boolean isAdmin() {return Role.ADMIN.equals(this.role);}
    public boolean isEmployee() {return Role.EMPLOYEE.equals(this.role);}

    //  JWT
    // UserDetails have getPassword/Username
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}