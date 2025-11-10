@register
Feature: Register a new user on AutomationExercise

  Scenario: Test Case 1 - Register User (static data)
    Given I navigate to the home page
    Then I should see the home page loaded
    When I click on "Signup \/ Login"
    Then I should see "New User Signup!" text
    When I enter name and email address
    And I click the "Signup" button
    Then I should see "ENTER ACCOUNT INFORMATION" text
    When I fill in account information
    And I select newsletters options
    And I fill in address details
    And I click on "Create Account"
    Then I should see "ACCOUNT CREATED!" text
    When I click "Continue" after account creation
    Then I should see "Logged in as username"
    When I click on "Delete Account"
    Then I should see "ACCOUNT DELETED!" text
    And I click "Continue" after deletion
    And I close the browser

    
