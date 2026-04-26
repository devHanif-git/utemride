import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { apiClient } from "../src/api/client";

const OTP_LENGTH = 6;

export default function OTPScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const hiddenInputRef = useRef<TextInput>(null);

  // Start countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (text: string) => {
    // Only allow digits, max OTP_LENGTH
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH);
    setCode(cleaned);

    // Auto-submit when all digits entered
    if (cleaned.length === OTP_LENGTH) {
      handleVerify(cleaned);
    }
  };

  const handleVerify = async (otpCode: string) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/verify-otp", {
        email,
        code: otpCode,
      });
      const role = response.data.user?.role;
      const userName = response.data.user?.name;

      if (role === "DRIVER" || role === "ADMIN") {
        router.replace({
          pathname: "/choose-mode",
          params: { name: userName },
        });
      } else {
        router.replace({ pathname: "/home", params: { role: "RIDER" } });
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Verification failed. Try again.";
      Alert.alert(
        "Invalid Code",
        typeof message === "string" ? message : message[0],
      );
      // Clear on failure
      setCode("");
      hiddenInputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await apiClient.post("/auth/send-otp", { email });
      setTimer(60);
      Alert.alert("Code Sent", "A new OTP has been sent.");
    } catch {
      Alert.alert("Error", "Failed to resend code.");
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Split code into array of digits for display
  const digits = code.split("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-8 pt-4">
          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            className="mb-8 p-2 -ml-2 self-start"
          >
            <Ionicons name="chevron-back" size={28} color="#0c2360" />
          </Pressable>

          {/* Header */}
          <View className="mb-10">
            <Text className="text-4xl font-poppins-bold text-primary mb-3">
              Enter OTP
            </Text>
            <Text className="text-base font-poppins text-gray-500 leading-6">
              We've sent a 6-digit code to{"\n"}
              <Text className="font-poppins-semibold text-primary">
                {email || "your email"}
              </Text>
            </Text>
          </View>

          {/* Hidden real input — captures all keyboard input */}
          <TextInput
            ref={hiddenInputRef}
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={OTP_LENGTH}
            autoFocus
            style={{
              position: "absolute",
              opacity: 0,
              height: 0,
              width: 0,
            }}
          />

          {/* Visual OTP Boxes — tapping focuses the hidden input */}
          <Pressable onPress={() => hiddenInputRef.current?.focus()}>
            <View className="flex-row justify-between mb-10 px-2">
              {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                const isFilled = index < digits.length;
                const isActive = index === digits.length;

                return (
                  <View
                    key={index}
                    className="rounded-xl items-center justify-center"
                    style={{
                      width: 50,
                      height: 58,
                      borderWidth: 2,
                      borderColor: isActive
                        ? "#4274EE"
                        : isFilled
                          ? "#4274EE"
                          : "#E5E7EB",
                      backgroundColor: isFilled ? "#F0F4FF" : "#FFFFFF",
                    }}
                  >
                    <Text
                      className="text-2xl font-poppins-bold"
                      style={{
                        color: isFilled ? "#0c2360" : "#D1D5DB",
                      }}
                    >
                      {digits[index] || ""}
                    </Text>
                    {/* Cursor blink effect */}
                    {isActive && (
                      <View
                        style={{
                          position: "absolute",
                          bottom: 12,
                          width: 2,
                          height: 24,
                          backgroundColor: "#4274EE",
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </Pressable>

          {/* Timer / Resend */}
          <View className="items-center">
            {timer > 0 ? (
              <Text className="text-sm font-poppins text-gray-400">
                Resend code in{" "}
                <Text className="font-poppins-semibold">
                  {formatTimer(timer)}
                </Text>
              </Text>
            ) : (
              <Pressable onPress={handleResend}>
                <Text className="text-sm font-poppins-semibold text-secondary">
                  Resend Code
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Loading overlay */}
        {loading && (
          <View
            className="absolute inset-0 justify-center items-center"
            style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
          >
            <ActivityIndicator size="large" color="#4274EE" />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
