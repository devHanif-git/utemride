## Why

The current Landing Screen UI differs from the newly specified design mockup (image#2). We need to align the layout, typography, colors, and asset usage to match the final desired UI and the design system guidelines. This ensures brand consistency, readability, and a more engaging first impression for the users.

## What Changes

- Modify the Landing Screen header to display the `logo-w` icon beside the "UTeM Ride" text (with "Ride" styled in the correct blue color), accompanied by the tagline "Your Campus. Your Ride."
- Increase the size of the icons in the feature rows for better visibility.
- Update the primary button color to match the "Primary 600" token (`#245CDE`).
- Update the bottom sheet button labels to "Create Account" and "I Already Have an Account" (replacing "Log In").
- Adjust the background styling to properly blend `Branding page.png` with a dark blue faded overlay.

## Capabilities

### New Capabilities
*(None)*

### Modified Capabilities
- `landing-screen`: UI layout, button text, and styling updates to match the new mockup.

## Impact

- `app/index.tsx`: Significant UI refactoring.
- `src/components/ui/PrimaryButton.tsx`: Potential color mapping updates to use Primary 600.
