package com.qa.pluto.infrastructure.security.data;

import com.qa.pluto.infrastructure.security.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnTransformer;

import java.util.Date;

@Entity
@Table(name = "userinfo")
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", unique = true, nullable = false)
    @ColumnTransformer(write = "LOWER(?)")
    private String email;

    @Column(name = "forename", nullable = false)
    private String forename;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "password", nullable = true)
    private String password;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "activation_date")
    private Date activationDate;

    public Long getId() {
        return id;
    }

    public UserInfo setId(Long id) {
        this.id = id;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserInfo setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getForename() {
        return forename;
    }

    public UserInfo setForename(String forename) {
        this.forename = forename;
        return this;
    }

    public String getSurname() {
        return surname;
    }

    public UserInfo setSurname(String surname) {
        this.surname = surname;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserInfo setPassword(String password) {
        this.password = password;
        return this;
    }

    public Date getActivationDate() {
        return activationDate;
    }

    public UserInfo setActivationDate(Date activationDate) {
        this.activationDate = activationDate;
        return this;
    }

    public Role getRole() {
        return role;
    }

    public UserInfo setRole(Role role) {
        this.role = role;
        return this;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", forename='" + forename + '\'' +
                ", surname='" + surname + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", activationDate=" + activationDate +
                '}';
    }
}

