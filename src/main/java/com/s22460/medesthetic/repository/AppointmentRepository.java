package com.s22460.medesthetic.repository;

import com.s22460.medesthetic.entities.Appointment;
import com.s22460.medesthetic.utils.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByCanceledTrue();
    List<Appointment> findByUserIdAndDate(Long employeeId, LocalDate date);

    //Spring Data JPA method "convention"(thats why we do not write query)
    List<Appointment> findByCanceledFalse();
    List<Appointment> findByUserEmailAndCanceledFalse(String userEmail);
    List<Appointment> findByUserIdAndCanceledFalse(Long employeeId);
    List<Appointment> findByUserEmailAndDate(String userEmail, LocalDate date);
}