package com.s22460.medesthetic.repository;

import com.s22460.medesthetic.entities.BannedUser;
import com.s22460.medesthetic.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BannedUserRepository extends JpaRepository<BannedUser, Long> {
    @Query("SELECT b FROM BannedUser b WHERE b.user.id = :userId")
    Optional<BannedUser> findByUserId(@Param("userId") Long userId);

    BannedUser findByEmail(String email);

}
