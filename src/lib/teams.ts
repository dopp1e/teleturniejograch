export interface Team {
  id: string;
  name: string;
  members: string[];
}

export interface Result {
  teamIdA: string;
  scoreA: number;
  teamIdB: string;
  scoreB: number;
}
