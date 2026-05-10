## Context

The UTeM Ride application currently lacks a cohesive and scalable design system. To support future development and maintain visual consistency, we need to establish a set of design tokens and core UI components. The brand identity is tailored to university students—trustworthy, safe, student-first, and campus-focused. This design system will define colors, typography, spacing, and component styling, starting with an implementation on a new Landing screen and the existing Auth flow.

## Goals / Non-Goals

**Goals:**
- Define design tokens (colors, typography, radiuses, shadows) within the Tailwind/NativeWind configuration.
- Implement reusable UI components (`PrimaryButton`, `SecondaryButton`, `TextInputField`, `Card`, `Badge`) that consume these tokens.
- Add a new Landing screen to introduce the app and apply the new brand styles.
- Update the Authentication flow to adhere to the newly established design system.
- Ensure cross-platform consistency for these styles (iOS and Android).

**Non-Goals:**
- Redesigning the entire application in this single change (focus is on establishing the system, the landing screen, and the auth flow).
- Implementing complex, custom animations.
- Overhauling backend logic or navigation flow beyond the insertion of the Landing screen.

## Decisions

- **Styling Solution**: Use NativeWind to implement the design tokens by extending `tailwind.config.js` with the custom color palette (e.g., primary: `#081C4A`), typography (Poppins, Inter), and border radius settings (12-16px).
  - *Rationale*: NativeWind allows the use of standard utility classes while maintaining a single source of truth for the design system.
- **Font Loading**: Utilize `expo-font` to load "Poppins" and "Inter" fonts.
  - *Rationale*: Guarantees correct font rendering across devices. The Splash screen will wait for fonts to load before hiding.
- **Component Architecture**: Create foundational functional components in a `components/ui/` directory. These components will encapsulate the NativeWind utility classes to prevent repetition and enforce consistency.
- **Initial Routing Logic**: The root layout will handle authentication state checks. If authenticated, route to main/mode selection. If unauthenticated, route to the new Landing screen.
- **Landing Screen Architecture**: The Landing screen will utilize `Branding page.png` for the background and `logo-p.png` (primary logo) for branding, along with a list of feature highlights. A bottom sheet container will house the "Let's Get Started" section with "Verify My Campus Account" and "Log In" buttons.
- **Auth Transition Animation**: When the user presses a button on the Landing screen, a shared element transition or an animated bottom sheet (using `react-native-reanimated`) will slide the white container upwards to cover the screen and seamlessly render the requested authentication form (Login or Register).

## Risks / Trade-offs

- **Risk**: Font loading latency could cause unstyled text or layout shifts upon startup.
  - *Mitigation*: Use Expo's `SplashScreen.preventAutoHideAsync()` to hold the splash screen until all custom fonts are completely loaded.
- **Risk**: Platform-specific styling discrepancies, particularly regarding shadows and elevation (Android vs. iOS).
  - *Mitigation*: Standardize a minimal elevation approach using predefined NativeWind shadow utility classes, heavily testing on both platforms. Map UI overlays will be explicitly absolutely positioned and z-indexed correctly.
