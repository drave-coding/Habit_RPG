import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useStore } from '../store/useStore';
import Quest from './Quest';
import { BlurView } from 'expo-blur';
import NeonText from './utils/NeonText';

const QuestList = memo(() => {
  const { quests } = useStore();

  return (
    <View>
      <BlurView  tint='light' intensity={10}  className=" p-1 -mt-2 border-[2px] mb-2 w-[100px] border-gray-600 self-center">
      <NeonText fontSize={24} fontWeight={900}>QUESTS</NeonText>
      </BlurView>
      {quests.length === 0 ? (
        <Text className="text-gray-400">No quests added yet.</Text>
      ) : (
        quests.map((quest) => <Quest key={quest.id} {...quest} />)
      )}
    </View>
  );
});

export default QuestList;
