import React, { useState } from "react";
import { View, TextInput, TextInputProps, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TextInputFieldProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  label?: string;
}

export function TextInputField({ icon, error, label, style, className, onFocus, onBlur, ...props }: TextInputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`w-full mb-4 ${className || ""}`} style={style}>
      {label && <Text className="text-sm font-inter-medium text-gray-700 mb-2">{label}</Text>}
      <View
        className={`flex-row items-center w-full min-h-[56px] px-4 rounded-button bg-background-soft border-2 ${
          error ? "border-error" : isFocused ? "border-primary" : "border-transparent"
        }`}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={error ? "#EF4444" : isFocused ? "#081C4A" : "#9CA3AF"}
            style={{ marginRight: 12 }}
          />
        )}
        <TextInput
          className="flex-1 text-base font-inter text-gray-900 min-h-[56px]"
          placeholderTextColor="#9CA3AF"
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
      </View>
      {error && <Text className="text-error text-xs font-inter mt-1">{error}</Text>}
    </View>
  );
}
