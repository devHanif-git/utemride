/**
 * Shared TypeScript types for UTeM Ride app
 */

export interface User {
  id: string;
  email: string;
  name: string;
  studentId: string;
  avatarUrl?: string;
}

export interface RideRequest {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: "pending" | "accepted" | "in-progress" | "completed" | "cancelled";
  requestedAt: string;
  estimatedArrival?: string;
}

export type AppScreen = "splash" | "login" | "otp" | "choose-mode" | "home" | "terms" | "privacy";

export type UserRole = "RIDER" | "DRIVER" | "ADMIN";
