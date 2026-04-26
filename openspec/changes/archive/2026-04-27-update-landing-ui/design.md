## Context

The current Landing Screen was implemented based on initial specifications, featuring a centered logo and solid background. The new design requirements (image#2) introduce a more sophisticated layout with a faded background image, a combined logo and text header, larger feature icons, and updated button colors (matching the Primary 600 token from the design system).

## Goals / Non-Goals

**Goals:**
- Update `app/index.tsx` layout to match the new visual hierarchy.
- Utilize the Primary 600 color (`#245CDE`) for the primary action button on the landing page.
- Ensure the background seamlessly blends the `Branding page.png` asset with a dark blue tint.

**Non-Goals:**
- Changes to the underlying authentication logic.
- Changes to the reanimated bottom-sheet logic, other than button labels and styling.

## Decisions

- **Background Styling**: Use `ImageBackground` combined with a dark overlay (e.g., `bg-[#081C4A]` with `opacity-80` or similar) to achieve the faded blue background effect over the building image.
- **Header Layout**: Use a flex-row container combining `logo-w.png` with stylized "UTeM Ride" text next to it.
- **Button Styling**: Update `PrimaryButton` color on the landing screen to use `Primary 600` (`#245CDE`). Since `tailwind.config.js` maps `secondary: { DEFAULT: "#245CDE" }`, we can adjust the component styling or add `primary-600` specifically if needed.

## Risks / Trade-offs

- **Layout Shifts**: Larger icons and a new header might cause spacing issues on smaller screens.
  - *Mitigation*: Use flexible spacing (`flex-1`, percentage heights) and ensure safe area paddings are appropriate.
