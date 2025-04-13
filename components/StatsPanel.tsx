import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useStore } from '../store/useStore';
import NeonText from './utils/NeonText';
import SoundBox from './utils/soundBox';

const StatsPanel = () => {
  const { stats, healTries, heal, xp, hp, hpCap } = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [healDetails, setHealDetails] = useState({ healAmount: 0, xpCost: 0 });

  const handleHealClick = async () => {
    if (healTries > 0 && xp >= 5) {
      const maxHeal = Math.floor(hpCap * 0.5); // Max heal is 50% of HP cap
      const healAmount = Math.min(Math.floor(xp / 5), maxHeal, hpCap - hp); // Calculate heal amount
      const xpCost = healAmount * 5;

      setHealDetails({ healAmount, xpCost });
      await SoundBox.playMenu();
      setIsModalVisible(true); // Show the modal
    }
  };

  const confirmHeal = async () => {
    heal(); // Call the heal function from the store
    await SoundBox.playClick();
    setIsModalVisible(false); // Close the modal
  };
  const cancelHeal = async () => {
    await SoundBox.playClick();
    setIsModalVisible(false);
  };

  return (
    <View className="-ml-4 mb-4 w-[345px] rounded-lg border border-gray-400 bg-transparent p-5">
      <View className="flex-row justify-between p-1 pl-6 pr-6">
        <View className="gap-4">
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
        <View className="gap-4">
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
          <View className="flex-row items-center space-x-2 ">
            <TouchableOpacity
              onPress={handleHealClick}
              disabled={healTries <= 0 || xp < 5}
              style={{
                backgroundColor: healTries <= 0 || xp < 5 ? 'gray' : 'white',
                borderRadius: 9,
                padding: 8,
                shadowColor: 'white',
                shadowOffset: { width: 0, height: 2 },
              }}>
              <FontAwesome5
                name="medkit"
                size={16}
                style={{
                  textShadowColor: 'black', 
                  textShadowRadius: 1.5, 
                }}
              />
            </TouchableOpacity>
            <NeonText
              fontSize={18} // Corresponds to "text-lg"
              fontWeight="800" // Normal weight for "text-gray-400"
              style={{
                color: healTries <= 0 || xp < 5 ? 'gray' : 'white',
                paddingLeft: 5,
                shadowRadius: 8,
              }} // Hex code for "text-gray-400"
            >
              : {healTries}
            </NeonText>
          </View>
        </View>
      </View>

      {/* Heal Confirmation Modal */}
      {isModalVisible && (
        <Modal transparent={true} animationType="fade">
          <View className="flex-1 items-center justify-center bg-black bg-opacity-50">
            <View className="w-4/5 rounded-xl border-2 border-white bg-transparent p-4">
              <NeonText
                fontSize={18} // Corresponds to "text-lg"
                fontWeight="900" // Corresponds to "font-extrabold"
                style={{ color: 'white', marginBottom: 4, textAlign: 'left' }} // Corresponds to "mb-4 text-white"
              >
                Confirm Heal
              </NeonText>
              <NeonText
                fontSize={14} // Corresponds to "text-sm"
                fontWeight="400" // Corresponds to normal weight for "text-gray-300"
                style={{ color: '#D1D5DB', marginBottom: 16, textAlign: 'left' }} // Corresponds to "mb-4 text-gray-300"
              >
                You will recover{' '}
                <NeonText
                  fontSize={14}
                  fontWeight="900" // Corresponds to "font-extrabold"
                  style={{ color: 'white' }} // Corresponds to "text-white"
                >
                  {healDetails.healAmount} HP
                </NeonText>{' '}
                and use{' '}
                <NeonText
                  fontSize={14}
                  fontWeight="900" // Corresponds to "font-extrabold"
                  style={{ color: 'white' }} // Corresponds to "text-white"
                >
                  {healDetails.xpCost} XP
                </NeonText>
                .
              </NeonText>
              <View className="flex-row justify-end space-x-4">
                <TouchableOpacity
                  onPress={cancelHeal}
                  className="right-3 rounded border border-gray-400 px-4 py-2">
                  <NeonText
                    fontSize={14} // Corresponds to "text-sm"
                    fontWeight="400" // Corresponds to normal weight for "text-gray-500"
                    style={{ color: '#6B7280', textShadowColor: 'gray' }} // Corresponds to "text-gray-500"
                  >
                    Cancel
                  </NeonText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmHeal}
                  className="rounded border border-white px-4 py-2">
                  <NeonText
                    fontSize={14} // Corresponds to "text-sm"
                    fontWeight="900" // Corresponds to "font-extrabold"
                    style={{ color: 'white' }} // Corresponds to "text-white"
                  >
                    Confirm
                  </NeonText>
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
    <FontAwesome5
      name={icon}
      size={16}
      color="white"
      style={{
        textShadowColor: 'white', // White shadow
        textShadowRadius: 7, // Adjust shadow radius for better effect
      }}
    />

    <NeonText
      fontSize={17}
      fontWeight={800}
      style={{ color: 'white', shadowRadius: 20, paddingLeft: 5 }}>
      {label}: {value}
    </NeonText>
  </View>
);

export default StatsPanel;
