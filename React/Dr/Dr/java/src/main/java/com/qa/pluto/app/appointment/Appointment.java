package com.qa.pluto.app.appointment;

import com.qa.pluto.app.patient.Patient;
import com.qa.pluto.app.staff.Staff;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "APPOINTMENT", schema = "PUBLIC")
public class Appointment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "ID")
    private long id;
    @Basic
    @Column(name = "END_TIME")
    private LocalDateTime endTime;
    @Basic
    @Column(name = "START_TIME")
    private LocalDateTime startTime;
    @Basic
    @Column(name = "PATIENT_ID")
    private Long patientId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PATIENT_ID", insertable = false, updatable = false)
    private Patient patient;
    @Basic
    @Column(name = "STAFF_ID")
    private Long staffId;
    @ManyToOne
    @JoinColumn(name = "STAFF_ID", insertable = false, updatable = false)
    private Staff staff;

    public long getId() {
        return id;
    }

    public Appointment setId(final long id) {
        this.id = id;
        return this;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public Appointment setEndTime(final LocalDateTime endTime) {
        this.endTime = endTime;
        return this;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public Appointment setStartTime(final LocalDateTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public Long getPatientId() {
        return patientId;
    }

    public Appointment setPatientId(final Long patientId) {
        this.patientId = patientId;
        return this;
    }

    public Staff getStaff() {
        return staff;
    }

    public Patient getPatient() {
        return patient;
    }

    public Long getStaffId() {
        return staffId;
    }

    public Appointment setStaffId(final Long staffId) {
        this.staffId = staffId;
        return this;
    }

    public Appointment setPatient(final Patient patient) {
        this.patient = patient;
        return this;
    }

    public Appointment setStaff(final Staff staff) {
        this.staff = staff;
        return this;
    }
}
