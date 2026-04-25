import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "filled" | "outline";
}

/**
 * Primary action button with UTeM Ride branding.
 * Supports filled (default) and outline variants.
 */
export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "filled",
}: PrimaryButtonProps) {
  const isFilled = variant === "filled";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={{
        width: "100%",
        minHeight: 56,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: isFilled ? "#2F6BFF" : "transparent",
        borderWidth: isFilled ? 0 : 2,
        borderColor: isFilled ? undefined : "#2F6BFF",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator
          color={isFilled ? "#FFFFFF" : "#2F6BFF"}
          size="small"
        />
      ) : (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins_600SemiBold",
            color: isFilled ? "#FFFFFF" : "#2F6BFF",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
