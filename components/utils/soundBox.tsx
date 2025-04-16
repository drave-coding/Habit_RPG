import { Audio } from 'expo-av';

const SoundBox = {
  // Preload the audio files
  sounds: {
    appOpen: require('../../assets/app-open.mp3'),
    click: require('../../assets/click.mp3'),
    menu: require('../../assets/menu.mp3'),
    levelUp: require('../../assets/levelUp.mp3'),
  },

  // Play the "App Open" sound
  playAppOpen: async () => {
    await SoundBox.playSound(SoundBox.sounds.appOpen);
  },

  // Play the "Click" sound
  playClick: async () => {
    await SoundBox.playSound(SoundBox.sounds.click);
  },

  // Play the "Menu" sound
  playMenu: async () => {
    await SoundBox.playSound(SoundBox.sounds.menu);
  },

  // Play the "Level Up" sound
  playLevelUp: async () => {
    await SoundBox.playSound(SoundBox.sounds.levelUp);
  },

  // Generic method to play a sound with a faster playback rate
  playSound: async (soundFile: any) => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.setRateAsync(1.2, true); // Set playback rate to 1.5x (faster)
      await sound.playAsync();
      // Unload the sound after playback
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  },
};

export default SoundBox;