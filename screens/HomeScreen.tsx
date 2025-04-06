import React, { useState } from 'react';
import { View, ScrollView,StyleSheet } from 'react-native';
import CharacterPanel from '../components/CharacterPanel';
import StatsPanel from '../components/StatsPanel';
import QuestList from '../components/QuestList';
import { Video,ResizeMode } from 'expo-av';
import { TouchableOpacity, Text } from 'react-native';
const QuestCreationDialog = React.lazy(() => import('../components/QuestCreationDialog'));
const HomeScreen = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <View className="flex-1 bg-blue-950">
      {/* Background Video */}

      <Video
        source={require('../assets/bg-video-2.mp4')} // Path to your video file
        style={StyleSheet.absoluteFill} // Make the video cover the entire screen
        resizeMode={ResizeMode.COVER} // Scale the video to cover the screen
        shouldPlay // Automatically play the video
        isLooping // Loop the video
        isMuted // Disable audio
        rate={0.6}
        
      />
      {/* Dark Overlay */}
      <View style={styles.overlay} />

      
      <ScrollView className="p-6 mt-6" contentContainerStyle={{ paddingBottom: 80 }} >
        <CharacterPanel />
        <StatsPanel />
        <QuestList />
      </ScrollView>

      {/* Footer with + Button */}
      <View className="absolute bottom-4 w-full flex items-center">
        <TouchableOpacity
          onPress={() => setIsDialogOpen(true)}
          className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center"
        >
          <Text className="text-white text-2xl">+</Text>
        </TouchableOpacity>
      </View>

      {isDialogOpen && <QuestCreationDialog onClose={() => setIsDialogOpen(false)} />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Fallback background color
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black
  },
});
export default HomeScreen;
