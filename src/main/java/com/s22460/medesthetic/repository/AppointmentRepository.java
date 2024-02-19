package com.s22460.medesthetic.repository;

import com.s22460.medesthetic.entities.Appointment;
import com.s22460.medesthetic.utils.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByCanceledTrue();

}
