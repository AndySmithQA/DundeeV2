package com.qa.pluto.app.patient;

import com.qa.pluto.infrastructure.mail.EmailService;
import com.qa.pluto.infrastructure.security.Role;
import com.qa.pluto.infrastructure.security.data.UserInfo;
import com.qa.pluto.infrastructure.security.service.InvaidActivationException;
import com.qa.pluto.infrastructure.security.service.InvaidResetException;
import com.qa.pluto.infrastructure.security.service.UserExistException;
import com.qa.pluto.infrastructure.security.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PatientService {
    private final UserService userService;
    private final EmailService emailService;
    private final PatientRepository patientRepository;
    private final String activateUrl;
    private final String resetUrl;

    public PatientService(
            final UserService userService,
            final EmailService emailService,
            final PatientRepository patientRepository,
            @Value("${patient.acitvate.url}") final String activateUrl,
            @Value("${patient.reset.url}") final String resetUrl) {
        this.userService = userService;
        this.emailService = emailService;
        this.patientRepository = patientRepository;
        this.activateUrl = activateUrl;
        this.resetUrl = resetUrl;
    }

    public String login(Authentication authentication) {
        return userService.login(authentication);
    }

    public void register(final UserInfo userInfo) throws UserExistException {
        userInfo.setRole(Role.PATIENT);
        final String token = userService.register(userInfo).activationToken();
        emailService.sendEmail(userInfo.getEmail(), "QA hydra - Activation", activateUrl + token);
    }

    public boolean forgottenPassword(final String userEmail) {
        final String token = userService.resetAccount(userEmail);
        if (token == null) {
            return false;
        } else {
            emailService.sendEmail(userEmail, "QA hydra - Reset Password", resetUrl + token);
            return true;
        }
    }

    @Transactional
    public void activate(final String token) throws InvaidActivationException {
        final UserInfo activatedUser = userService.activate(token);
        final Patient newPatient = new Patient();

        newPatient.setUserinfoId(activatedUser.getId());
        newPatient.setEmail(activatedUser.getEmail());
        newPatient.setForename(activatedUser.getForename());
        newPatient.setSurname(activatedUser.getSurname());
        patientRepository.save(newPatient);
    }

    public boolean changePassword(final String newPassword, final String token) {
        try {
            userService.changePassword(newPassword, token);
            return true;
        } catch (InvaidResetException e) {
            return false;
        }
    }
}
