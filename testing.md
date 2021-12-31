Our main features:

Algorithms:
- flow of the progress
- saved parameters and history? (can go back to previous steps)
- visualisation matches function
- user input check (for functions, parameters, etc.)

Routing:
- all links are relevant
- all links route to the correct place

Different browsers integration:
-Chrome, Firefox etc.


Unit Test:
testing a single function (small unit responsible for small feature)

PATTERN:
Arrange: rendering the component
Act: user events, typing, clicking etc.
Assert: what to expect given the actions above

Translate user interactions to assertions


Integration Test:
-how multiple units integrate together
-combine single unit tests into one larger test

think of how the user will use our application, by steps and actions. then, commbine these action with asserts between every action.
this will resemble more realisctic user flow

End-to-end Test:
-frontend to backend and vuce versa

Tools:
Unit + Integration -> React testing library

End-To-End -> Cypress

