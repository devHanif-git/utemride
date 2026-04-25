import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

/**
 * Privacy Policy screen.
 * Displays mock Privacy Policy content with back navigation.
 */
export default function PrivacyScreen() {
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
          Privacy Policy
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
          1. Information We Collect
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-6">
          UTeM Ride collects the following information to provide our services:
          your UTeM email address and student/staff ID for identity verification;
          your name and profile photo for user identification; location data
          during active rides for navigation and safety; ride history and
          preferences for service improvement; device information for app
          functionality and security.
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          2. How We Use Your Information
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-6">
          We use your information to: facilitate ride-sharing connections between
          verified UTeM community members; process ride requests and payments;
          provide customer support and respond to inquiries; improve our
          services, features, and user experience; ensure safety and security of
          all users; comply with university policies and legal requirements.
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          3. Data Sharing
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-6">
          We share limited information with ride partners (driver or rider)
          during active rides, including your first name, profile photo, and
          general pickup/drop-off locations. We do not sell your personal
          information to third parties. We may share anonymized, aggregated data
          with UTeM administration for campus transportation planning.
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          4. Data Security
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-6">
          We implement industry-standard security measures to protect your data,
          including encryption in transit and at rest, secure authentication
          through UTeM's identity provider, and regular security audits. However,
          no method of electronic transmission or storage is 100% secure, and we
          cannot guarantee absolute security.
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          5. Your Rights
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-6">
          You have the right to: access and review your personal data; request
          correction of inaccurate information; request deletion of your account
          and associated data; opt out of non-essential communications; withdraw
          consent for data processing at any time.
        </Text>

        <Text className="text-base font-poppins-semibold text-primary mb-3">
          6. Contact Us
        </Text>
        <Text className="text-sm font-poppins text-gray-600 leading-6 mb-8">
          If you have questions about this Privacy Policy or our data practices,
          please contact us at: support@utemride.my or visit the UTeM Student
          Affairs office. For data protection inquiries, contact the UTeM ICT
          department.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
