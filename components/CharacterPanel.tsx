import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useStore } from '../store/useStore';
import NeonText from './utils/NeonText';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTitleForLevel } from './utils/titles';

const CharacterPanel = () => {
  const { level, xp, hp, hpCap, xpCap } = useStore();
  const title = useMemo(() => getTitleForLevel(level), [level]);

  // Animated value for border color
  const borderColorAnim = useRef(new Animated.Value(0)).current;

  // Animate border color on mount
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderColorAnim, {
          toValue: 1, // Transition to white
          duration: 2000, // 2 seconds
          useNativeDriver: false,
        }),
        Animated.timing(borderColorAnim, {
          toValue: 0, // Transition back to transparent
          duration: 2000, // 2 seconds
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [borderColorAnim]);

  // Interpolate border color from transparent to white
  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 10],
    outputRange: ['rgba(255, 255, 255, 0)', 'gray'], // Transparent to white
  });

  const clearStorage = async () => {
    await AsyncStorage.clear();
    console.log('Storage cleared!');
  };

  return (
    <View className="p-4 bg-transparent rounded-lg">
      {/* Glass Box for Status */}
      <Animated.View
        style={[
          styles.statusBox,
          { borderColor: borderColor }, // Animated border color
        ]}
      >
        <NeonText fontSize={30} fontWeight={900}>
          STATUS
        </NeonText>
      </Animated.View>

      {/* Level, Name, and Title */}
      <View className="flex-row self-center mb-4">
        {/* Level */}
        <View className="items-center pl-4 pr-8">
          <NeonText fontSize={60} fontWeight={900}>{level}</NeonText>
          <NeonText fontSize={15} fontWeight={500}>Level</NeonText>
        </View>

        {/* Name and Title */}
        <View className="items-center justify-center start-0">
          <NeonText fontSize={12} fontWeight={400}>
            NAME: <NeonText fontSize={18} fontWeight={800}>Drave</NeonText>
          </NeonText>
          <NeonText fontSize={12} fontWeight={400}>
            TITLE: <NeonText fontSize={18} fontWeight={800}>{title}</NeonText>
          </NeonText>
        </View>
      </View>

      {/* Progress Bars */}
      <View className="flex-row justify-between items-center space-x-4 space-y-2 p-4 -ml-8 -mr-8 border-[2px] border-gray-600">
        {/* HP Progress Bar */}
        <View style={styles.progressRow}>
          <Text style={styles.labelLeft}>HP</Text>
          <View style={styles.progressWrapper}>
            <Progress.Bar
              progress={hp / hpCap} // Convert HP to a value between 0 and 1
              width={130}
              height={5}
              color="#00FFFF" // Cyan for HP
              unfilledColor="transparent"
              borderWidth={2}
              borderRadius={5}
            />
            <Text style={styles.labelRight}>{hp}/{hpCap}</Text>
          </View>
        </View>

        {/* XP Progress Bar */}
        <View style={styles.progressRow}>
          <Text style={styles.labelLeft}>XP</Text>
          <View style={styles.progressWrapper}>
            <Progress.Bar
              progress={xp / xpCap} // Convert XP to a value between 0 and 1
              width={130}
              height={5}
              color="#00FFFF" // Cyan for XP
              unfilledColor="transparent"
              borderWidth={2}
              borderRadius={5}
            />
            <Text style={styles.labelRight}>{xp}/{xpCap}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBox: {
    padding: 8,
    marginTop: -20,
    
    width: 120,
    borderWidth: 2,
    alignSelf: 'center',
   
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelLeft: {
    color: '#BDBDBD',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  progressWrapper: {
    position: 'relative',
  },
  labelRight: {
    position: 'absolute',
    bottom: -15,
    right: 0,
    color: '#BDBDBD',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CharacterPanel;