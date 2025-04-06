import { StatType } from 'types/questTypes';
import { AppState } from '../types/storeType';

// Function to calculate XP Cap
export const calculateXPCap = (level: number) =>
  Math.floor(100 + (level - 1) * 50 + Math.pow(level - 1, 1.5));

// Function to calculate HP Cap
export const calculateHPCap = (level: number) =>
  Math.floor(10 + (level * 5) + (level * level) / 4);

// Function to calculate XP Gain
export const calculateXPGain = (level: number, difficulty: 'easy' | 'medium' | 'hard') => {
  const baseXP = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  return Math.floor(baseXP + level / 5);
};

// Function to calculate HP Loss
export const calculateHPLoss = (hpCap: number, difficulty: 'easy' | 'medium' | 'hard') => {
  const percentage = difficulty === 'easy' ? 0.05 : difficulty === 'medium' ? 0.1 : 0.15;
  return Math.floor(hpCap * percentage);
};

// Function to update stat value with decimal storage
export const updateStatValue = (
  state: AppState,
  statName: StatType,
  difficulty: 'easy' | 'medium' | 'hard'
) => {
  const statGain = difficulty === 'easy' ? 0.1 : difficulty === 'medium' ? 0.15 : 0.2;

  return {
    stats: state.stats.map((stat) =>
      stat.name === statName
        ? { ...stat, value: stat.value + statGain } // Store decimal value
        : stat
    ),
  };
};