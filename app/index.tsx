import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, ImageBackground, Animated, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { PrimaryButton } from "../src/components/ui/PrimaryButton";
import { SecondaryButton } from "../src/components/ui/SecondaryButton";

const bgImage = require("../src/assets/images/Branding page.png");
const logo = require("../src/assets/images/logo-w.png");

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function LandingScreen() {
  const router = useRouter();
  
  // Animation value for the bottom sheet sliding up to full screen
  const sheetAnim = useRef(new Animated.Value(0)).current;
  const handleAuthAction = (mode: "login" | "register") => {
    // Animate the sheet upwards
    Animated.timing(sheetAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true, 
    }).start(() => {
      // Navigate once animation completes
      router.push({ pathname: "/login", params: { mode } });
      
      // Reset animation value shortly after navigation
      setTimeout(() => {
        sheetAnim.setValue(0);
      }, 500);
    });
  };

  const sheetTranslateY = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_HEIGHT * 0.55], 
  });



  return (
    <View className="flex-1" style={{ backgroundColor: '#081C4A' }}>
      {/* Background image — scaled up to fill more vertical space */}
      <Image 
        source={bgImage} 
        style={{ 
          position: 'absolute',
          width: '220%',
          height: '90%',
          left: '-50%',
        }} 
        resizeMode="contain"
        blurRadius={1}
      />
      {/* Base dark overlay for overall tinting */}
      <View 
        style={{ 
          position: 'absolute', 
          top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: '#081C4A', 
          opacity: 0.6 
        }} 
      />
      {/* Top gradient fade — covers top edge of image */}
      <LinearGradient
        colors={['#081C4A', '#081C4A', '#081C4Acc', 'transparent']}
        locations={[0, 0.3, 0.7, 1]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '35%' }}
      />
      {/* Bottom gradient fade — covers bottom edge of image */}
      <LinearGradient
        colors={['transparent', '#081C4Acc', '#081C4A', '#081C4A']}
        locations={[0, 0.3, 0.7, 1]}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%' }}
      />

      <SafeAreaView className="flex-1 relative justify-between" edges={['top', 'left', 'right']}>
        {/* Header — Logo + Text centered */}
        <View className="flex-1 items-center justify-center">
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={logo} style={{ width: 115, height: 115 }} resizeMode="contain" />
            <View style={{ marginLeft: 16, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', height: 42 }}>
                <Text style={{ fontSize: 38, fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF', lineHeight: 42 }}>UTeM </Text>
                <Text style={{ fontSize: 38, fontFamily: 'Poppins_600SemiBold', color: '#245CDE', lineHeight: 42 }}>Ride</Text>
              </View>
              <Text style={{ fontSize: 16, fontFamily: 'Inter_400Regular', color: '#D1D5DB', marginTop: -2 }}>Your Campus. Your Ride.</Text>
            </View>
          </View>
        </View>

        {/* Feature Highlights */}
        <View className="px-8" style={{ paddingBottom: SCREEN_HEIGHT * 0.32 }}>
          <FeatureRow 
            icon="shield-checkmark-outline" 
            title="Safe & Verified" 
            subtitle="Only UTeM students & drivers" 
          />
          <FeatureRow 
            icon="flash-outline" 
            title="Fast & Reliable" 
            subtitle={"Get to your destination\nquickly and easily"} 
          />
          <FeatureRow 
            icon="business-outline" 
            title="Campus Focused" 
            subtitle={"Designed for UTeM\ncommunity"} 
          />
        </View>

        {/* Bottom Sheet */}
        <Animated.View 
          style={{ 
            position: 'absolute', 
            top: '72%', 
            width: '100%', 
            height: SCREEN_HEIGHT,
            backgroundColor: 'white', 
            borderTopLeftRadius: 32, 
            borderTopRightRadius: 32,
            paddingHorizontal: 28,
            paddingTop: 18,
            alignItems: 'center',
            transform: [{ translateY: sheetTranslateY }]
          }}
        >
          <Text style={{ fontSize: 22, fontFamily: 'Poppins_700Bold', color: '#081C4A', marginBottom: 4 }}>Let's Get Started</Text>
          <Text style={{ fontSize: 14, fontFamily: 'Inter_400Regular', color: '#6B7280', textAlign: 'center', marginBottom: 20, lineHeight: 20 }}>
            Create your account to continue{"\n"}with UTeM Ride.
          </Text>

          <View className="w-full space-y-4 gap-4">
            <PrimaryButton 
              title="Create Account" 
              onPress={() => handleAuthAction("register")}
              style={{ backgroundColor: '#245CDE' }}
            />
            <SecondaryButton 
              title="Log In" 
              onPress={() => handleAuthAction("login")} 
            />
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

function FeatureRow({ icon, title, subtitle }: { icon: any, title: string, subtitle: string }) {
  return (
    <View className="flex-row items-center mb-6">
      <View className="w-[52px] h-[52px] rounded-full bg-white/10 items-center justify-center mr-4 border border-white/20">
        <Ionicons name={icon} size={26} color="#FFFFFF" />
      </View>
      <View className="flex-1">
        <Text style={{ fontSize: 16, fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF', marginBottom: 2 }}>{title}</Text>
        <Text style={{ fontSize: 13, fontFamily: 'Inter_400Regular', color: '#D1D5DB', lineHeight: 18 }}>{subtitle}</Text>
      </View>
    </View>
  );
}

