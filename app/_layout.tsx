import { useEffect, useState } from "react";
import { LogBox, View } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import "../global.css";
import { useAppInitialization } from "../src/hooks/useAppInitialization";
import { SplashScreenComponent } from "../src/components/ui/SplashScreen";

// Prevent the native splash screen from auto-hiding
// We control it manually after fonts load
SplashScreen.preventAutoHideAsync();

// Suppress deprecation warning from internal Expo/RN libraries (not our code)
LogBox.ignoreLogs(["SafeAreaView has been deprecated"]);

/**
 * Root layout — handles font loading, splash screen control,
 * and wraps the app in required providers.
 */
export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const { isReady: isAppReady, initialRoute } = useAppInitialization();
  const [minSplashTimeElapsed, setMinSplashTimeElapsed] = useState(false);

  useEffect(() => {
    // Hide the native splash screen as soon as fonts are loaded so we can show our custom one
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    // Force the custom splash to show for at least 1.8 seconds to allow the loading animation to play
    const timer = setTimeout(() => {
      setMinSplashTimeElapsed(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const isFullyReady = fontsLoaded && isAppReady && minSplashTimeElapsed;

  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (isFullyReady && !hasNavigated) {
      // If we are fully ready, push to the correct initial route
      if (initialRoute.pathname !== "/") {
        // Small delay to let the Stack mount before redirecting
        setTimeout(() => {
          router.replace(initialRoute as any);
        }, 10);
      }
      setHasNavigated(true);
    }
  }, [isFullyReady, hasNavigated, initialRoute]);

  if (!isFullyReady) {
    // Only render the custom splash screen if fonts are loaded (otherwise text will crash)
    if (fontsLoaded) {
      return (
        <SafeAreaProvider>
          <StatusBar style="light" />
          <SplashScreenComponent />
        </SafeAreaProvider>
      );
    }
    return null; // Keep native splash visible while fonts load
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: { backgroundColor: "#FFFFFF" },
        }}
      />
    </SafeAreaProvider>
  );
}
