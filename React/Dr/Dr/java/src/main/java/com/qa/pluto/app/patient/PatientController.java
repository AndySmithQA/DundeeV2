package com.qa.pluto.app.patient;

import com.qa.pluto.app.appointment.Appointment;
import com.qa.pluto.app.appointment.AppointmentService;
import com.qa.pluto.app.appointment.model.Person;
import com.qa.pluto.app.appointment.model.RestrictedAppointmentSchedule;
import com.qa.pluto.infrastructure.security.data.UserInfo;
import com.qa.pluto.infrastructure.security.service.InvaidActivationException;
import com.qa.pluto.infrastructure.security.service.UserExistException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "*")
public class PatientController {
    private final PatientService patientService;
    private final AppointmentService appointmentService;

    public PatientController(
            final PatientService registrationService,
            final AppointmentService appointmentService) {
        this.patientService = registrationService;
        this.appointmentService = appointmentService;
    }

    @PostMapping("/session")
    public String login(final Authentication authentication) {
        return patientService.login(authentication);
    }

    @PostMapping("/registration")
    public ResponseEntity<String> register(@RequestBody final UserInfo userInfo) {
        try {
            patientService.register(userInfo);
            return ResponseEntity.status(HttpStatus.CREATED).body("{}");
        } catch (UserExistException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/password-reset")
    public ResponseEntity<HttpStatus> forgottenPassword(@RequestBody final UserInfo userInfo) {
        return patientService.forgottenPassword(userInfo.getEmail())
                ? new ResponseEntity<>(HttpStatus.ACCEPTED)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/password")
    public ResponseEntity<HttpStatus> resetPassword(
            @RequestBody final UserInfo userInfo,
            @RequestHeader(name="Authorization") String bearerToken) {

        return patientService.changePassword(userInfo.getPassword(), bearerToken.substring("Bearer ".length()))
                ? new ResponseEntity<>(HttpStatus.ACCEPTED)
                : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/activation/{token}")
    public ResponseEntity<HttpStatus> activate(
            final HttpServletResponse httpServletResponse,
            @PathVariable("token") final String token,
            @Value("${patient.login.url}") final String loginUrl) {

        try {
            patientService.activate(token);
        } catch (InvaidActivationException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        httpServletResponse.setHeader("Location", loginUrl);
        return new ResponseEntity<>(HttpStatus.PERMANENT_REDIRECT);
    }

    @GetMapping("/appointments/calendar")
    public List<RestrictedAppointmentSchedule> getAppointmentCalendar(
            @RequestParam(name = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) final Optional<LocalDate> from,
            @RequestParam(name = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) final Optional<LocalDate> to) {
        return appointmentService.getRestrictedCalendar(from, to);
    }

    @PostMapping("/appointments")
    public Appointment saveAppointment(@RequestBody final Appointment appointment) {
        return appointmentService.saveAppointment(appointment);
    }

    @GetMapping("/appointments")
    public List<RestrictedAppointmentSchedule> getAppointments(final Authentication authentication) {
        return appointmentService.getPatientAppointments(authentication.getName());
    }

    @GetMapping("/appointments/doctors")
    public List<Person> getDoctors() {
        return appointmentService.getDoctors();
    }
}
