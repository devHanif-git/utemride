# landing-screen Specification

## Purpose
TBD - created by archiving change design-system. Update Purpose after archive.
## Requirements
### Requirement: Initial Routing based on Auth State
The system SHALL route the user to the appropriate initial screen based on their authentication state after the splash screen is dismissed.

#### Scenario: Unauthenticated User
- **WHEN** an unauthenticated user opens the application
- **THEN** the system routes them to the Landing screen.

#### Scenario: Authenticated User
- **WHEN** an authenticated user opens the application
- **THEN** the system routes them to the Choose Mode or Main page based on their role.

### Requirement: Display Landing Screen Content
The Landing screen SHALL display branding elements, feature highlights, and a bottom sheet with authentication actions.

#### Scenario: Viewing Landing Screen
- **WHEN** the user views the Landing screen
- **THEN** the background displays `Branding page.png` blended with a dark blue overlay
- **AND** the header displays `logo-w.png` alongside the text "UTeM Ride" and the tagline "Your Campus. Your Ride."
- **AND** feature highlights are visible with appropriately sized icons
- **AND** a white bottom sheet displays "Let's Get Started" with "Verify My Campus Account" (Primary 600 color) and "Log In" buttons.

### Requirement: Animated Auth Transition
The Landing screen SHALL transition to the authentication forms using a sliding upward animation of the bottom sheet.

#### Scenario: Proceeding to Login or Register
- **WHEN** the user taps "Verify My Campus Account" or "Log In"
- **THEN** the white bottom sheet animates to the top of the screen
- **AND** the corresponding authentication form is revealed seamlessly within the expanded sheet.

