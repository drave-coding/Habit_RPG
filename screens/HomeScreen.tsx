import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import CharacterPanel from '../components/CharacterPanel';
import StatsPanel from '../components/StatsPanel';
import QuestList from '../components/QuestList';
import { Video, ResizeMode } from 'expo-av';
import { TouchableOpacity, Text } from 'react-native';
import QuestCreationDialog from '../components/QuestCreationDialog';
import SoundBox from 'components/utils/soundBox';
import { FontAwesome5 } from '@expo/vector-icons';
const HomeScreen = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = async () => {
    await SoundBox.playMenu(); // Play menu sound
    setIsDialogOpen(true);
  };

  return (
    <View className="flex-1 ">
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

      {/* Main Content */}
      <ScrollView className="mt-6 p-6" contentContainerStyle={{ paddingBottom: 120 }}>
        <CharacterPanel />
        <StatsPanel />
        <QuestList />
      </ScrollView>

      <View style={styles.diamondContainer}>
  <TouchableOpacity
    onPress={handleOpenDialog}
    style={styles.addButton}>
    <FontAwesome5
              name="plus"
              size={25}
              color="black"
              style={{
                textShadowColor: 'gray',
              
              }}
            />
  </TouchableOpacity>
</View>

      {/* Quest Creation Dialog */}
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
  diamondContainer: {
    position: 'absolute',
    bottom: 25, // Adjust position as needed
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'white', // Blue diamond
    transform: [{ rotate: '45deg' }], // Rotate to form a diamond
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
     // Match diamond color
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-45deg' }], // Rotate back to make "+" upright
  }
 ,
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.15)', // Semi-transparent black 0.2
  },
});
export default HomeScreen;
