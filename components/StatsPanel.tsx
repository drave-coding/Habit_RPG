import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import NeonText from './utils/NeonText';

const StatsPanel = () => {
  const { stats, healTries, heal, xp, hp, hpCap } = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [healDetails, setHealDetails] = useState({ healAmount: 0, xpCost: 0 });

  const handleHealClick = () => {
    if (healTries > 0 && xp >= 5) {
      const maxHeal = Math.floor(hpCap * 0.5); // Max heal is 50% of HP cap
      const healAmount = Math.min(Math.floor(xp / 5), maxHeal, hpCap - hp); // Calculate heal amount
      const xpCost = healAmount * 5;

      setHealDetails({ healAmount, xpCost });
      setIsModalVisible(true); // Show the modal
    }
  };

  const confirmHeal = () => {
    heal(); // Call the heal function from the store
    setIsModalVisible(false); // Close the modal
  };

  return (
    <View className="p-7 bg-transparent mb-4 border-[2px] border-gray-600 w-[345px] -ml-4">
      <View className="flex-row justify-between p-2">
        <View className="gap-3">
          <StatItem
            icon="dumbbell"
            label="STR"
            value={Math.floor(stats.find((stat) => stat.name === 'STR')?.value ?? 0)}
          />
          <StatItem
            icon="running"
            label="AGI"
            value={Math.floor(stats.find((stat) => stat.name === 'AGI')?.value ?? 0)}
          />
          <StatItem
            icon="eye"
            label="PER"
            value={Math.floor(stats.find((stat) => stat.name === 'PER')?.value ?? 0)}
          />
        </View>
        <View className="gap-3">
          <StatItem
            icon="brain"
            label="INT"
            value={Math.floor(stats.find((stat) => stat.name === 'INT')?.value ?? 0)}
          />
          <StatItem
            icon="heartbeat"
            label="VIT"
            value={Math.floor(stats.find((stat) => stat.name === 'VIT')?.value ?? 0)}
          />
          {/* Heal Button */}
          <View className="flex-row items-center space-x-2 pl-1">
            <TouchableOpacity
              onPress={handleHealClick}
              disabled={healTries <= 0 || xp < 5} // Disable if no heal tries or insufficient XP
              className={`p-2 rounded-full ${
                healTries <= 0 || xp < 5 ? 'bg-gray-500' : 'bg-blue-400'
              }`}
            >
              <FontAwesome5 name="medkit" size={16} color="white" />
            </TouchableOpacity>
            <Text className="text-gray-400 text-lg"> : {healTries}</Text>
          </View>
        </View>
      </View>

      {/* Heal Confirmation Modal */}
      {isModalVisible && (
        <Modal transparent={true} animationType="fade">
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="w-4/5 bg-white p-4 rounded-lg">
              <Text className="text-lg font-bold mb-4">Confirm Heal</Text>
              <Text className="text-gray-700 mb-4">
                You will recover <Text className="text-green-500">{healDetails.healAmount} HP</Text> and use{' '}
                <Text className="text-blue-500">{healDetails.xpCost} XP</Text>.
              </Text>
              <View className="flex-row justify-end space-x-4">
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  <Text className="text-gray-700">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmHeal}
                  className="px-4 py-2 bg-green-500 rounded"
                >
                  <Text className="text-white">Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

// Explicitly define prop types for StatItem
interface StatItemProps {
  icon: string;
  label: string;
  value: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value }) => (
  <View className="ml-2 mr-2 flex-row items-center space-x-2">
    <FontAwesome5 name={icon} size={16} color="#00FFFF" />
    <NeonText fontSize={17} fontWeight={800}  style={{ color: 'white' , paddingLeft: 5}}>
      {label}: {value}
    </NeonText>
  </View>
);

export default StatsPanel;