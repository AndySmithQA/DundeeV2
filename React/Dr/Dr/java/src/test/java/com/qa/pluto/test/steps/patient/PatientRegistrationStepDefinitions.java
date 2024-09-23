package com.qa.pluto.test.steps.patient;

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
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Objects;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.mock;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PatientRegistrationStepDefinitions {

    @LocalServerPort
    String port;

    @Autowired
    private UserInfoRepository userinfoRepository;

    @Autowired
    private EmailService emailService;

    @Steps
    private PatientActor patient;

    @Given("^that patient has not already register$")
    public void prepareRegistration() {
        patient.clearAccount();
    }

    @When("a registration for the patient is received with the correct details")
    public void a_registration_for_the_patient_is_received_with_the_correct_details() {
        final JavaMailSender mockJavaMailSender = mock(JavaMailSender.class);
        ReflectionTestUtils.setField(emailService, "mailSender", mockJavaMailSender);

        patient.register();

        Serenity.setSessionVariable("mailSender").to(mockJavaMailSender);
    }

    @Then("a new userinfo record is created without activation date")
    public void a_new_userinfo_record_is_created_without_activation_date() {
        final UserInfo userInfo = userinfoRepository.findByEmailIgnoreCase(patient.getUserDetails().get("email"));

        assertNotNull("Did not find userinfo record", userInfo);
        assertNull("Activation should be null but is " + userInfo.getActivationDate(), userInfo.getActivationDate());
    }

    @Then("an email is send to the patient registration email address")
    public void anEmailIsSendToThePatientRegistrationEmailAddress() {
        final JavaMailSender mockJavaMailSender = Serenity.sessionVariableCalled("mailSender");
        final ArgumentCaptor<SimpleMailMessage> messageCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        Mockito.verify(mockJavaMailSender).send(messageCaptor.capture());
        final SimpleMailMessage sentMessage = messageCaptor.getValue();

        assertEquals("Expected " + patient.getUserDetails().get("email"), patient.getUserDetails().get("email"), Objects.requireNonNull(sentMessage.getTo())[0]);
    }
}