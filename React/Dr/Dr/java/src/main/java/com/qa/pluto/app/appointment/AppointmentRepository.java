package com.qa.pluto.app.appointment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAppointmentByStartTimeIsBetween(LocalDateTime from, LocalDateTime to);

    List<Appointment> findAppointmentByPatientIdOrderByStartTime(Long patientId);

    List<Appointment> findAppointmentByStaffIdOrderByStartTime(Long staffId);
}
