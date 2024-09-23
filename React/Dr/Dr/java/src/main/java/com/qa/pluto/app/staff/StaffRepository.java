package com.qa.pluto.app.staff;

import com.qa.pluto.infrastructure.security.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

    Staff findByEmailIgnoreCase(final String username);

    List<Staff> findAllByJobRole(Role jobrole);
}
