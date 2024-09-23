package com.qa.pluto.test.steps.patient;

import com.qa.pluto.infrastructure.security.Role;
import com.qa.pluto.test.repositories.TestPatientRepository;
import com.qa.pluto.test.repositories.TestUserInfoRepository;
import net.thucydides.core.annotations.Step;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Objects;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PatientActor {
    private final Map<String, String> userDetails = Map.of(
            "email", "joe_blog@test.com",
            "surname", "Blog",
            "forename", "Joe",
            "password", "password1",
            "role", Role.PATIENT.toString());

    @LocalServerPort
    private String port;

    @Autowired
    private TestPatientRepository testPatientRepository;

    @Autowired
    private TestUserInfoRepository testUserinfoRepository;

    @Step
    public void register() {

        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        (new RestTemplate()).postForEntity(
                "http://localhost:" + port + "/patient/registration",
                new HttpEntity<>(userDetails, headers),
                String.class);
    }

    @Step
    public ResponseEntity<?> activate(final String activationLink) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        final ResponseEntity<?> response = (new RestTemplate()).exchange(
                Objects.requireNonNull(activationLink),
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class);

        return response;
    }

    public void clearAccount() {
        testPatientRepository.deleteByEmail(userDetails.get("email"));
        testUserinfoRepository.deleteByEmail(userDetails.get("email"));
    }

    public Map<String, String> getUserDetails() {
        return userDetails;
    }

}

