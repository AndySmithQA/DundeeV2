package com.qa.pluto.app.staff;

import com.qa.pluto.app.appointment.AppointmentService;
import com.qa.pluto.app.appointment.model.AppointmentSchedule;
import com.qa.pluto.app.patient.Patient;
import com.qa.pluto.app.patient.PatientRepository;
import com.qa.pluto.infrastructure.mail.EmailService;
import com.qa.pluto.infrastructure.security.Role;
import com.qa.pluto.infrastructure.security.data.Registration;
import com.qa.pluto.infrastructure.security.data.UserInfo;
import com.qa.pluto.infrastructure.security.service.UserExistException;
import com.qa.pluto.infrastructure.security.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {
    private final UserService userService;
    private final AppointmentService appointmentService;
    private final StaffRepository staffRepository;
    private final PatientRepository patientRepository;
    private final EmailService emailService;
    private final String doctorActivationUrl;

    public AdminService(final UserService userService,
                        final AppointmentService appointmentService, final StaffRepository staffRepository,
                        final PatientRepository patientRepository, final EmailService emailService,
                        @Value("${doctor.activate.url}") final String doctorActivationUrl) {
        this.userService = userService;
        this.appointmentService = appointmentService;
        this.staffRepository = staffRepository;
        this.patientRepository = patientRepository;
        this.emailService = emailService;
        this.doctorActivationUrl = doctorActivationUrl;
    }

    public String login(Authentication authentication) {
        return userService.login(authentication);
    }

    public List<Staff> getAllDoctors() {
        return staffRepository.findAllByJobRole(Role.DOCTOR);
    }

    @Transactional
    public Staff registerDoctor(final Staff newDoctor) throws UserExistException {
        final UserInfo userInfo = new UserInfo();
        userInfo.setRole(Role.DOCTOR);
        userInfo.setEmail(newDoctor.getEmail());
        userInfo.setSurname(newDoctor.getSurname());
        userInfo.setForename(newDoctor.getForename());

        final Registration registration = userService.register(userInfo);
        newDoctor.setUserinfoId(registration.userInfo().getId());
        newDoctor.setJobRole(Role.DOCTOR);

        staffRepository.save(newDoctor);
        emailService.sendEmail(newDoctor.getEmail(), "QA hydra - Doctor Account Activation",
                               doctorActivationUrl + registration.activationToken());
        return newDoctor;
    }

    public List<AppointmentSchedule> getAppointments() {
        return appointmentService.getAppointments();
    }

    public List<Patient> getPatients() {
        return patientRepository.findAll();
    }
}
