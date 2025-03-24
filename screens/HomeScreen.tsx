import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useStore } from '../store/useStore';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { level, xp, hp, stats, incrementXP, decrementHP } = useStore();

  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-100">
      <ScrollView>
        <Text className="text-yellow-800 text-2xl font-bold mb-4">Level: {level}</Text>
        <Text className="text-xl mb-2">XP: {xp}/100</Text>
        <Text className="text-xl mb-4">HP: {hp}</Text>

        <Text className="text-lg font-bold mb-2">Stats:</Text>
        {stats.map(stat => (
          <Text key={stat.name} className="text-lg mb-1">
            {stat.name}: {stat.value}
          </Text>
        ))}

        <View className="mt-4">
          <Button title="Gain XP (Easy Task)" onPress={() => incrementXP(1)} />
          <Button title="Lose HP" onPress={() => decrementHP(5)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
