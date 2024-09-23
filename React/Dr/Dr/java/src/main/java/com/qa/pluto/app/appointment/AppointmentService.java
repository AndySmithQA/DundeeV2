package com.qa.pluto.app.appointment;

import com.qa.pluto.app.appointment.model.AppointmentSchedule;
import com.qa.pluto.app.appointment.model.Person;
import com.qa.pluto.app.appointment.model.RestrictedAppointmentSchedule;
import com.qa.pluto.app.patient.Patient;
import com.qa.pluto.app.patient.PatientRepository;
import com.qa.pluto.app.staff.StaffRepository;
import com.qa.pluto.infrastructure.security.Role;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final StaffRepository staffRepository;
    private final PatientRepository patientRepository;

    public AppointmentService(
            final AppointmentRepository appointmentRepository,
            final StaffRepository staffRepository,
            final PatientRepository patientRepository) {

        this.appointmentRepository = appointmentRepository;
        this.staffRepository = staffRepository;
        this.patientRepository = patientRepository;
    }

    public Appointment saveAppointment(final Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    private List<RestrictedAppointmentSchedule> mapRestrictedSchedules(final List<Appointment> appointmentList) {
        return appointmentList.stream()
                .map(appointment -> new RestrictedAppointmentSchedule(
                        appointment.getStartTime(),
                        new Person(appointment.getStaffId(), appointment.getStaff().getForename() + " " + appointment.getStaff().getSurname())
                )).toList();
    }

    public List<RestrictedAppointmentSchedule> getRestrictedCalendar(final Optional<LocalDate> from, final Optional<LocalDate> to) {

        final List<Appointment> appointmentList = (from.isPresent() && to.isPresent())
                ? appointmentRepository.findAppointmentByStartTimeIsBetween(from.get().atStartOfDay(), to.get().atStartOfDay())
                : appointmentRepository.findAll();
        return mapRestrictedSchedules(appointmentList);
    }

    public List<RestrictedAppointmentSchedule> getPatientAppointments(final String name) {
        final Patient patient = patientRepository.findByEmailIgnoreCase(name);
        return mapRestrictedSchedules(appointmentRepository.findAppointmentByPatientIdOrderByStartTime(patient.getUserinfoId()));
    }

    public List<AppointmentSchedule> getAppointments() {
        return appointmentRepository
                .findAll()
                .stream()
                .map(appointment -> new AppointmentSchedule(
                        appointment.getStartTime(),
                        new Person(appointment.getStaffId(), appointment.getStaff().getForename() + " " + appointment.getStaff().getSurname()),
                        new Person(appointment.getPatientId(), appointment.getPatient().getForename() + " " + appointment.getPatient().getSurname())))
                .toList();
    }

    public List<AppointmentSchedule> getDoctorAppointments(final String doctorEmail) {
        return appointmentRepository
                .findAppointmentByStaffIdOrderByStartTime(staffRepository
                        .findByEmailIgnoreCase(doctorEmail)
                        .getUserinfoId())
                .stream()
                .map(appointment -> new AppointmentSchedule(
                        appointment.getStartTime(),
                        new Person(appointment.getStaffId(), appointment.getStaff().getForename() + " " + appointment.getStaff().getSurname()),
                        new Person(appointment.getPatientId(), appointment.getPatient().getForename() + " " + appointment.getPatient().getSurname())))
                .toList();
    }

    public List<Person> getDoctors() {
        return staffRepository.findAllByJobRole(Role.DOCTOR)
                .stream()
                .map(doctor -> new Person(doctor.getUserinfoId(), doctor.getForename() + " " + doctor.getSurname()))
                .toList();
    }
}
