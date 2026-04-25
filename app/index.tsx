import { useEffect, useRef } from "react";
import { View, Text, Image, Animated } from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// Update this to whatever logo asset best matches the shield in the mockup
const logo = require("../src/assets/images/logo.png");

export default function SplashScreen() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  // Creates an array of 4 Animated Values, initialized to opacity 0.3
  const dotOpacities = useRef(
    [...Array(4)].map(() => new Animated.Value(0.3)),
  ).current;

  useEffect(() => {
    // Wait until navigation is ready before scheduling the redirect
    if (!navigationState?.key) return;

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 3000);

    const animate = () => {
      const animations = dotOpacities.map((val, i) =>
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(val, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0.3,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
      );

      Animated.loop(Animated.stagger(150, animations)).start();
    };

    animate();

    return () => clearTimeout(timer);
  }, [navigationState?.key]);

  return (
    <SafeAreaView className="flex-1 bg-primary relative">
      <View className="flex-1 items-center justify-center px-8">
        {/* Shield Logo */}
        <View className="items-center mb-6">
          <Image source={logo} className="w-48 h-48" resizeMode="contain" />
        </View>

        {/* App Name: UTeM RIDE */}
        <View className="flex-row items-center justify-center">
          <Text className="text-4xl font-poppins-bold text-white tracking-wide">
            UTeM{" "}
          </Text>
          <Text className="text-4xl font-poppins-bold text-secondary tracking-wide">
            RIDE
          </Text>
        </View>

        {/* Tagline */}
        <View className="items-center mt-2 mb-10">
          <Text className="text-sm font-poppins text-gray-300 tracking-wider">
            Your Campus. Your Ride.
          </Text>
        </View>
      </View>

      {/* Loading Dots Indicator at bottom */}
      <View className="absolute bottom-16 w-full flex-row justify-center space-x-3">
        {dotOpacities.map((animatedOpacity, index) => (
          <Animated.View
            key={index}
            style={{ opacity: animatedOpacity }}
            className="w-2 h-2 rounded-full bg-secondary"
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
