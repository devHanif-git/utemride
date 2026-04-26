## Why

To ensure visual consistency and a cohesive user experience across the UTeM Ride application, a centralized design system needs to be established. This system will serve as the foundation for all future UI/UX design work, ensuring the app maintains a trustworthy, safe, student-first, and campus-focused identity that resonates with university students.

## What Changes

- Establish a core brand style inspired by university systems rather than generic ride apps.
- Define a comprehensive color palette including primary, secondary, accent, background, and semantic (success, warning, error) colors.
- Set typography standards using Poppins for headings and Inter for body text.
- Standardize UI styling with rounded cards, soft shadows, 8pt grid spacing, and a minimal, focused layout.
- Define core components: clean input fields with icons, primary/secondary buttons, card-based layouts, bottom navigation, and status badges.
- Incorporate specific brand elements using the newly provided assets: `src/assets/images/logo-p.png` (primary logo), `src/assets/images/logo-b.png` (bold version logo), and `src/assets/images/Branding page.png` for background/theming.
- Establish UX principles focusing on simplicity, clarity, trust, reduced friction, and highlighting primary actions.
- Define map styling conventions (clean map, blue routes, UI overlays).
- Implement a robust initial routing flow: Splash screen -> Landing screen (if unauthenticated) or Main/Mode selection (if authenticated).
- Create a new landing screen featuring a dark background with brand elements, feature highlights, and a bottom sheet for authentication actions ("Create Account" and "Log In").
- Implement a smooth sliding animation transition where the bottom sheet expands upwards to reveal the Login or Registration forms.

## Capabilities

### New Capabilities
- `design-system`: Establishes the foundational UI/UX tokens, components, and brand guidelines for the application.
- `landing-screen`: Introduces a new landing screen shown after the splash screen, introducing the app before login.

### Modified Capabilities
- `auth-flow`: The authentication flow will be updated to incorporate the new landing screen before the login screen, and the UI will be updated to follow the new design system.

## Impact

- All frontend UI components and screens will eventually need to adopt this design system.
- The initial app navigation flow is impacted by adding a landing screen between the splash and login screens.
- Global stylesheet and theme configuration (e.g. TailwindCSS/NativeWind configuration) will be significantly updated to reflect these design tokens.
