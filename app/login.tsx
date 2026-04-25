import { useState } from "react";
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

import PrimaryButton from "../src/components/PrimaryButton";
import InputField from "../src/components/InputField";
import { apiClient } from "../src/api/client";

const skyline = require("../src/assets/images/skyline.png");

export default function LoginScreen() {
  const router = useRouter();
  
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const isValidEmail = email.endsWith("@student.utem.edu.my") || email.endsWith("@utem.edu.my");

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
        Alert.alert("Success", "Account created successfully!");
        
      } else {
        // --- API LOGIN ---
        const response = await apiClient.post("/auth/login", {
          email,
          password,
        });
        const token = response.data.accessToken;
        await SecureStore.setItemAsync("userToken", token);
        Alert.alert("Success", "Welcome back!");
      }
      
      // Navigate to Home screen when authentication logic is verified.
      // router.replace("/(tabs)/home");

    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong. Check your connection.";
      Alert.alert("Authentication Failed", typeof message === "string" ? message : message[0]);
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

            <View className="mb-6">
              <InputField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Continue Button */}
            <PrimaryButton
              title={isRegisterMode ? "Register" : "Login"}
              onPress={handleSubmit}
              loading={loading}
              disabled={!isValidEmail || password.length < 8}
            />

            {/* Toggle Mode */}
            <View className="flex-row justify-center mt-6">
              <Text className="font-poppins text-gray-600">
                {isRegisterMode ? "Already have an account? " : "Don't have an account? "}
              </Text>
              <Pressable onPress={() => setIsRegisterMode(!isRegisterMode)}>
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
                  {" "}and{" "}
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
          <View className="w-full items-center">
            <Image
              source={skyline}
              className="w-full h-40"
              resizeMode="cover"
              style={{ opacity: 0.6 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
