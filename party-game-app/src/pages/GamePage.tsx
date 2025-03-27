import React from 'react';
import { GameSession } from '../components/GameSession/GameSession';
import { GameSessionSetup } from '../components/GameSession/GameSessionSetup';
import { useGameSession } from '../context/GameSessionContext';
import { useParams } from 'react-router-dom';

export function GamePage() {
  const { state } = useGameSession();
  const { currentSession } = state;
  const { sessionId } = useParams<{ gameName: string; sessionId: string }>();

  return (
    <div className="min-h-screen bg-gray-100">
      {currentSession ? <GameSession /> : <GameSessionSetup />}
    </div>
  );
} 