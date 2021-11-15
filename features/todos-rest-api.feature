Feature: TODOs API Service
  As a developer I want to make sure todos CRUD operations through REST API works fine.

  #C
  Scenario Outline: Create a todo
    Given A todo <request>
    When I send POST request to /todos
    Then I get response code 201
    And I receive response <response>
    #Left second example failing for purpose
    Examples:
      | request                                                              | response                                                                      |
      | {"userId":1,"title":"Lorem ipsum dolor sit amet","completed":false}  | {"userId":1,"id":201,"title":"Lorem ipsum dolor sit amet","completed":false}  |
      | {"userId":10,"title":"consectetur adipiscing elit","completed":true} | {"userId":10,"id":202,"title":"consectetur adipiscing elit","completed":true} |

  #R
  Scenario Outline: Get todo
    Given The todo with id <id> exist
    When I send GET request to /todos
    Then I get response code 200
    And I receive response <response>

    Examples:
      | id   | response                                                                                     |
      | 10   | {"userId":1,"id":10,"title":"illo est ratione doloremque quia maiores aut","completed":true} |
      | 200  | {"userId":10,"id":200,"title":"ipsam aperiam voluptates qui","completed":false}              |

  #U
  Scenario Outline: Modify todo with PATCH
    Given The todo with id <id> exist
    When I send PATCH request with a <completed> to /todos
    Then I get response code 200
    And I receive as part of response <response>
    #Could make it single column, but divided for clarity
    Examples:
      | id | completed           | response            |
      | 1  | {"completed":true}  | {"completed":true}  |
      | 98 | {"completed":false} | {"completed":false} |

  #U
  Scenario Outline: Modify todo with PUT
    Given The todo with id <id> exist
    When I send PUT request with a <completed> to /todos
    Then I get response code 200
    And I receive as part of response <response>

    Examples:
      | id | completed                                                                                                              | response            |
      | 1  | {"userId":1,"id":1,"title":"delectus aut autem","completed":true}                                                      | {"completed":true}  |
      | 98 | {"userId":5,"id":98,"title":"debitis accusantium ut quo facilis nihil quis sapiente necessitatibus","completed":false} | {"completed":false} |

  #D
  Scenario: Delete todo
    Given The todo with id 201 exist
    When I send DELETE request to /todos
    Then I get response code 200

  Scenario Outline: Filtering by completed and userId fields
    Given The todo with id <id> exist
    When I send parameterized GET request to /todos with params <params>
    Then I get response code 200
    And I receive as part of response <response>

    Examples:
      | id  | params                    | response                                                                                         |
      | 164 | ?userId=9&completed=false | {"userId":9,"id":164,"title":"reprehenderit quos aut aut consequatur est sed","completed":false} |
      | 85  | ?userId=5&completed=true  | {"userId":5,"id":85,"title":"et quia ad iste a","completed":true}                                |