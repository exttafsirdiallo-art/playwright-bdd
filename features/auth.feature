Feature: Authentication entry
  As a visitor
  I want to open the login page
  So that I can authenticate

  @smoke
  Scenario: Open Signup/Login from home
    Given I navigate to the home page
    When I go to Signup Login
    Then I should see the login form
