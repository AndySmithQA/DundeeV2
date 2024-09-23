package com.qa.pluto.test.repositories;

import com.qa.pluto.app.patient.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TestPatientRepository extends JpaRepository<Patient, Long> {

    @Transactional
    void deleteByEmail(String email);
}
