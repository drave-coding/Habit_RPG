import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, PersistStorage, StateStorage } from 'zustand/middleware';

interface Stat {
  name: string;
  value: number;
}

interface Quest {
  id: string;
  name: string;
  stat: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'positive' | 'negative' | 'both';
  completed: number;
  failed: number;
}

interface AppState {
  level: number;
  xp: number;
  hp: number;
  stats: Stat[];
  quests: Quest[];
  addQuest: (quest: Quest) => void;
  updateStat: (name: string, amount: number) => void;
  incrementXP: (amount: number) => void;
  decrementHP: (amount: number) => void;
}

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
      hp: 100,
      stats: [
        { name: 'Strength', value: 10 },
        { name: 'Intelligence', value: 10 },
        { name: 'Endurance', value: 10 },
        { name: 'Charisma', value: 10 },
        { name: 'Agility', value: 10 },
      ],
      quests: [],
      addQuest: (quest) => set((state) => ({ quests: [...state.quests, quest] })),
      updateStat: (name, amount) =>
        set((state) => ({
          stats: state.stats.map((stat) =>
            stat.name === name ? { ...stat, value: stat.value + amount } : stat
          ),
        })),
      incrementXP: (amount) => {
        const currentXP = get().xp + amount;
        if (currentXP >= 100) {
          set({ xp: currentXP - 100, level: get().level + 1 });
        } else {
          set({ xp: currentXP });
        }
      },
      decrementHP: (amount) => set((state) => ({ hp: state.hp - amount })),
    }),
    { 
      name: 'app-storage', 
      storage: asyncStorage 
    }
  )
);
