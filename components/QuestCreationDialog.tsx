import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useStore } from '../store/useStore';
import uuid from 'react-native-uuid';

import { BlurView } from 'expo-blur';
import { QuestType, StatType } from 'types/questTypes';

// Predefined stats for selection
const statsOptions = ['Strength', 'Agility', 'Perception', 'Intelligence', 'Vitality'];

const QuestCreationDialog = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'positive' | 'negative' | 'both'>('positive');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [stat, setStat] = useState(statsOptions[0]);

  const { addQuest } = useStore();

  const statMappings: { [key: string]: StatType } = { 
    Strength: 'STR',
    Agility: 'AGI',
    Perception: 'PER',
    Intelligence: 'INT',
    Vitality: 'VIT',
  };
  
  
  const handleCreateQuest = () => {
    if (!name.trim()) return;
  
    const newQuest: QuestType = {
      id: uuid.v4() as string,
      name,
      stat: statMappings[stat],  
      difficulty,
      type,  // ✅ Directly use the selected type ('positive', 'negative', 'both')
      completed: 0,
      failed: 0,
    };
  
    addQuest(newQuest);
    onClose();
  };
  

  return (
    <Modal transparent={true} animationType="fade">
      <BlurView intensity={90} className="absolute inset-0">
        <View className="flex-1 justify-center items-center">
          <View className="w-4/5 bg-white p-4 rounded-lg">

            <Text className="text-xl font-bold mb-2">Create New Quest</Text>
            
            {/* Quest Name Input */}
            <TextInput
              className="border border-gray-400 p-2 mb-2 rounded"
              placeholder="Quest Name"
              value={name}
              onChangeText={setName}
            />

            {/* Type Selection */}
            <Text className="text-lg font-bold mb-1">Type:</Text>
            <View className="flex-row space-x-2 mb-2">
              {['positive', 'negative', 'both'].map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => setType(value as 'positive' | 'negative' | 'both')}
                  className={`px-4 py-2 rounded ${type === value ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                  <Text className="text-white">{value}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* XP Difficulty Selection */}
            <Text className="text-lg font-bold mb-1">XP Difficulty:</Text>
            <View className="flex-row space-x-2 mb-2">
              {['easy', 'medium', 'hard'].map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => setDifficulty(value as 'easy' | 'medium' | 'hard')}
                  className={`px-4 py-2 rounded ${difficulty === value ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <Text className="text-white">{value}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Stat Selection */}
            <Text className="text-lg font-bold mb-1">Stat Affected:</Text>
            <View className="border border-gray-400 p-2 rounded mb-2">
              {statsOptions.map((option) => (
                <TouchableOpacity key={option} onPress={() => setStat(option)}>
                  <Text className={`p-1 ${stat === option ? 'text-blue-500 font-bold' : 'text-black'}`}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Create Button */}
            <TouchableOpacity
              onPress={handleCreateQuest}
              className="bg-blue-500 p-2 rounded mb-2"
            >
              <Text className="text-white text-center">Create Quest</Text>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity onPress={onClose} className="p-2">
              <Text className="text-red-500 text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default QuestCreationDialog;
