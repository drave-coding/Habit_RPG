import React, { memo, useState } from 'react';
import { View,  TouchableOpacity, Modal } from 'react-native';
import { useStore } from '../store/useStore';
import { QuestType } from 'types/questTypes';
import NeonText from './utils/NeonText';
import SoundBox from './utils/soundBox';
import { FontAwesome5 } from '@expo/vector-icons'

const Quest = memo(({ id, name,  type, completed, failed }: QuestType) => {
  const { incrementQuest, decrementQuest, deleteQuest } = useStore();
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  
 // Function to open the delete dialog and play the menu sound
 const handleOpenDeleteDialog = async () => {
  await SoundBox.playMenu(); // Play menu sound
  setIsDeleteDialogVisible(true); // Open the delete dialog
};

  const handleDeleteQuest = async() => {
    deleteQuest(id);
    await SoundBox.playClick();
    setIsDeleteDialogVisible(false);
  };
  const handleCancelDeleteQuest = async() => {

    await SoundBox.playClick();
    setIsDeleteDialogVisible(false);
  };
  // Function to handle increment with sound
  const handleIncrement = async () => {
    await SoundBox.playClick(); // Play click sound
    incrementQuest(id);
  };

  // Function to handle decrement with sound
  const handleDecrement = async () => {
    await SoundBox.playClick(); // Play click sound
    decrementQuest(id);
  };

  return (
    <TouchableOpacity
      onLongPress={handleOpenDeleteDialog} // Handle long press
      activeOpacity={0.8} // Add some feedback on press
    >
      <View className="relative -ml-4 -mr-4 mb-3 rounded-lg border border-gray-400 bg-transparent  p-4">
        {/* Positive Icon (Left) */}
        {type === 'positive' || type === 'both' ? (
          <TouchableOpacity
            onPress={handleIncrement}
            className="absolute left-2 top-[25px] -translate-y-1/2">
            <View className=" -ml-2 h-[50px] w-[45px]  rounded-l-lg border border-r-gray-400">
            <FontAwesome5
                name="forward" // Forward icon
                size={20}
                color="white"
                style={{
                  transform: [{ rotate: '-90deg' }], // Rotate to look like an upward arrow
                  textShadowColor: 'white',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 5,
                }}
              />
            </View>
          </TouchableOpacity>
        ) : null}

        {/* Negative Icon (Right) */}
        {type === 'negative' || type === 'both' ? (
          <TouchableOpacity
            onPress={handleDecrement}
            className="absolute right-2 top-[25px] -translate-y-1/2">
            <View className=" -ml-2 h-[50px] w-[40px] pt-[7px] pl-[5px]  rounded-r-lg border border-l-gray-400">
            <FontAwesome5
                name="backward" // Forward icon
                size={20}
                color="white"
                style={{
                   transform: [{ rotate: '-90deg' }], // Rotate to look like a downward arrow
                  textShadowColor: 'white',
                  
                  textShadowRadius: 5,

                }}
              />
            </View>
          </TouchableOpacity>
        ) : null}

        {/* Quest Name (Center) */}
        <View className="items-center">
          <NeonText
            fontSize={18} // Corresponds to "text-lg"
            fontWeight="800" // Corresponds to "font-bold"
            style={{ color: 'white', textAlign: 'center' }} // Corresponds to "text-white" and centering
          >
            {name}
          </NeonText>
        </View>

        {/* Completed/Failed Display (Bottom Right) */}
        <View className="absolute bottom-2 right-[60px]">
          <NeonText
            fontSize={16} // Corresponds to "text-sm"
            fontWeight="900"
            style={{ color: 'white',textShadowColor:'white',textShadowRadius: 4, }} // Green for completed
          >
            {completed}
          
            /
          
            {failed}
          </NeonText>
        </View>

        {/* Delete Confirmation Dialog */}
        {isDeleteDialogVisible && (
          <Modal transparent={true} animationType="fade">
          <View className="flex-1 items-center justify-center bg-black bg-opacity-50">
            <View className="w-4/5 rounded-xl border-2 border-white bg-transparent p-4">
              <NeonText
                fontSize={18} // Corresponds to "text-lg"
                fontWeight="900" // Corresponds to "font-extrabold"
                style={{ color: 'white', marginBottom: 3, textAlign:"left" }} // Corresponds to "mb-3 text-white"
              >
                Delete Quest
              </NeonText>
              <NeonText
                fontSize={14} // Corresponds to "text-sm"
                fontWeight="400" // Corresponds to normal weight for "text-gray-300"
                style={{ color: '#D1D5DB', marginBottom: 8, textAlign:"left" }} // Corresponds to "mb-3 text-gray-300"
              >
                Are you sure you want to delete this quest?
              </NeonText>
              <View className="flex-row justify-end space-x-4">
                <TouchableOpacity
                  onPress={handleCancelDeleteQuest}
                  className="right-3 rounded border border-gray-500 px-4 py-2"
                >
                  <NeonText
                    fontSize={14} // Corresponds to "text-sm"
                    fontWeight="400" // Corresponds to normal weight for "text-gray-500"
                    style={{ color: '#6B7280', textShadowColor:'#BDBDBD' }} // Corresponds to "text-gray-500"
                  >
                    Cancel
                  </NeonText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteQuest}
                  className="rounded border border-white px-4 py-2"
                >
                  <NeonText
                    fontSize={14} // Corresponds to "text-sm"
                    fontWeight="900" // Corresponds to "font-extrabold"
                    style={{ color: 'white', textShadowColor:'white' }} // Corresponds to "text-white"
                  >
                    Delete
                  </NeonText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        )}
      </View>
    </TouchableOpacity>
  );
});

export default Quest;
