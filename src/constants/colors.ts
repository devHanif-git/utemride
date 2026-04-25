/**
 * UTeM Ride — Brand Color Tokens
 *
 * Primary: Deep Blue (#0A1F44) — used for splash bg, headings, dark surfaces
 * Secondary: Bright Blue (#2F6BFF) — used for buttons, links, accents
 * Accent: Light Blue (#E6F0FF) — used for input backgrounds, highlights
 */

export const Colors = {
  primary: "#0A1F44",
  secondary: "#2F6BFF",
  accent: "#E6F0FF",
  white: "#FFFFFF",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
} as const;

export type ColorToken = typeof Colors;
