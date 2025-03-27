import React, { useState } from 'react';
import { useGameSession } from '../../context/GameSessionContext';
import { Player } from '../../types/gameSession';
import { useNavigate, useParams } from 'react-router-dom';

export function GameSession() {
  const { state, dispatch } = useGameSession();
  const navigate = useNavigate();
  const { sessionId } = useParams<{ gameName: string; sessionId: string }>();
  const { currentSession } = state;
  const [isCopied, setIsCopied] = useState(false);

  if (!currentSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Active Game Session</h2>
          <p className="text-gray-600">Join or create a game session to begin playing.</p>
        </div>
      </div>
    );
  }

  const currentPlayer = currentSession.players.find(
    (p) => p.id === currentSession.currentTurn
  );

  const handleStartGame = async () => {
    try {
      await dispatch({
        type: 'UPDATE_SESSION',
        payload: { 
          ...currentSession, 
          status: 'in_progress',
          currentTurn: currentSession.players[0]?.id || '',
          updatedAt: new Date()
        },
      });
    } catch (error) {
      console.error('Failed to start game:', error);
      // TODO: Show error message to user
    }
  };

  const handleLeaveGame = async () => {
    try {
      // Remove the current player from the session
      const currentPlayerId = currentSession.players.find(p => p.isHost)?.id;
      if (currentPlayerId) {
        await dispatch({ type: 'REMOVE_PLAYER', payload: currentPlayerId });
      }
      
      // Navigate back to home
      navigate('/');
    } catch (error) {
      console.error('Failed to leave game:', error);
      // TODO: Show error message to user
    }
  };

  const handleKickPlayer = async (playerId: string) => {
    try {
      await dispatch({ type: 'REMOVE_PLAYER', payload: playerId });
    } catch (error) {
      console.error('Failed to kick player:', error);
      // TODO: Show error message to user
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      // TODO: Show error message to user
    }
  };

  const isHost = currentSession.players.find(p => p.isHost)?.id === sessionId;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold">Game Session</h1>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-lg font-semibold">Game Code: </span>
                <span className="bg-gray-100 px-3 py-1 rounded-lg text-lg font-mono">{currentSession.code}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentSession.code);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
                {isCopied && (
                  <span className="text-green-600 text-sm">Copied!</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLeaveGame}
                className="text-red-600 hover:text-red-700"
              >
                Leave Game
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Round {currentSession.currentRound} of {currentSession.maxRounds}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              currentSession.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' :
              currentSession.status === 'in_progress' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {currentSession.status === 'waiting' ? 'Waiting for Players' :
               currentSession.status === 'in_progress' ? 'Game in Progress' :
               'Game Ended'}
            </span>
          </div>
        </div>

        {/* Players List */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Players ({currentSession.players.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentSession.players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isCurrentTurn={player.id === currentSession.currentTurn}
                isHost={isHost}
                onKickPlayer={handleKickPlayer}
              />
            ))}
          </div>
        </div>

        {/* Game Controls */}
        {currentSession.status === 'waiting' && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-600">
              {currentSession.players.length < 2 
                ? 'Waiting for more players to join...'
                : 'All players are ready!'
              }
            </p>
            {isHost && (
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                onClick={handleStartGame}
                disabled={currentSession.players.length < 2}
              >
                Start Game
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface PlayerCardProps {
  player: Player;
  isCurrentTurn: boolean;
  isHost: boolean;
  onKickPlayer: (playerId: string) => void;
}

function PlayerCard({ player, isCurrentTurn, isHost, onKickPlayer }: PlayerCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        isCurrentTurn ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{player.name}</h3>
          {player.team && <p className="text-sm text-gray-600">Team {player.team}</p>}
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Score: {player.score}</p>
          {player.isHost && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Host
            </span>
          )}
        </div>
      </div>
      {isCurrentTurn && (
        <div className="mt-2 text-sm text-blue-600 font-medium">Current Turn</div>
      )}
      {isHost && !player.isHost && (
        <button
          onClick={() => onKickPlayer(player.id)}
          className="mt-2 text-sm text-red-600 hover:text-red-700"
        >
          Kick Player
        </button>
      )}
    </div>
  );
} 