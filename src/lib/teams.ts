import type { Spell }  from '@/lib/spell'

export interface Team {
  id: string;
  name: string;
  members: string[];
  hexColor: string;
  score: number | null;
  keyAmt: number | null;
  spells: Spell[] | null;
}

export interface Result {
  teamIdA: string;
  scoreA: number;
  teamIdB: string;
  scoreB: number;
}
