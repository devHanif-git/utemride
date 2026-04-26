## Purpose
Define the authentication flows, rules, and requirements for the UTeM Ride application.
## Requirements
### Requirement: Derived Registration Email
The system SHALL dynamically construct the user's email address during registration by concatenating the inputted ID (Student/Staff ID) and the selected domain, and SHALL NOT allow manual editing of the email prefix.

#### Scenario: User types Student ID with Student domain
- **WHEN** the user is in registration mode
- **AND** the user enters "B032410000" in the Student ID field
- **AND** the selected domain is "Student"
- **THEN** the user's registration email state updates to "b032410000@student.utem.edu.my"
- **AND** the email input field reflects this derived value and is read-only

#### Scenario: User types Staff ID with Staff domain
- **WHEN** the user is in registration mode
- **AND** the user enters "12345" in the Student/Staff ID field
- **AND** the selected domain is "Staff"
- **THEN** the user's registration email state updates to "12345@utem.edu.my"
- **AND** the email input field reflects this derived value and is read-only

#### Scenario: User switches back to Login mode
- **WHEN** the user toggles from Register to Login mode
- **THEN** the email input field becomes manually editable
- **AND** the domain selector UI is hidden

### Requirement: Design System Adoption in Auth Flow
The authentication flow screens (Login and Registration) SHALL adopt the new UTeM Ride design system, replacing ad-hoc styles with standardized design tokens and components.

#### Scenario: Viewing the Login Screen
- **WHEN** the user views the login screen
- **THEN** the inputs, buttons, typography, and colors reflect the centralized design system.

