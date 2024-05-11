package com.s22460.medesthetic.repository;

import com.s22460.medesthetic.entities.User;
import com.s22460.medesthetic.utils.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

// JpaRepository inherits the CRUD functionality from CrudRepository and adds additional methods for sorting e.t.c
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByFirstNameAndLastName(String firstName, String lastName);

    //find user by the role(so on startup check, if admin account not in our database then we can create an admin acc) otherwise skip process
    User findByRole(Role role);

    //for appos
    List<User> findAllByRole(Role role);

    //for React Login/NavBar
    Optional<User> findByFirstName(String firstName);
}