package com.s22460.medesthetic.repository;

import com.s22460.medesthetic.entities.AvailableSlots;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AvailableSlotsRepository extends JpaRepository<AvailableSlots, Long> {
    List<AvailableSlots> findByUserId(Long employeeId);
//    List<AvailableSlots> findByUserIdAndDate(Long employeeId, LocalDate date);
}
