export interface Player {
  id: string;
  name: string;
  team?: number;
  role?: string;
  isHost: boolean;
  score: number;
}

export interface GameSession {
  id: string;
  gameId: string;
  code: string; // 4-letter game code
  status: 'waiting' | 'in_progress' | 'finished';
  players: Player[];
  currentRound: number;
  maxRounds: number;
  currentTurn: string; // player ID whose turn it is
  createdAt: Date;
  updatedAt: Date;
}

export interface GameState {
  currentSession: GameSession | null;
  isLoading: boolean;
  error: string | null;
} 