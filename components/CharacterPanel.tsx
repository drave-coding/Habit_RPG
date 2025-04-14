import { useEffect, useMemo, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useStore } from '../store/useStore';
import NeonText from './utils/NeonText';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTitleForLevel } from './utils/titles';
import { FontAwesome5 } from '@expo/vector-icons';

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
          useNativeDriver: true,
        }),
        Animated.timing(borderColorAnim, {
          toValue: 0, // Transition back to transparent
          duration: 2000, // 2 seconds
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [borderColorAnim]);

  // Interpolate border color from transparent to white
  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 3],
    outputRange: ['rgba(255, 255, 255, 0)', 'white'], // Transparent to white
  });

  const clearStorage = async () => {
    await AsyncStorage.clear();
    console.log('Storage cleared!');
  };


  return (
    <View className="rounded-lg bg-transparent p-4">
      {/* Glass Box for Status */}
      <Animated.View
        style={[
          styles.statusBox,
          { borderColor: borderColor }, // Animated border color
        ]}>
        <NeonText fontSize={30} fontWeight={900}>
          STATUS
        </NeonText>
      </Animated.View>

      {/* Level, Name, and Title */}
      <View className="mb-4 flex-row self-center">
        {/* Level */}
        <View className="items-center pl-4 pr-8">
          <NeonText fontSize={60} fontWeight={900}>
            {level}
          </NeonText>
          <NeonText fontSize={15} style={{ marginTop: -11 }} fontWeight={800}>
            Level
          </NeonText>
        </View>

        {/* Name and Title */}
        <View className="start-0 items-center justify-center">
          <NeonText fontSize={12} fontWeight={400}>
            NAME:{' '}
            <NeonText fontSize={18} fontWeight={800}>
              Drave
            </NeonText>
          </NeonText>
          <NeonText fontSize={12} fontWeight={400}>
            TITLE:{' '}
            <NeonText fontSize={18} fontWeight={800}>
              {title}
            </NeonText>
          </NeonText>
        </View>
      </View>

      {/* Progress Bars */}

      <View className="-ml-8 -mr-8 flex-row items-center justify-between space-x-2 space-y-2 rounded-lg border border-gray-400 p-4 pl-5 pr-5">
        {/* HP Progress Bar */}
        <View style={styles.progressRow}>
          <View style={{ alignItems: 'center', marginRight: 1 }}>
            <FontAwesome5
              name="plus"
              size={15}
              color="white"
              style={{
                textShadowColor: 'white',
                textShadowRadius: 5,
              }}
            />
            <NeonText fontSize={11} fontWeight={900}>
              HP
            </NeonText>
          </View>
          <View className="pl-1" style={styles.progressWrapper}>
            <View
              style={{
                padding: 2, // Add padding to create the gap
                backgroundColor: 'transparent', // Background color for the gap
                borderRadius: 7, // Match the border radius of the progress bar
                borderWidth: 1, // Border width for the outer border
                borderColor: 'white', // Border color
              }}>
              <Progress.Bar
                progress={hp / hpCap} // Convert HP to a value between 0 and 1
                width={120}
                height={4}
                color="white" // Fill color for HP
                unfilledColor="transparent" // Transparent for the gap
                borderWidth={0} // Remove the default border of the progress bar
                borderRadius={5}
              />
            </View>
            <NeonText style={styles.labelRight} fontWeight={400}>
              {hp}/{hpCap}
            </NeonText>
          </View>
        </View>

        {/* XP Progress Bar */}
        <View style={styles.progressRow}>
          <View style={{ alignItems: 'center', marginLeft: 2, top: 3 }}>
            <FontAwesome5
              name="bolt"
              size={15}
              color="white"
              style={{
                textShadowColor: 'white',
                textShadowRadius: 5,
              }}
            />
            <NeonText fontSize={11} fontWeight={900}>
              XP
            </NeonText>
          </View>
          <View className="pl-1" style={styles.progressWrapper}>
            <View
              style={{
                padding: 2, // Add padding to create the gap
                backgroundColor: 'transparent', // Background color for the gap
                borderRadius: 8, // Match the border radius of the progress bar
                borderWidth: 1, // Border width for the outer border
                borderColor: 'white', // Border color
              }}>
              <Progress.Bar
                progress={xp / xpCap} // Convert XP to a value between 0 and 1
                width={120}
                height={4}
                color="white" // Fill color for XP
                unfilledColor="transparent" // Transparent for the gap
                borderWidth={0} // Remove the default border of the progress bar
                borderRadius={5}
              />
            </View>
            <NeonText style={styles.labelRight} fontWeight={400}>
              {xp}/{xpCap}
            </NeonText>
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
    borderWidth: 2,
    borderRadius: 8,
    width: 120,

    alignSelf: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    textShadowRadius: 8,
    position: 'absolute',
    bottom: -15,
    right: 0,
    color: '#f2f2f2',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default CharacterPanel;
