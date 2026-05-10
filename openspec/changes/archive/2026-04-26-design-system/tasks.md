## 1. Design Tokens & Fonts

- [x] 1.1 Update `tailwind.config.js` with the new color palette (primary, secondary, accent, background, and semantic colors).
- [x] 1.2 Update `tailwind.config.js` with typography families (Poppins, Inter) and border radius tokens (12-16px).
- [x] 1.3 Install and configure `expo-font` to load Poppins and Inter fonts.
- [x] 1.4 Update the root layout to use `SplashScreen.preventAutoHideAsync()` while fonts are loading.

## 2. Core UI Components

- [x] 2.1 Create `PrimaryButton` component in `components/ui` using NativeWind.
- [x] 2.2 Create `SecondaryButton` component (outlined style) in `components/ui`.
- [x] 2.3 Create `TextInputField` component with support for icons in `components/ui`.
- [x] 2.4 Create `Card` layout component with standard elevation/shadows in `components/ui`.
- [x] 2.5 Create `Badge` component for status indicators (success, pending, error).

## 3. Landing Screen Implementation

- [x] 3.1 Implement initial routing logic in the root layout to direct authenticated users to the main app, and unauthenticated users to the Landing screen.
- [x] 3.2 Create the Landing screen UI with the dark background, `Branding page.png`, `logo-p.png` (primary logo), and feature highlight rows.
- [x] 3.3 Create the white bottom sheet component containing the "Let's Get Started" text, a primary "Verify My Campus Account" button, and an outlined "Log In" button.
- [x] 3.4 Implement the sliding upward animation (using `react-native-reanimated`) for the bottom sheet when an auth action is pressed.
- [x] 3.5 Integrate the Login and Registration forms into the expanded bottom sheet state for a seamless transition.

## 4. Auth Flow Design System Adoption

- [x] 4.1 Refactor the Login screen to use the newly created `TextInputField`, `PrimaryButton`, and other UI components.
- [x] 4.2 Refactor the Registration screen to use the new core UI components.
- [x] 4.3 Verify that layout, spacing, and typography on both auth screens adhere to the established design system guidelines.
