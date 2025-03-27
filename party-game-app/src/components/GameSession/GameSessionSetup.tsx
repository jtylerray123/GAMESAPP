import React, { useState } from 'react';
import { useGameSession } from '../../context/GameSessionContext';
import { GameSession, Player } from '../../types/gameSession';
import { useParams } from 'react-router-dom';

export function GameSessionSetup() {
  const { dispatch } = useGameSession();
  const { id: sessionId } = useParams<{ id: string }>();
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleJoinSession = async () => {
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!sessionId) {
      setError('Invalid game code');
      return;
    }

    try {
      const newPlayer: Player = {
        id: crypto.randomUUID(),
        name: playerName,
        isHost: false,
        score: 0,
      };

      // Join the existing session
      await dispatch({ 
        type: 'JOIN_SESSION', 
        payload: { code: sessionId } 
      });

      // Add the player to the session
      await dispatch({ type: 'ADD_PLAYER', payload: newPlayer });
    } catch (error) {
      console.error('Failed to join session:', error);
      setError('Failed to join the game session. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Join Game</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleJoinSession}
          >
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
} 