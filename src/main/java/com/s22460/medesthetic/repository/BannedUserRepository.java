package com.s22460.medesthetic.repository;

import com.s22460.medesthetic.dtos.BannedUserDTO;
import com.s22460.medesthetic.entities.BannedUser;
import com.s22460.medesthetic.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BannedUserRepository extends JpaRepository<BannedUser, Long> {

    @Query("SELECT new com.s22460.medesthetic.dtos.BannedUserDTO(bu.id, bu.reason, u.email, u.firstName, u.lastName) " +
            "FROM BannedUser bu JOIN bu.user u")
    List<BannedUserDTO> findAllBannedUsers();

    Optional<BannedUser> findByUser(User user);
}
