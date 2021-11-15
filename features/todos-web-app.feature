@web
Feature: TODOs web app
  As a user I want to be able to add, edit, mark as completed and remove todos from the list.

  Scenario: Adding new todo
    Given I am on the TODOs app main page
    When I provide "some text" into input field
    And I click ENTER key
    Then I see the todo in list with title "some text"

  Scenario: Adding two todos with the same text
    Given I am on the TODOs app main page
    When I provide "some text" into input field
    And I click ENTER key
    When I provide "some text" into input field
    And I click ENTER key
    Then I see the todo in list with title "some text"
    And I can see there is 2 todos in list

  #This test is reasonable if I don't know how todos are stored
  Scenario: Adding new todo with long text
    Given I am on the TODOs app main page
    When I provide "long text" into input field
    And I click ENTER key
    Then I see the todo in list with title "long text"

  Scenario: Editing todo
    Given I am on the TODOs app main page
    And At least 1 todos exists
    When I double click on todo and clear text
    And I provide "edited text" into todo
    And I click ENTER key
    Then I see the todo in list with title "edited text"

  Scenario: Deleting todo
    Given I am on the TODOs app main page
    And At least 2 todos exists
    When I delete todo
    Then I can see there is less than 2 todos in list

  Scenario: Marking todo as completed
    Given I am on the TODOs app main page
    And At least 1 todos exists
    When I mark todo as completed
    Then I can see todo marked completed in list

  Scenario: Switching view to Completed
    Given I am on the TODOs app main page
    And At least 2 todos exists
    When I mark todo as completed
    And I switch view to "Completed"
    Then I can see todo marked completed in list
    And I can see there is less than 2 todos in list

  #Further I kinda breaking the rule for 1 test 1 check, but otherwise too much similar steps in different tests
  Scenario: Switching view to Active and back to all
    Given I am on the TODOs app main page
    And At least 2 todos exists
    When I mark todo as completed
    And I switch view to "Active"
    Then I can see there is less than 2 todos in list
    And I see the todo in list with title "This is prepared todo2"
    When I switch view to "All"
    Then I can see there is 2 todos in list

  Scenario: Checking "items left" counter
    Given I am on the TODOs app main page
    And At least 2 todos exists
    Then I can see "2 items left" text in todos counter
    When I provide "some text" into input field
    And I click ENTER key
    Then I can see "3 items left" text in todos counter
    When I delete todo
    And I delete todo
    Then I can see "1 item left" text in todos counter
    When I mark todo as completed
    Then I can see "0 items left" text in todos counter
