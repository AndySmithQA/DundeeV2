package com.qa.pluto.app.patient;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnTransformer;

@Entity
@Table(name = "patient")
public class Patient {
    @Id
    @Column(name = "userinfo_id", unique=true, nullable = false)
    private Long userinfoId;

    @Column(name = "email", unique=true, nullable = false)
    @ColumnTransformer(write = "LOWER(?)")
    private String email;

    @Column(name = "forename", nullable = false)
    private String forename;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "phone")
    private String phone;

    public Long getUserinfoId() {
        return userinfoId;
    }

    public Patient setUserinfoId(final Long userinfo_id) {
        this.userinfoId = userinfo_id;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public Patient setEmail(final String email) {
        this.email = email;
        return this;
    }

    public String getForename() {
        return forename;
    }

    public Patient setForename(final String forename) {
        this.forename = forename;
        return this;
    }

    public String getSurname() {
        return surname;
    }

    public Patient setSurname(final String surname) {
        this.surname = surname;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public Patient setPhone(final String phone) {
        this.phone = phone;
        return this;
    }
}

