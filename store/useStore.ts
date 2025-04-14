import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, PersistStorage } from 'zustand/middleware';
import uuid from 'react-native-uuid';

import { AppState } from 'types/storeType';
import { calculateHPCap, calculateHPLoss, calculateXPCap, calculateXPGain, updateStatValue } from './utils';
import SoundBox from 'components/utils/soundBox';


// Custom storage interface for AsyncStorage compatibility
const asyncStorage: PersistStorage<AppState> = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};



export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      level: 1,
      xp: 0,
      xpCap: calculateXPCap(1), // Initial XP Cap
      hp: 15,
      hpCap: calculateHPCap(1), // Initial HP Cap
      lastResetDate: new Date().toISOString(),
      healTries: 3,
      stats: [
        { name: 'STR', value: 0 },
        { name: 'AGI', value: 0 },
        { name: 'INT', value: 0 },
        { name: 'PER', value: 0 },
        { name: 'VIT', value: 0 },
      ],
     
      quests: [],
      heal: () => {
        set((state) => {
          if (state.healTries <= 0 || state.xp < 5) {
            return state; // No heal attempts left or insufficient XP
          }

          const maxHeal = Math.floor(state.hpCap * 0.5); // Max heal is 50% of HP cap
          const healAmount = Math.min(Math.floor(state.xp / 5), maxHeal, state.hpCap - state.hp); // Calculate heal amount

          if (healAmount <= 0) {
            return state; // No healing possible
          }

          return {
            ...state,
            hp: Math.min(state.hp + healAmount, state.hpCap), // Heal without exceeding HP cap
            xp: state.xp - healAmount * 5, // Deduct XP used for healing
            healTries: state.healTries - 1, // Decrease heal attempts
          };
        });
      },
      // Add a quest
      addQuest: (quest) =>
        set((state) => ({
          quests: [
            ...state.quests,
            { ...quest, id: uuid.v4() as string, completed: 0, failed: 0 },
          ],
        })),

  
     // Increment quest logic
     incrementQuest: (id) => {
      set((state) => {
        let updatedState = { ...state };

        const quests = state.quests.map((quest) => {
          if (quest.id === id) {
            // Gain XP
            const xpGain = calculateXPGain(state.level, quest.difficulty);
            updatedState.xp += xpGain;

            // Handle Level-Up
            if (updatedState.xp >= updatedState.xpCap) {
              const extraXP = updatedState.xp - updatedState.xpCap;
              updatedState.level += 1;
              updatedState.xpCap = calculateXPCap(updatedState.level);
              updatedState.hpCap = calculateHPCap(updatedState.level);

              // Add the extra HP from the new HP cap
              const hpIncrease = updatedState.hpCap - state.hpCap;
              updatedState.hp = Math.min(updatedState.hp + hpIncrease, updatedState.hpCap);

              // Reset heal tries on level-up
              updatedState.healTries = 3;

               // Play level-up sound
                SoundBox.playLevelUp();

              // Carry over extra XP
              updatedState.xp = extraXP;
            }

            // Update Stat
            if (quest.stat) {
              const updatedStats = updateStatValue(updatedState, quest.stat, quest.difficulty);
              updatedState.stats = updatedStats.stats;
            }

            return { ...quest, completed: quest.completed + 1 };
          }
          return quest;
        });

        return { ...updatedState, quests };
      });
    },

      // Decrement quest logic
      decrementQuest: (id) => {
        set((state) => {
          const quests = state.quests.map((quest) =>
            quest.id === id ? { ...quest, failed: quest.failed + 1 } : quest
          );

          // Lose HP
          const quest = state.quests.find((q) => q.id === id);
          const hpLoss = quest ? calculateHPLoss(state.hpCap, quest.difficulty) : 0;

          return { quests, hp: Math.max(state.hp - hpLoss, 0) };
        });
      },

      // Delete a quest
      deleteQuest: (id) => {
        set((state) => ({
          quests: state.quests.filter((quest) => quest.id !== id),
        }));
      },

      resetDailyData: () => {
        const currentDate = new Date().toISOString().split('T')[0]; 
        const { lastResetDate, quests } = get();
      
        
        if (!lastResetDate || lastResetDate.split('T')[0] !== currentDate) {
        
          const resetQuests = quests.map((quest) => ({
            ...quest,
            completed: 0,
            failed: 0,
          }));
      
          set({
            lastResetDate: new Date().toISOString(), 
            quests: resetQuests, 
          });
        }
      },
    }),
    {
      name: 'app-storage',
      storage: asyncStorage,
    }
  )
);
