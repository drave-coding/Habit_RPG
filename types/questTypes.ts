export interface QuestType {
  id: string;
  name: string;
  stat: StatType;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'positive' | 'negative' | 'both';  // ✅ Allow 'both'
  completed: number;
  failed: number;
  count: number; 
}


  export type StatType = 'STR' | 'AGI' | 'INT' | 'PER' | 'VIT';

  export interface Stat {
    name: StatType;
    value: number;
  }  