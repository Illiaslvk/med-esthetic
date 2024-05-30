package com.s22460.medesthetic.repository;

import com.s22460.medesthetic.entities.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    List<Holiday> findByUserId(Long userId);
    boolean existsByUserIdAndDate(Long userId, LocalDate date);

}
