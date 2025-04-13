import  { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useStore } from '../store/useStore';
import uuid from 'react-native-uuid';

import { BlurView } from 'expo-blur';
import { QuestType } from 'types/questTypes';
import { FontAwesome5 } from '@expo/vector-icons';
import NeonText from './utils/NeonText';
import SoundBox from './utils/soundBox';

const QuestCreationDialog = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'positive' | 'negative' | 'both'>('positive'); // Updated to match QuestType
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [stat, setStat] = useState<'STR' | 'AGI' | 'PER' | 'INT' | 'VIT'>('STR');

  const { addQuest } = useStore();

  const statIcons = {
    STR: 'dumbbell',
    AGI: 'running',
    PER: 'eye',
    INT: 'brain',
    VIT: 'heartbeat',
  };
  const handleTypeToggle = (selectedType: 'positive' | 'negative') => {
    if (type === 'both') {
      // If currently 'both', toggle off the selected type
      setType(selectedType === 'positive' ? 'negative' : 'positive');
    } else if (type === selectedType) {
      // If the currently selected type is clicked again, toggle to the other type
      setType('positive'); // Default to 'positive' if deselected
    } else {
      // If the other type is selected, set to 'both'
      setType('both');
    }
  };

  const handleCreateQuest = async () => {
    
    if (!name.trim()) return;

    const newQuest: QuestType = {
      id: uuid.v4() as string,
      name,
      stat,
      difficulty,
      type, // Use the updated type logic
      completed: 0,
      failed: 0,
    };
    await SoundBox.playClick();
    addQuest(newQuest);
    onClose();
  };
  const handleCancel = async () => {
    await SoundBox.playClick(); // Play click sound
    onClose();
  };

  return (
    <Modal transparent={true} animationType="fade">
      <BlurView intensity={0} className="  absolute inset-0">
        <View className="flex-1 items-center justify-center">
          <View
            className="w-4/5 rounded-lg border
           border-white bg-gray-950 p-4">
            <NeonText
              fontSize={17}
              fontWeight="900"
              style={{ marginBottom: 16, textAlign: 'center', color: 'white' }}>
              Embark on an Epic Journey!
            </NeonText>
            {/* Quest Name Input */}
            <TextInput
              className="mb-4 rounded border border-gray-400 bg-black p-2 font-extrabold text-white"
              placeholder="Name Your Legendary Quest"
              placeholderTextColor="gray"
              value={name}
              onChangeText={setName}
            />

            {/* Type Selection */}

            <View className="mb-4 flex-row justify-between ">
              <TouchableOpacity
                onPress={() => handleTypeToggle('positive')}
                className={`mx-9 flex-1 items-center rounded-full py-4 ${
                  type === 'positive' || type === 'both' ? 'bg-gray-300' : 'bg-transparent'
                }`}>
                <FontAwesome5
                  name="plus"
                  size={20}
                  color={type === 'positive' || type === 'both' ? 'black' : 'white'}
                  style={{
                    textShadowColor: 'white',
                    textShadowRadius: 5,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTypeToggle('negative')}
                className={`mx-9 flex-1 items-center rounded-full py-4 ${
                  type === 'negative' || type === 'both' ? 'bg-gray-300' : 'bg-transparent'
                }`}>
                <FontAwesome5
                  name="minus"
                  size={20}
                  color={type === 'negative' || type === 'both' ? 'black' : 'white'}
                  style={{
                    textShadowColor: 'white',
                    textShadowRadius: 5,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* XP Difficulty Selection */}

            <View className="mb-4 flex-row justify-between">
              <TouchableOpacity
                onPress={() => setDifficulty('easy')}
                className={`mx-4 flex-1 items-center rounded py-2 ${
                  difficulty === 'easy' ? 'bg-gray-300' : 'bg-transparent'
                }`}>
                <FontAwesome5
                  name="smile"
                  size={20}
                  color={difficulty === 'easy' ? 'black' : 'white'}
                  style={{
                    textShadowColor: 'white',
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 5,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDifficulty('medium')}
                className={`mx-4 flex-1 items-center rounded py-2 ${
                  difficulty === 'medium' ? 'bg-gray-300' : 'bg-transparent'
                }`}>
                <FontAwesome5
                  name="meh"
                  size={20}
                  color={difficulty === 'medium' ? 'black' : 'white'}
                  style={{
                    textShadowColor: 'white',
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 5,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDifficulty('hard')}
                className={`mx-4 flex-1 items-center rounded py-2 ${
                  difficulty === 'hard' ? 'bg-gray-300' : 'bg-transparent'
                }`}>
                <FontAwesome5
                  name="angry"
                  size={20}
                  color={difficulty === 'hard' ? 'black' : 'white'}
                  style={{
                    textShadowColor: 'white',
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 5,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* Stat Selection */}

            <View className="mb-4 flex-row justify-between">
              {(['STR', 'AGI', 'PER', 'INT', 'VIT'] as const).map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setStat(option)}
                  className={`mx-1 flex-1 items-center rounded py-2 ${
                    stat === option ? 'bg-gray-300' : 'bg-transparent'
                  }`}>
                  <FontAwesome5
                    name={statIcons[option]}
                    size={20}
                    color={stat === option ? 'black' : 'white'}
                    style={{
                      textShadowColor: 'white',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: 5,
                    }}
                  />
                  <NeonText
                    fontSize={14} // Corresponds to "text-sm"
                    fontWeight="900" // Corresponds to "font-extrabold"
                    style={{
                      color: stat === option ? 'black' : 'white',
                      textShadowColor: stat === option ? 'gray' : 'white',
                      textAlign: 'center',
                    }} // Dynamic color logic
                  >
                    {option}
                  </NeonText>
                </TouchableOpacity>
              ))}
            </View>

            {/* Create Button */}
            <TouchableOpacity
              onPress={handleCreateQuest}
              className="mb-2 ml-20 mr-20 rounded bg-gray-300 p-2">
              <NeonText
                fontSize={14} // Adjust font size as needed
                fontWeight="900" // Corresponds to "font-extrabold"
                style={{ color: 'black', textAlign: 'center', textShadowColor: 'gray' }} // Keep the text alignment and color
              >
                Grind
              </NeonText>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity onPress={handleCancel}>
              <NeonText
                fontSize={14} // Adjust font size as needed
                fontWeight="900" // Corresponds to "font-extrabold"
                style={{
                  marginLeft: 68, // Corresponds to "ml-20"
                  marginRight: 68, // Corresponds to "mr-20"
                  borderWidth: 1, // Corresponds to "border"
                  borderColor: '#4B5563', // Corresponds to "border-gray-600"
                  padding: 8, // Corresponds to "p-2"
                  textAlign: 'center', // Corresponds to "text-center"
                  color: '#9CA3AF',
                  textShadowColor:'gray', 
                  borderRadius: 5, // Corresponds to "rounded"
                }}>
                Cancel
              </NeonText>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default QuestCreationDialog;
