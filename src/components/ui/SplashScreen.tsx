import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Animated, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const bgImage = require("../../assets/images/Branding page.png");
const logo = require("../../assets/images/logo-w.png");

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Generates a simple dot grid for the top-right corner
const DotGrid = () => {
  const rows = 5;
  const cols = 4;
  const dots = [];

  for (let r = 0; r < rows; r++) {
    const rowDots = [];
    for (let c = 0; c < cols; c++) {
      rowDots.push(
        <View 
          key={`${r}-${c}`} 
          style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.2)', margin: 4 }} 
        />
      );
    }
    dots.push(<View key={`row-${r}`} style={{ flexDirection: 'row' }}>{rowDots}</View>);
  }

  return (
    <View style={{ position: 'absolute', top: 60, right: 24 }}>
      {dots}
    </View>
  );
};

export function SplashScreenComponent() {
  // Animation value for the segmented loading bar
  const [activeSegment, setActiveSegment] = useState(0);

  useEffect(() => {
    // Loop animation for the loading segments
    const interval = setInterval(() => {
      setActiveSegment((prev) => (prev + 1) % 5); // 0, 1, 2, 3, 4 (all off, 1 on, 2 on, etc or cycling)
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1" style={{ backgroundColor: '#081C4A' }}>
      {/* Background image — matching index.tsx */}
      <Image 
        source={bgImage} 
        style={{ 
          position: 'absolute',
          width: '220%',
          height: '90%',
          left: '-50%',
        }} 
        resizeMode="contain"
        blurRadius={3}
      />
      {/* Base dark overlay */}
      <View 
        style={{ 
          position: 'absolute', 
          top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: '#081C4A', 
          opacity: 0.6 
        }} 
      />
      {/* Gradients */}
      <LinearGradient
        colors={['#081C4A', '#081C4A', '#081C4Acc', 'transparent']}
        locations={[0, 0.3, 0.7, 1]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '35%' }}
      />
      <LinearGradient
        colors={['transparent', '#081C4Acc', '#081C4A', '#081C4A']}
        locations={[0, 0.3, 0.7, 1]}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%' }}
      />

      <SafeAreaView className="flex-1 relative justify-between" edges={['top', 'left', 'right', 'bottom']}>
        
        {/* Top Right Dots */}
        <DotGrid />

        {/* Center Logo & Title */}
        <View className="flex-1 items-center justify-center">
          <Image source={logo} style={{ width: 115, height: 115, marginBottom: 16 }} resizeMode="contain" />
          <View style={{ flexDirection: 'row', alignItems: 'baseline', height: 42 }}>
            <Text style={{ fontSize: 38, fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF', lineHeight: 42 }}>UTeM </Text>
            <Text style={{ fontSize: 38, fontFamily: 'Poppins_600SemiBold', color: '#245CDE', lineHeight: 42 }}>RIDE</Text>
          </View>
          <Text style={{ fontSize: 16, fontFamily: 'Inter_400Regular', color: '#D1D5DB', marginTop: -2 }}>
            Your Campus. Your Ride.
          </Text>
        </View>

        {/* Bottom Section */}
        <View className="items-center pb-12">
          <Text style={{ fontSize: 18, fontFamily: 'Poppins_600SemiBold', color: '#FFFFFF', marginBottom: 4 }}>
            Safe. Verified. For UTeM.
          </Text>
          <Text style={{ fontSize: 13, fontFamily: 'Inter_400Regular', color: '#9CA3AF', marginBottom: 32 }}>
            Only verified UTeM students and drivers.
          </Text>

          {/* Segmented Loading Bar */}
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {[0, 1, 2, 3].map((index) => {
              // We'll light up segments up to the activeSegment index
              const isActive = index <= activeSegment && activeSegment < 4;
              // If activeSegment is 4, all are dim (brief pause)
              return (
                <View 
                  key={index}
                  style={{
                    height: 4,
                    width: 40,
                    borderRadius: 2,
                    backgroundColor: isActive ? '#245CDE' : 'rgba(255,255,255,0.2)'
                  }}
                />
              );
            })}
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}
