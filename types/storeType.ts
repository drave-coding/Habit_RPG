import { QuestType, Stat } from "./questTypes";

export interface AppState {
    // Basic Numbers
    level: number;
    xp: number;
    xpCap: number;
    hp: number;
    hpCap: number;
    healTries : number;
    lastResetDate: string | null;
    stats: Stat[];
    heal: () => void;
    resetDailyData: () => void;
    
    // Quest Section
    quests: QuestType[];
    addQuest: (quest: Omit<QuestType, 'id' | 'completed' | 'failed'>) => void;
    incrementQuest: (id: string) => void;
    decrementQuest: (id: string) => void;
    deleteQuest: (id: string) => void;
   

    
  
    
  }