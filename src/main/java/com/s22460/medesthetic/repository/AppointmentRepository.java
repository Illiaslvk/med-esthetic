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

    @Query("SELECT a FROM Appointment a WHERE a.userEmail = :userEmail AND a.date = :date AND a.time = :time AND a.canceled = false")
    List<Appointment> findByUserEmailAndDateAndTime(@Param("userEmail") String userEmail, @Param("date") LocalDate date, @Param("time") String time);

    List<Appointment> findByDateAndTime(LocalDate date, String time);

    //@Query("SELECT a FROM Appointment a WHERE a.date = :date AND a.time = :time AND a.canceled = false")
    //    List<Appointment> findByReminderTime(@Param("date") LocalDate date, @Param("time") LocalTime time);
}