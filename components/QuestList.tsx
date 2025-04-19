import  { memo, useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useStore } from '../store/useStore';
import Quest from './Quest';
import NeonText from './utils/NeonText';
import { QuestType } from 'types/questTypes';

const QuestList = memo(() => {
  const { quests } = useStore();


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
  

  return (
    <View>
      <Animated.View
        style={[
          styles.animatedBox,
          { borderColor: borderColor }, // Animated border color
        ]} 
      >
        <NeonText fontSize={24} fontWeight={900}>
          QUESTS
        </NeonText>
      </Animated.View>
      {quests.length === 0 ? (
        <NeonText style={{ color: '#bdbdbd' }}>Nothing to hunt... for now.</NeonText>
      ) : (
        quests.map((quest) => <Quest key={quest.id} {...quest} />)
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  animatedBox: {
    alignSelf: 'center',
    padding: 8,
    marginBottom: 8,
    marginTop: -8,
    width: 120,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default QuestList;