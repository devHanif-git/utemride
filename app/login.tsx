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
import { useRouter, Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

import { PrimaryButton } from "../src/components/ui/PrimaryButton";
import { TextInputField } from "../src/components/ui/TextInputField";
import { apiClient } from "../src/api/client";

const skyline = require("../src/assets/images/skyline.png");
const logo = require("../src/assets/images/logo-b.png");

export default function LoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [isRegisterMode, setIsRegisterMode] = useState(
    params.mode === "register",
  );
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [emailDomain, setEmailDomain] = useState("@student.utem.edu.my");

  const [credentialsLoaded, setCredentialsLoaded] = useState(false);

  const isValidEmail =
    email.endsWith("@student.utem.edu.my") || email.endsWith("@utem.edu.my");
  const hasMinimumLength = password.length >= 8;
  const hasLettersAndNumbers = /[A-Za-z]/.test(password) && /\d/.test(password);
  const hasSpecialCharacter = /[^A-Za-z0-9]/.test(password);
  const isStrongPassword =
    hasMinimumLength && hasLettersAndNumbers && hasSpecialCharacter;

  const restoreLoginCredentials = async () => {
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
      setRememberMe(false);
    }
    setCredentialsLoaded(true);
  };

  const resetRegisterFields = () => {
    setPassword("");
    setConfirmPassword("");
    setName("");
    setStudentId("");
    setEmailDomain("@student.utem.edu.my");
    setAcceptedTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchToLoginMode = async () => {
    setIsRegisterMode(false);
    resetRegisterFields();
    await restoreLoginCredentials();
  };

  const handleBackPress = async () => {
    if (isRegisterMode) {
      await switchToLoginMode();
      return;
    }
    router.back();
  };

  // Load saved credentials on mount
  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await SecureStore.getItemAsync("rememberedEmail");
        const savedPassword =
          await SecureStore.getItemAsync("rememberedPassword");
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

  // Derive email from studentId + domain in register mode
  useEffect(() => {
    if (isRegisterMode) {
      setEmail(`${studentId.toLowerCase()}${emailDomain}`);
    }
  }, [studentId, emailDomain, isRegisterMode]);

  const handleSubmit = async () => {
    if (!email || !password) return;
    if (isRegisterMode && (!name || !studentId)) {
      Alert.alert(
        "Missing Fields",
        "Please provide your full name and ID number.",
      );
      return;
    }
    if (isRegisterMode && !isStrongPassword) {
      Alert.alert("Weak Password", "Please meet all password requirements.");
      return;
    }
    if (isRegisterMode && password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Please re-enter the same password.");
      return;
    }
    if (isRegisterMode && !acceptedTerms) {
      Alert.alert(
        "Terms Required",
        "Please agree to the Terms of Service and Privacy Policy.",
      );
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
          <View className="flex-1 px-8 pt-6 pb-6">
            {/* Back Button */}
            <Pressable
              onPress={handleBackPress}
              className="mb-6 w-10 h-10 items-center justify-center rounded-full bg-gray-100"
            >
              <Ionicons name="arrow-back" size={24} color="#081C4A" />
            </Pressable>

            {/* Header */}
            {isRegisterMode ? (
              <View className="mb-7 flex-row items-start justify-between">
                <View className="flex-1 pr-5">
                  <Text className="text-3xl font-poppins-bold text-primary mb-2">
                    Create Account
                  </Text>
                  <Text className="text-base font-inter text-gray-500 leading-6">
                    Fill in your details to create{"\n"}your UTeM Ride account.
                  </Text>
                </View>
                <Image
                  source={logo}
                  style={{ width: 82, height: 82 }}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View className="mb-8">
                <Text className="text-3xl font-poppins-bold text-primary mb-1">
                  Welcome Back!
                </Text>
                <Text className="text-base font-inter text-gray-500 leading-6">
                  Log in with your UTeM email{"\n"}to continue.
                </Text>
              </View>
            )}

            {/* Fields */}
            {isRegisterMode && (
              <>
                <TextInputField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  icon="person-outline"
                />
                <TextInputField
                  label="ID Number"
                  placeholder="Enter your ID number"
                  value={studentId}
                  onChangeText={setStudentId}
                  autoCapitalize="characters"
                  icon="card-outline"
                />

                {/* Domain Selector */}
                <View className="mb-4">
                  <Text className="text-sm font-inter-medium text-gray-700 mb-2">
                    Email Type
                  </Text>
                  <View className="flex-row rounded-button overflow-hidden border-2 border-primary-100 bg-background-soft p-1">
                    <Pressable
                      onPress={() => setEmailDomain("@student.utem.edu.my")}
                      className={`flex-1 py-3 items-center rounded-xl ${
                        emailDomain === "@student.utem.edu.my"
                          ? "bg-primary-600"
                          : "bg-transparent"
                      }`}
                    >
                      <Text
                        className={`text-sm font-poppins-semibold ${
                          emailDomain === "@student.utem.edu.my"
                            ? "text-white"
                            : "text-primary"
                        }`}
                      >
                        Student
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setEmailDomain("@utem.edu.my")}
                      className={`flex-1 py-3 items-center rounded-xl ${
                        emailDomain === "@utem.edu.my"
                          ? "bg-primary-600"
                          : "bg-transparent"
                      }`}
                    >
                      <Text
                        className={`text-sm font-poppins-semibold ${
                          emailDomain === "@utem.edu.my"
                            ? "text-white"
                            : "text-primary"
                        }`}
                      >
                        Staff
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}

            <TextInputField
              label={isRegisterMode ? "Email" : "UTeM Email"}
              placeholder={
                isRegisterMode
                  ? `idnumber${emailDomain}`
                  : "b032410000@student.utem.edu.my"
              }
              value={email}
              onChangeText={isRegisterMode ? undefined : setEmail}
              editable={!isRegisterMode}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              icon="mail-outline"
              style={isRegisterMode ? { opacity: 0.6 } : undefined}
              error={
                !isRegisterMode && email.length > 0 && !isValidEmail
                  ? "Please use your UTeM email address"
                  : undefined
              }
            />
            {isRegisterMode && (
              <Text className="-mt-3 mb-4 text-xs font-inter-medium text-secondary">
                Please use your official UTeM email ({emailDomain})
              </Text>
            )}

            <View className="relative mb-4">
              <TextInputField
                label="Password"
                placeholder={
                  isRegisterMode ? "Create a password" : "Enter your password"
                }
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                icon="lock-closed-outline"
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 16, top: 48 }}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#9CA3AF"
                />
              </Pressable>
            </View>

            {isRegisterMode && (
              <>
                <View className="relative mb-3">
                  <TextInputField
                    label="Re-enter Password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    icon="lock-closed-outline"
                    error={
                      confirmPassword.length > 0 && password !== confirmPassword
                        ? "Passwords do not match"
                        : undefined
                    }
                  />
                  <Pressable
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: "absolute", right: 16, top: 48 }}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={22}
                      color="#9CA3AF"
                    />
                  </Pressable>
                </View>

                <View className="mb-5 rounded-button border border-gray-200 bg-background-soft px-4 py-3">
                  <PasswordRule
                    valid={hasMinimumLength}
                    label="At least 8 characters"
                  />
                  <PasswordRule
                    valid={hasLettersAndNumbers}
                    label="Contains letters and numbers"
                  />
                  <PasswordRule
                    valid={hasSpecialCharacter}
                    label="Contains at least one special character"
                  />
                </View>
              </>
            )}

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
                <Text className="text-sm font-inter text-gray-500 ml-2">
                  Remember me
                </Text>
              </Pressable>
            )}

            {isRegisterMode && (
              <View className="flex-row items-start mb-5">
                <Pressable onPress={() => setAcceptedTerms(!acceptedTerms)}>
                  <Ionicons
                    name={acceptedTerms ? "checkbox" : "square-outline"}
                    size={22}
                    color={acceptedTerms ? "#245CDE" : "#CBD5E1"}
                    style={{ marginTop: 1 }}
                  />
                </Pressable>
                <View className="flex-1 flex-row flex-wrap ml-2">
                  <Pressable onPress={() => setAcceptedTerms(!acceptedTerms)}>
                    <Text className="text-sm font-inter text-gray-500 leading-5">
                      I agree to the{" "}
                    </Text>
                  </Pressable>
                  <Link href="/terms" asChild>
                    <Pressable>
                      <Text className="text-sm font-inter-semibold text-secondary leading-5">
                        Terms of Service
                      </Text>
                    </Pressable>
                  </Link>
                  <Text className="text-sm font-inter text-gray-500 leading-5">
                    {" "}
                    and{" "}
                  </Text>
                  <Link href="/privacy" asChild>
                    <Pressable>
                      <Text className="text-sm font-inter-semibold text-secondary leading-5">
                        Privacy Policy
                      </Text>
                    </Pressable>
                  </Link>
                </View>
              </View>
            )}

            {/* Continue Button */}
            <PrimaryButton
              title={isRegisterMode ? "Create Account" : "Login"}
              onPress={handleSubmit}
              loading={loading}
            />

            {/* Toggle Mode */}
            <View className="flex-row justify-center mt-6">
              <Text className="font-inter text-gray-600">
                {isRegisterMode
                  ? "Already have an account? "
                  : "Don't have an account? "}
              </Text>
              <Pressable
                onPress={async () => {
                  const goingToRegister = !isRegisterMode;
                  setIsRegisterMode(goingToRegister);
                  setShowPassword(false);
                  setShowConfirmPassword(false);

                  if (goingToRegister) {
                    resetRegisterFields();
                  } else {
                    await switchToLoginMode();
                  }
                }}
              >
                <Text className="font-poppins-bold text-secondary">
                  {isRegisterMode ? "Log In" : "Register"}
                </Text>
              </Pressable>
            </View>

            {!isRegisterMode && (
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
            )}
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

function PasswordRule({ valid, label }: { valid: boolean; label: string }) {
  return (
    <View className="flex-row items-center py-1">
      <Ionicons
        name={valid ? "checkmark-circle" : "ellipse-outline"}
        size={16}
        color={valid ? "#22C55E" : "#CBD5E1"}
        style={{ marginRight: 8 }}
      />
      <Text
        className={`text-xs font-inter ${
          valid ? "text-gray-600" : "text-gray-400"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}
