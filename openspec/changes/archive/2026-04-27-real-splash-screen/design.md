# Design: Genuine Splash Screen Architecture

## Architecture & Flow
Instead of handling the loading state within individual screens, we will elevate the splash screen management to the root level (`app/_layout.tsx`).

1. **Native Splash Retention**: Utilize `expo-splash-screen` to `preventAutoHideAsync()` as soon as the app launches. This holds the native splash screen (or a custom initial View if we implement a custom animated splash) on screen.
2. **Parallel Initialization**: While the splash is held, we will execute our initialization tasks concurrently:
   - **Asset Pre-loading**: Load critical images (like `Branding page.png`, `logo-w.png`) using `Asset.loadAsync` or `Image.prefetch`.
   - **Font Pre-loading**: Load custom fonts (Poppins, Inter) using `Font.loadAsync` or Expo's `useFonts` hook.
   - **Auth Resolution**: Check `SecureStore` and validate the user token against the backend to determine the initial route (`/`, `/home`, or `/choose-mode`).
3. **Transition**: Once `Promise.all` resolves for the initialization tasks, we will `hideAsync()` the splash screen and safely render the determined route. If the user provides a custom animated splash screen design, we can swap the native splash hide for a smooth fade-out animation component mounted at the root layout.
