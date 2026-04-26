## Context

Currently, the UTeM Ride app's registration screen requires users to manually input their full UTeM email address, even though they are also providing a Student/Staff ID. The email format is strictly tied to this ID (`{id}@student.utem.edu.my` or `{id}@utem.edu.my`). Manually typing this introduces a redundant step and a chance for typographical errors.

## Goals / Non-Goals

**Goals:**
- Dynamically generate the user's email address during registration using their inputted ID and a selected domain.
- Provide a UI mechanism to select between the student and staff email domains.
- Make the Email field read-only during registration to reflect the auto-generated email.
- Ensure the login flow's email input remains unaffected.

**Non-Goals:**
- Completely remove the email field from the UI during registration (it should still be visible for confirmation).
- Apply this logic to the Login mode (users logging in will still type their email or use remembered credentials).

## Decisions

1. **Derived State for Email in Registration Mode:**
   - We will introduce a new state variable `emailDomain` defaulting to `@student.utem.edu.my`.
   - When `isRegisterMode` is true, the `email` state will be automatically derived from `studentId` and `emailDomain` using a `useEffect` hook.
   - Example: `${studentId.toLowerCase()}${emailDomain}`.

2. **Domain Selector UI:**
   - We will add a simple toggle or segmented control UI above or near the Email field (only visible in Registration mode) to let users choose between "Student" and "Staff".
   - Toggling this will update `emailDomain`.

3. **Read-Only InputField:**
   - The `InputField` component used for the email will receive an `editable={!isRegisterMode}` prop (or similar mechanism depending on the component's capabilities) to prevent manual typing during registration, or a visual overlay indicating it's auto-generated.

## Risks / Trade-offs

- **Risk:** Users might expect to type their email directly even during registration.
  - **Mitigation:** Visually style the email field as disabled/read-only in registration mode and provide clear labeling on the domain selector so they understand it is auto-generated.
- **Risk:** Existing `email` validation might clash if the student ID is initially empty.
  - **Mitigation:** The derived email might be just `@student.utem.edu.my`. We only validate when they hit submit, or we disable the error state when `studentId` is empty.
