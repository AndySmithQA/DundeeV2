package com.qa.pluto.app.staff;

import com.qa.pluto.app.appointment.AppointmentService;
import com.qa.pluto.app.appointment.model.AppointmentSchedule;
import com.qa.pluto.app.patient.Patient;
import com.qa.pluto.infrastructure.security.data.UserInfo;
import com.qa.pluto.infrastructure.security.service.InvaidActivationException;
import com.qa.pluto.infrastructure.security.service.InvaidResetException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "*")
public class DoctorController {

    private final DoctorService doctorService;
    private final AppointmentService appointmentService;

    public DoctorController(final DoctorService doctorService, final AppointmentService appointmentService) {
        this.doctorService = doctorService;
        this.appointmentService = appointmentService;
    }

    @PostMapping("/session")
    public String login(final Authentication authentication) {
        return doctorService.login(authentication);
    }

    @PutMapping("/activation/{token}")
    public ResponseEntity<Staff> activate(
            @RequestBody final UserInfo userinfo,
            @PathVariable final String token) {
        try {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(doctorService.activate(userinfo, token));
        } catch (InvaidResetException | InvaidActivationException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/appointments")
    public List<AppointmentSchedule> getAppointments(final Authentication authentication) {
        return appointmentService.getDoctorAppointments(authentication.getName());
    }

    @GetMapping("/patients")
    public List<Patient> getAppointments() {
        return doctorService.getPatients();
    }
}
