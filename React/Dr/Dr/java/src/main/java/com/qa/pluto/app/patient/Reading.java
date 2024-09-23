package com.qa.pluto.app.patient;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.util.Date;

@Table(name = "blood_reading")
@Entity
public class Reading implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "systolic_pressure", nullable = false)
    private Integer systolicPressure;

    @Column(name = "diastolic_pressure", nullable = false)
    private Integer diastolicPressure;

    @Column(name = "blood_oxygen", nullable = false)
    private Integer bloodOxygen;

    @Column(name = "reading_date", nullable = false)
    @CreatedDate
    private Date readingDate;

    public Integer getId() {
        return id;
    }

    public Reading setId(final Integer id) {
        this.id = id;
        return this;
    }

    public Integer getUserId() {
        return userId;
    }

    public Reading setUserId(final Integer userId) {
        this.userId = userId;
        return this;
    }

    public Integer getSystolicPressure() {
        return systolicPressure;
    }

    public Reading setSystolicPressure(final Integer systolicPressure) {
        this.systolicPressure = systolicPressure;
        return this;
    }

    public Integer getDiastolicPressure() {
        return diastolicPressure;
    }

    public Reading setDiastolicPressure(final Integer diastolicPressure) {
        this.diastolicPressure = diastolicPressure;
        return this;
    }

    public Integer getBloodOxygen() {
        return bloodOxygen;
    }

    public Reading setBloodOxygen(final Integer bloodOxygen) {
        this.bloodOxygen = bloodOxygen;
        return this;
    }

    public Date getReadingDate() {
        return readingDate;
    }

    public Reading setReadingDate(final Date readingDate) {
        this.readingDate = readingDate;
        return this;
    }
}
