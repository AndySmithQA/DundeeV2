Feature: Patient Registration
  As a patient
  I would like to register with Medical Surgery System
  So that I can make appointments to see a doctor and to provide medical information

  Scenario: Patient not already register
    Given that patient has not already register
    When a registration for the patient is received with the correct details
    Then a new userinfo record is created without activation date
    Then an email is send to the patient registration email address