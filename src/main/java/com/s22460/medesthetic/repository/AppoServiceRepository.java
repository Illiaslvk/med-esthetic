package com.s22460.medesthetic.repository;

import com.s22460.medesthetic.entities.AppoService;
import com.s22460.medesthetic.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppoServiceRepository extends JpaRepository<AppoService, Long> {
    List<AppoService> findByUser(User user);

}
