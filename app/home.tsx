import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

/**
 * Home (Map) — Placeholder screen.
 * This is the main landing page for standard riders.
 * Map and ride features will be implemented later.
 */
export default function HomeScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();

  const handleBack = () => {
    if (role === "DRIVER" || role === "ADMIN") {
      router.replace("/choose-mode");
    } else {
      // Temporary for RIDER — will be removed when sign-out is implemented
      router.replace("/login");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-8 pt-4">
        {/* Back Button */}
        <Pressable
          onPress={handleBack}
          className="mb-6 p-2 -ml-2 self-start"
        >
          <Ionicons name="chevron-back" size={28} color="#0c2360" />
        </Pressable>

        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-poppins-bold text-primary mb-2">
            Home
          </Text>
          <Text className="text-base font-poppins text-gray-400 text-center">
            Map and ride features coming soon.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
