package com.qa.pluto.app.appointment.model;

import java.time.LocalDateTime;

/**
 * Appointment Schedule without patient details
 */
public record RestrictedAppointmentSchedule(LocalDateTime date, Person doctor) {
}
