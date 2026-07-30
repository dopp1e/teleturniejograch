export interface Team {
  id: string;
  name: string;
  members: string[];
  hexColor: string;
}

export interface Result {
  teamIdA: string;
  scoreA: number;
  teamIdB: string;
  scoreB: number;
}
