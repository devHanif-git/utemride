import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from "react-native";

interface SecondaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export function SecondaryButton({ title, loading, disabled, style, className, ...props }: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full min-h-[56px] py-4 rounded-button items-center justify-center flex-row bg-transparent border-[1px] border-secondary ${
        disabled || loading ? "opacity-50" : "opacity-100"
      } ${className || ""}`}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#245CDE" size="small" />
      ) : (
        <Text className="text-secondary text-base font-poppins-semibold">{title}</Text>
      )}
    </TouchableOpacity>
  );
}

