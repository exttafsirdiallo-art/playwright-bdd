@login
Feature: Login User on AutomationExercise

  Scenario: Test Case 2 - Login User with correct email and password
    Given I navigate to the home page
    Then I should see the home page loaded
    When I click on "Signup / Login"
    Then I should see "Login to your account" text
    When I enter correct email and password
    And I click on "Login"
    Then I should be logged in
    Then I should be logged in
    And I close the browser

    
