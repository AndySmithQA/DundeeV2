Feature: Patient Activation
  As a patient
  I would like to activate my account
  So that I can logon to the surgery system

  Scenario: Patient is registered but not activated
    Given that patient has already registered but not activated
    When the provided activation link is invoked
    Then the relevant patient account is activated
    Then a patient record is created linked to the userinfo record
    Then the patient is redirected to the login page

  Scenario: Patient is registered but has already been activated
    Given that patient has already registered and activated
    When the provided activation link is invoked
    Then the patient is redirected to the login page