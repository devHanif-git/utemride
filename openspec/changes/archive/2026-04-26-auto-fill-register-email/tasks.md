## 1. Form State Management

- [x] 1.1 Add an `emailDomain` state variable to `app/login.tsx` (default: `@student.utem.edu.my`).
- [x] 1.2 Add a `useEffect` hook to automatically update the `email` state when `studentId` or `emailDomain` changes, ONLY if `isRegisterMode` is true.
- [x] 1.3 Ensure `emailDomain` and derived `email` state reset correctly when toggling between Login and Registration modes.

## 2. UI Implementation

- [x] 2.1 Create a Domain Selector UI (e.g., segmented control or simple radio buttons) to allow choosing between "Student" and "Staff" roles in Registration mode.
- [x] 2.2 Update the Email `InputField` to be read-only (`editable={!isRegisterMode}`) during registration so users cannot manually override the derived email.
- [x] 2.3 Apply appropriate visual styling to the Domain Selector to match the application's design system.
