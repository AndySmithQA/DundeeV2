package com.qa.pluto.app.staff;

import com.qa.pluto.app.appointment.model.AppointmentSchedule;
import com.qa.pluto.app.patient.Patient;
import com.qa.pluto.infrastructure.security.service.UserExistException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private final AdminService adminService;

    public AdminController(final AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/session")
    public String login(final Authentication authentication) {
        return adminService.login(authentication);
    }

    @GetMapping("/doctors")
    public List<Staff> getAllDoctors() {
        return adminService.getAllDoctors();
    }

    @PostMapping("/doctors")
    public ResponseEntity<Staff> registerDoctor(@RequestBody final Staff newDoctor) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(adminService.registerDoctor(newDoctor));
        } catch (UserExistException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/appointments")
    public List<AppointmentSchedule> getAppointments() {
        return adminService.getAppointments();
    }

    @GetMapping("/patients")
    public List<Patient> getPatients() {
        return adminService.getPatients();
    }
}
