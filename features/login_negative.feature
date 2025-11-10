@login @negative
Feature: Login User - incorrect password

  Scenario: Test Case 3 - Login with incorrect password
    Given I navigate to the home page
    Then I should see the home page loaded
    When I click on "Signup / Login"
    Then I should see "Login to your account" text
    When I enter correct email and password
    And I overwrite the password with "WrongPass123!"
    And I click on "Login"
    Then I should see "Your email or password is incorrect!" text
    And I close the browser
