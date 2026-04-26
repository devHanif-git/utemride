import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "../src/components/PrimaryButton";
import InputField from "../src/components/InputField";
import { apiClient } from "../src/api/client";

const skyline = require("../src/assets/images/skyline.png");

export default function LoginScreen() {
  const router = useRouter();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const [credentialsLoaded, setCredentialsLoaded] = useState(false);

  const isValidEmail =
    email.endsWith("@student.utem.edu.my") || email.endsWith("@utem.edu.my");

  // Load saved credentials on mount
  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await SecureStore.getItemAsync("rememberedEmail");
        const savedPassword = await SecureStore.getItemAsync("rememberedPassword");
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } finally {
        setCredentialsLoaded(true);
      }
    };
    loadSavedCredentials();
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) return;
    if (isRegisterMode && (!name || !studentId)) {
      Alert.alert("Missing Fields", "Please provide your Name and Student ID.");
      return;
    }

    setLoading(true);

    try {
      if (isRegisterMode) {
        // --- API REGISTER ---
        const response = await apiClient.post("/auth/register", {
          email,
          password,
          name,
          studentId,
        });
        const token = response.data.accessToken;
        await SecureStore.setItemAsync("userToken", token);

        // Send OTP for email verification
        await apiClient.post("/auth/send-otp", { email });

        // Navigate to OTP screen
        router.push({ pathname: "/otp", params: { email } });
      } else {
        // --- API LOGIN ---
        const response = await apiClient.post("/auth/login", {
          email,
          password,
        });
        const token = response.data.accessToken;
        await SecureStore.setItemAsync("userToken", token);

        // Save or clear remembered credentials
        if (rememberMe) {
          await SecureStore.setItemAsync("rememberedEmail", email);
          await SecureStore.setItemAsync("rememberedPassword", password);
        } else {
          await SecureStore.deleteItemAsync("rememberedEmail");
          await SecureStore.deleteItemAsync("rememberedPassword");
        }

        // Route based on user role
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
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Check your connection.";
      Alert.alert(
        "Authentication Failed",
        typeof message === "string" ? message : message[0],
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Main Content */}
          <View className="flex-1 px-8 pt-12 pb-6">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-3xl font-poppins-bold text-primary mb-1">
                {isRegisterMode ? "Create Account" : "Welcome Back!"}
              </Text>
              <Text className="text-base font-poppins text-gray-500 leading-6">
                {isRegisterMode
                  ? "Join the UTeM Ride community."
                  : "Log in with your UTeM email\nto continue."}
              </Text>
            </View>

            {/* Fields */}
            {isRegisterMode && (
              <>
                <View className="mb-4">
                  <InputField
                    label="Full Name"
                    placeholder="e.g. Ali Bin Abu"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
                <View className="mb-4">
                  <InputField
                    label="Student ID"
                    placeholder="e.g. B032410000"
                    value={studentId}
                    onChangeText={setStudentId}
                    autoCapitalize="characters"
                  />
                </View>
              </>
            )}

            <View className="mb-4">
              <InputField
                label="UTeM Email"
                placeholder="b032410000@student.utem.edu.my"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={
                  email.length > 0 && !isValidEmail
                    ? "Please use your UTeM email address"
                    : undefined
                }
              />
            </View>

            <View className="mb-4">
              <InputField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                rightIcon={
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#9CA3AF"
                  />
                }
                onRightIconPress={() => setShowPassword(!showPassword)}
              />
            </View>

            {/* Remember Me */}
            {!isRegisterMode && (
              <Pressable
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center mb-6"
              >
                <Ionicons
                  name={rememberMe ? "checkbox" : "square-outline"}
                  size={22}
                  color={rememberMe ? "#2952CC" : "#D1D5DB"}
                />
                <Text className="text-sm font-poppins text-gray-500 ml-2">
                  Remember me
                </Text>
              </Pressable>
            )}

            {/* Continue Button */}
            <PrimaryButton
              title={isRegisterMode ? "Register" : "Login"}
              onPress={handleSubmit}
              loading={loading}
            />

            {/* Toggle Mode */}
            <View className="flex-row justify-center mt-6">
              <Text className="font-poppins text-gray-600">
                {isRegisterMode
                  ? "Already have an account? "
                  : "Don't have an account? "}
              </Text>
              <Pressable onPress={async () => {
                const goingToRegister = !isRegisterMode;
                setIsRegisterMode(goingToRegister);
                setShowPassword(false);

                if (goingToRegister) {
                  // Clear fields for fresh registration
                  setEmail("");
                  setPassword("");
                  setName("");
                  setStudentId("");
                } else {
                  // Restore remembered credentials for login
                  setCredentialsLoaded(false);
                  const savedEmail = await SecureStore.getItemAsync("rememberedEmail");
                  const savedPassword = await SecureStore.getItemAsync("rememberedPassword");
                  if (savedEmail && savedPassword) {
                    setEmail(savedEmail);
                    setPassword(savedPassword);
                    setRememberMe(true);
                  } else {
                    setEmail("");
                    setPassword("");
                  }
                  setName("");
                  setStudentId("");
                  setCredentialsLoaded(true);
                }
              }}>
                <Text className="font-poppins-bold text-secondary">
                  {isRegisterMode ? "Log In" : "Register"}
                </Text>
              </Pressable>
            </View>

            {/* Terms & Privacy */}
            <View className="mt-8 items-center">
              <Text className="text-xs font-poppins text-gray-400 text-center leading-5">
                By continuing, you agree to our{" "}
              </Text>
              <View className="flex-row">
                <Link href="/terms" asChild>
                  <Pressable>
                    <Text className="text-xs font-poppins-semibold text-secondary underline">
                      Terms of Service
                    </Text>
                  </Pressable>
                </Link>
                <Text className="text-xs font-poppins text-gray-400">
                  {" "}
                  and{" "}
                </Text>
                <Link href="/privacy" asChild>
                  <Pressable>
                    <Text className="text-xs font-poppins-semibold text-secondary underline">
                      Privacy Policy
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>

          {/* Skyline Illustration (bottom) */}
          <View className="w-full items-center mt-auto">
            <Image
              source={skyline}
              className="w-full h-64"
              resizeMode="cover"
              style={{ opacity: 0.6, marginBottom: -60 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
