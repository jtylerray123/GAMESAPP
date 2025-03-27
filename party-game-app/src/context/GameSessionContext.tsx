import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameSession, Player } from '../types/gameSession';
import {
  createGameSession,
  getGameSession,
  updateGameSession,
  deleteGameSession,
  subscribeToGameSession,
  getGameSessionByCode
} from '../firebase/services/firestore';

type GameAction =
  | { type: 'CREATE_SESSION'; payload: Omit<GameSession, 'id'> }
  | { type: 'JOIN_SESSION'; payload: { code: string } }
  | { type: 'UPDATE_SESSION'; payload: Partial<GameSession> }
  | { type: 'ADD_PLAYER'; payload: Player }
  | { type: 'REMOVE_PLAYER'; payload: string }
  | { type: 'UPDATE_PLAYER'; payload: Player }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

const initialState: GameState = {
  currentSession: null,
  isLoading: false,
  error: null,
};

const GameSessionContext = createContext<{
  state: GameState;
  dispatch: (action: GameAction) => Promise<string | GameSession | void>;
} | null>(null);

function gameSessionReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        ...state,
        currentSession: action.payload as GameSession,
        error: null,
      };
    case 'JOIN_SESSION':
      return {
        ...state,
        error: null,
      };
    case 'UPDATE_SESSION':
      return {
        ...state,
        currentSession: state.currentSession ? {
          ...state.currentSession,
          ...action.payload,
        } : null,
        error: null,
      };
    case 'ADD_PLAYER':
      if (!state.currentSession) return state;
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          players: [...state.currentSession.players, action.payload],
        },
        error: null,
      };
    case 'REMOVE_PLAYER':
      if (!state.currentSession) return state;
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          players: state.currentSession.players.filter(
            (player) => player.id !== action.payload
          ),
        },
        error: null,
      };
    case 'UPDATE_PLAYER':
      if (!state.currentSession) return state;
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          players: state.currentSession.players.map((player) =>
            player.id === action.payload.id ? action.payload : player
          ),
        },
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export function GameSessionProvider({ children }: { children: ReactNode }) {
  const [state, baseDispatch] = useReducer(gameSessionReducer, initialState);

  // Handle async actions
  const asyncDispatch = async (action: GameAction): Promise<string | GameSession | void> => {
    try {
      switch (action.type) {
        case 'CREATE_SESSION': {
          const sessionId = await createGameSession(action.payload);
          const newSession = await getGameSession(sessionId);
          if (newSession) {
            baseDispatch({ type: 'CREATE_SESSION', payload: newSession });
            return sessionId;
          }
          break;
        }

        case 'JOIN_SESSION': {
          const session = await getGameSessionByCode(action.payload.code);
          if (session) {
            baseDispatch({ type: 'CREATE_SESSION', payload: session });
            return session;
          }
          return undefined;
        }

        case 'UPDATE_SESSION':
          if (!state.currentSession?.id) throw new Error('No active session');
          await updateGameSession(state.currentSession.id, action.payload);
          baseDispatch(action);
          break;

        case 'ADD_PLAYER':
        case 'REMOVE_PLAYER':
        case 'UPDATE_PLAYER':
          if (!state.currentSession?.id) throw new Error('No active session');
          await updateGameSession(state.currentSession.id, {
            players: state.currentSession.players,
          });
          baseDispatch(action);
          break;

        default:
          baseDispatch(action);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      baseDispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  return (
    <GameSessionContext.Provider value={{ state, dispatch: asyncDispatch }}>
      {children}
    </GameSessionContext.Provider>
  );
}

export function useGameSession() {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error('useGameSession must be used within a GameSessionProvider');
  }
  return context;
} 