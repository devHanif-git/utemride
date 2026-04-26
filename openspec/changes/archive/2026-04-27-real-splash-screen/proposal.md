# Proposal: Implement Genuine Splash Screen Flow

## What we want to build
We will implement a true, native-feeling splash screen flow for the UTeM Ride app. This replaces the current faux-splash screen approach, which simply renders a logo inside `app/index.tsx` while checking authentication. 

## Why it's needed
Currently, the application mounts `app/index.tsx` immediately and uses a React state (`isCheckingAuth`) to mask the UI while determining the user's login status. 
- **Asset Loading**: A real splash screen provides the necessary buffer time to pre-load heavy assets (like high-res background images, custom fonts, etc.) before the first frame of the UI renders.
- **UX & Polish**: True splash screens prevent UI flickering and jarring transitions. They keep the native device splash screen visible (via Expo's `expo-splash-screen`) until the app is fully ready (assets loaded + auth checked), offering a seamless, professional experience.
