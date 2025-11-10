@logout
Feature: Logout user on AutomationExercise

  Scenario: Test Case 3 - Logout User
    Given I navigate to the home page
    Then I should see the home page loaded
    When I click on "Signup / Login"
    Then I should see "Login to your account" text
    When I enter correct email and password
    And I click on "Login"
    Then I should be logged in
    When I click on "Logout"
    Then I should see "Login to your account" text
    And I close the browser
