package com.qa.pluto.app.staff;

import com.qa.pluto.infrastructure.security.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.Formula;

import java.util.Date;

@Entity
@Table(name = "staff")

public class Staff {

    @Id
    @Column(name = "userinfo_id", unique = true, nullable = false)
    private Long userinfoId;

    @Column(name = "email", unique = true, nullable = false)
    @ColumnTransformer(write = "LOWER(?)")
    private String email;

    @Column(name = "forename", nullable = false)
    private String forename;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "phone")
    private String phone;

    @Column(name = "job_role")
    @Enumerated(EnumType.STRING)
    private Role jobRole;

    @Formula("SELECT u.activation_date FROM userinfo u WHERE u.id = userinfo_id")
    private Date activationDate;

    public Long getUserinfoId() {
        return userinfoId;
    }

    public Staff setUserinfoId(final Long userinfoId) {
        this.userinfoId = userinfoId;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public Staff setEmail(final String email) {
        this.email = email;
        return this;
    }

    public String getForename() {
        return forename;
    }

    public Staff setForename(final String forename) {
        this.forename = forename;
        return this;
    }

    public String getSurname() {
        return surname;
    }

    public Staff setSurname(final String surname) {
        this.surname = surname;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public Staff setPhone(final String phone) {
        this.phone = phone;
        return this;
    }

    public Role getJobRole() {
        return jobRole;
    }

    public Staff setJobRole(final Role jobRole) {
        this.jobRole = jobRole;
        return this;
    }

    public Date getActivationDate() {
        return activationDate;
    }

    public Staff setActivationDate(final Date activationDate) {
        this.activationDate = activationDate;
        return this;
    }
}

