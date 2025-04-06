import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useStore } from '../store/useStore';
import { QuestType } from 'types/questTypes';
import { FontAwesome } from '@expo/vector-icons';

const Quest = memo(({ id, name, stat, difficulty, type, completed, failed }: QuestType) => {
  const { incrementQuest, decrementQuest, deleteQuest } = useStore();
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  const handleDeleteQuest = () => {
    deleteQuest(id);
    setIsDeleteDialogVisible(false);
  };

  return (
    <TouchableOpacity
      onLongPress={() => setIsDeleteDialogVisible(true)} // Handle long press
      activeOpacity={0.8} // Add some feedback on press
    >
      <View className="p-4 mb-3 -ml-4 -mr-4 border-[2px] rounded-lg border-gray-600 bg-transparent  relative">
        {/* Positive Icon (Left) */}
        {type === 'positive' || type === 'both' ? (
          <TouchableOpacity
            onPress={() => incrementQuest(id)}
            className="absolute left-2 top-[25px] -translate-y-1/2"
          >
           <View className=' h-[50px] w-[45px] rounded-l-lg  border border-r-white -ml-2'><Text className='text-5xl text-white p-2 top-1'>+</Text></View>
             
          </TouchableOpacity>
        ) : null}

        {/* Negative Icon (Right) */}
        {type === 'negative' || type === 'both' ? (
          <TouchableOpacity
            onPress={() => decrementQuest(id)}
            className="absolute right-2 top-[25px] -translate-y-1/2"
          >
            <View className=' h-[50px] w-[40px] rounded-r-lg  border border-l-white -ml-2'><Text className='text-6xl text-white p-3 left-1.5 bottom-2'>-</Text></View>
          </TouchableOpacity>
        ) : null}

        {/* Quest Name (Center) */}
        <View className="items-center">
          <Text className="text-white text-lg font-bold">{name}</Text>
        </View>

        {/* Completed/Failed Display (Bottom Right) */}
        <View className="absolute bottom-2 right-[60px]">
          <Text className="text-green-400 text-sm">
            {completed}/{failed}
          </Text>
        </View>

        {/* Delete Confirmation Dialog */}
        {isDeleteDialogVisible && (
          <Modal transparent={true} animationType="fade">
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
              <View className="w-4/5 bg-white p-4 rounded-lg">
                <Text className="text-lg font-bold mb-4">Delete Quest</Text>
                <Text className="text-gray-700 mb-4">
                  Are you sure you want to delete this quest?
                </Text>
                <View className="flex-row justify-end space-x-4">
                  <TouchableOpacity
                    onPress={() => setIsDeleteDialogVisible(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    <Text className="text-gray-700">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDeleteQuest}
                    className="px-4 py-2 bg-red-500 rounded"
                  >
                    <Text className="text-white">Delete</Text>
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