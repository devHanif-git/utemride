import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

/**
 * Terms of Service screen.
 * Displays mock ToS content with back navigation.
 */
export default function TermsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4 border-b border-gray-100">
        <Pressable
          onPress={() => router.back()}
          className="mr-4 p-1 active:opacity-60"
        >
          <Ionicons name="arrow-back" size={24} color="#0A1F44" />
        </Pressable>
        <Text className="text-lg font-poppins-semibold text-primary">
          Terms of Service
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-6 py-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-4">
          Last updated: April 2026
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          1. Acceptance of Terms
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-6">
          By accessing and using UTeM Ride, you agree to be bound by these Terms
          of Service. UTeM Ride is a campus ride-sharing service exclusively
          available to registered students and staff of Universiti Teknikal
          Malaysia Melaka (UTeM). You must use a valid UTeM email address to
          create an account and access our services.
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          2. User Eligibility
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-6">
          You must be a currently enrolled student or active staff member of UTeM
          to use this service. You must possess a valid UTeM student or staff ID.
          Users must be at least 18 years of age. Drivers must possess a valid
          Malaysian driving license and vehicle registration.
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          3. Service Description
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-6">
          UTeM Ride provides a platform for connecting riders with drivers within
          the UTeM campus and surrounding areas. We facilitate ride-sharing
          between verified UTeM community members. The service operates within
          designated campus zones and approved off-campus areas near UTeM Melaka.
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          4. User Conduct
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-6">
          Users agree to treat all other users with respect and courtesy.
          Harassment, discrimination, or any form of inappropriate behavior will
          result in immediate account suspension. Users must not engage in
          activities that compromise the safety of other users. All rides must be
          for legitimate transportation purposes.
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          5. Payment & Fees
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-6">
          Ride fares are calculated based on distance and estimated time. Payment
          is processed through the app using approved payment methods. UTeM Ride
          reserves the right to adjust pricing to reflect operating costs.
          Cancellation fees may apply for rides cancelled after driver
          confirmation.
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          6. Limitation of Liability
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-8">
          UTeM Ride acts as an intermediary platform and does not assume
          liability for incidents that occur during rides. Users participate in
          ride-sharing at their own risk. The university and app developers are
          not responsible for personal injuries, property damage, or losses
          arising from the use of this service.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
