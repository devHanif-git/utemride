import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from "react-native";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function PrimaryButton({ title, loading, disabled, style, className, ...props }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full min-h-[56px] py-4 rounded-button items-center justify-center flex-row bg-primary ${
        disabled || loading ? "opacity-50" : "opacity-100"
      } ${className || ""}`}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <Text className="text-white text-base font-poppins-semibold">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
