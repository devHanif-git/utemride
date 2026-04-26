import React from "react";
import { View, Text, ViewProps } from "react-native";

interface BadgeProps extends ViewProps {
  status: "success" | "pending" | "error" | "default";
  label: string;
}

export function Badge({ status, label, style, className, ...props }: BadgeProps) {
  const getColors = () => {
    switch (status) {
      case "success":
        return "bg-success/10 text-success";
      case "error":
        return "bg-error/10 text-error";
      case "pending":
        return "bg-warning/10 text-warning";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const colors = getColors();
  const [bgClass, textClass] = colors.split(" ");

  return (
    <View className={`px-3 py-1 rounded-full ${bgClass} ${className || ""}`} style={style} {...props}>
      <Text className={`text-xs font-inter-semibold ${textClass}`}>{label}</Text>
    </View>
  );
}
