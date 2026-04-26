## ADDED Requirements

### Requirement: Email Domain Selector UI
The system SHALL provide a UI mechanism on the registration screen for users to select their email domain between "Student" and "Staff" roles.

#### Scenario: Default selection is Student
- **WHEN** the user navigates to the registration screen
- **THEN** the domain selector defaults to the "Student" role (`@student.utem.edu.my`)

#### Scenario: User selects Staff
- **WHEN** the user toggles the domain selector to "Staff"
- **THEN** the underlying domain selection state changes to `@utem.edu.my`
