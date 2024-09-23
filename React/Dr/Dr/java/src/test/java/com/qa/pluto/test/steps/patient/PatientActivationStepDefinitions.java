package com.qa.pluto.test.steps.patient;

import com.qa.pluto.app.patient.Patient;
import com.qa.pluto.app.patient.PatientRepository;
import com.qa.pluto.infrastructure.mail.EmailService;
import com.qa.pluto.infrastructure.security.data.UserInfo;
import com.qa.pluto.infrastructure.security.data.UserInfoRepository;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import net.serenitybdd.core.Serenity;
import net.thucydides.core.annotations.Steps;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Objects;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.mock;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PatientActivationStepDefinitions {

    @LocalServerPort
    String port;
    @Autowired
    private UserInfoRepository userinfoRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private EmailService emailService;
    @Steps
    private PatientActor patient;

    @Given("that patient has already registered but not activated")
    public void thatPatientHasAlreadyRegisteredButNotActivated() {
        patient.clearAccount();

        final JavaMailSender mockJavaMailSender = mock(JavaMailSender.class);
        ReflectionTestUtils.setField(emailService, "mailSender", mockJavaMailSender);

        patient.register();

        Serenity.setSessionVariable("mailSender").to(mockJavaMailSender);
    }

    @When("the provided activation link is invoked")
    public void theProvidedActivationLinkIsInvoked() {
        final JavaMailSender mockJavaMailSender = Serenity.sessionVariableCalled("mailSender");
        final ArgumentCaptor<SimpleMailMessage> messageCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        Mockito.verify(mockJavaMailSender).send(messageCaptor.capture());
        final SimpleMailMessage sentMessage = messageCaptor.getValue();
        final String activationLink = Objects.requireNonNull(sentMessage.getText()).replace("8080", port);

        final ResponseEntity<?> response = patient.activate(activationLink);

        Serenity.setSessionVariable("response").to(response);
    }

    @Then("the relevant patient account is activated")
    public void theRelevantPatientAccountIsActivated() {
        final UserInfo testUser = userinfoRepository.findByEmailIgnoreCase(patient.getUserDetails().get("email"));
        assertNotNull("No activation date found for patient", testUser.getActivationDate());
    }

    @Then("a patient record is created linked to the userinfo record")
    public void a_patient_record_is_created_linked_to_the_userinfo_record() {
        final Patient newPatient = patientRepository.findByEmailIgnoreCase(patient.getUserDetails().get("email"));

        assertNotNull("Did not find patient record for " + patient.getUserDetails().get("email"), newPatient);
        // TODO should also check if the record fields are correct
    }

    @Then("the patient is redirected to the login page")
    public void thePatientIsRedirectedToTheLoginPage() {
        final ResponseEntity<?> response = Serenity.sessionVariableCalled("response");
        assertEquals("Expected 309 redirect for response", HttpStatus.PERMANENT_REDIRECT, response.getStatusCode());
        // TODO check location
    }

    @Given("that patient has already registered and activated")
    public void thatPatientHasAlreadyRegisteredAndActivated() {
        thatPatientHasAlreadyRegisteredButNotActivated();
        theProvidedActivationLinkIsInvoked();
    }

}