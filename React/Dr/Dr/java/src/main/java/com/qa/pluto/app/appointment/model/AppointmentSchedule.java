package com.qa.pluto.app.appointment.model;

import java.time.LocalDateTime;

public record AppointmentSchedule(LocalDateTime date, Person doctor, Person patient) {
}
