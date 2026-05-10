import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

const riderImg = require("../src/assets/images/rider.png");
const driverImg = require("../src/assets/images/driver.png");

/**
 * Choose Mode — shown to users with DRIVER role after login/OTP.
 * Lets them pick between Rider or Driver mode.
 */
export default function ChooseModeScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();

  const firstName = name ? name.split(" ")[0] : "there";

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-7 pt-4">
        <View className="mb-6 flex-row justify-end">
          <Pressable
            onPress={handleLogout}
            className="flex-row items-center rounded-full bg-primary-100 px-4 py-2"
          >
            <Ionicons name="log-out-outline" size={18} color="#245CDE" />
            <Text className="ml-2 text-sm font-poppins-semibold text-secondary">
              Log Out
            </Text>
          </Pressable>
        </View>

        {/* Greeting */}
        <Text className="text-4xl font-poppins-bold text-primary mb-2">
          Hi {firstName}! 👋
        </Text>
        <Text className="text-lg font-poppins text-gray-400 leading-7 mb-10">
          Choose how you want{"\n"}to continue.
        </Text>

        {/* Ride Card — Blue */}
        <Pressable
          onPress={() =>
            router.replace({ pathname: "/home", params: { role: "DRIVER" } })
          }
          className="mb-5"
          style={({ pressed }) => ({
            opacity: pressed ? 0.92 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <View
            className="rounded-3xl overflow-hidden"
            style={{
              backgroundColor: "#2952CC",
              elevation: 8,
              shadowColor: "#2952CC",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
            }}
          >
            <View className="flex-row items-end justify-between">
              {/* Text content */}
              <View className="pl-7 pt-8 pb-8 flex-1">
                <Text
                  className="text-sm font-poppins mb-1"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  I want to
                </Text>
                <Text className="text-4xl font-poppins-bold text-white">
                  Ride
                </Text>
              </View>

              {/* Image container — clips the white bg */}
              <View
                className="overflow-hidden rounded-bl-3xl"
                style={{ width: 150, height: 150 }}
              >
                <Image
                  source={riderImg}
                  style={{ width: 150, height: 150 }}
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Checkmark badge */}
            <View
              className="absolute top-4 right-4 rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: 2,
              }}
            >
              <Ionicons name="checkmark-circle" size={26} color="#FFFFFF" />
            </View>
          </View>
        </Pressable>

        {/* Drive Card — White */}
        <Pressable
          onPress={() =>
            router.replace({ pathname: "/home", params: { role: "DRIVER" } })
          }
          style={({ pressed }) => ({
            opacity: pressed ? 0.92 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <View
            className="rounded-3xl overflow-hidden"
            style={{
              backgroundColor: "#FAFBFF",
              borderWidth: 1.5,
              borderColor: "#E2E8F0",
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            }}
          >
            <View className="flex-row items-end justify-between">
              {/* Text content */}
              <View className="pl-7 pt-8 pb-8 flex-1">
                <Text className="text-sm font-poppins text-gray-400 mb-1">
                  I want to
                </Text>
                <Text className="text-4xl font-poppins-bold text-primary">
                  Drive
                </Text>
              </View>

              {/* Image container */}
              <View
                className="overflow-hidden rounded-bl-3xl"
                style={{ width: 150, height: 150 }}
              >
                <Image
                  source={driverImg}
                  style={{ width: 150, height: 150 }}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
