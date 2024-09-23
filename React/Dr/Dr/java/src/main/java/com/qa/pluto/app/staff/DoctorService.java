package com.qa.pluto.app.staff;

import com.qa.pluto.app.patient.Patient;
import com.qa.pluto.app.patient.PatientRepository;
import com.qa.pluto.infrastructure.security.data.UserInfo;
import com.qa.pluto.infrastructure.security.service.InvaidActivationException;
import com.qa.pluto.infrastructure.security.service.InvaidResetException;
import com.qa.pluto.infrastructure.security.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DoctorService {

    private final UserService userService;
    private final StaffRepository staffRepository;
private final PatientRepository patientRepository;

    public DoctorService(final UserService userService,
                         final StaffRepository staffRepository, final PatientRepository patientRepository) {
        this.userService = userService;
        this.staffRepository = staffRepository;
        this.patientRepository = patientRepository;
    }

    public String login(final Authentication authentication) {
        return userService.login(authentication);
    }

    @Transactional
    public Staff activate(final UserInfo userinfo,
                          final String token) throws InvaidResetException, InvaidActivationException {
        userService.activate(token);
        userService.changePassword(userinfo.getPassword(), token);
        return staffRepository.findByEmailIgnoreCase(userinfo.getEmail());
    }

    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }
}
