import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { games } from '../games/gamesData';
import { useGameSession } from '../context/GameSessionContext';
import { GameSession } from '../types/gameSession';

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useGameSession();
  const [gameCode, setGameCode] = useState<string | null>(null);
  const game = games.find(g => g.id === id);

  useEffect(() => {
    console.log('Game ID:', id);
    console.log('Available games:', games);
    console.log('Found game:', game);
  }, [id, game]);

  const handleBack = () => {
    // If we have filter state, pass it back to the home page
    if (location.state?.filters) {
      navigate('/', { state: { filters: location.state.filters } });
    } else {
      navigate('/');
    }
  };

  const generateGameCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: 4 }, () => 
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');
  };

  const handleStartGame = async () => {
    if (!game) return;

    // Generate a unique 4-letter code
    const gameCode = generateGameCode();

    // Create initial game session
    const newSession: Omit<GameSession, 'id'> = {
      gameId: game.id,
      code: gameCode,
      status: 'waiting',
      players: [],
      currentRound: 0,
      maxRounds: 10,
      currentTurn: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      // Create session in Firestore and get the session ID
      const sessionId = await dispatch({ type: 'CREATE_SESSION', payload: newSession });
      
      // Set the game code to show in the UI
      setGameCode(gameCode);

      // Navigate to the game page after a short delay to show the code
      setTimeout(() => {
        const gameName = game.name.toLowerCase().replace(/\s+/g, '-');
        navigate(`/play/${gameName}/${gameCode}`);
      }, 2000);
    } catch (error) {
      console.error('Failed to create game session:', error);
      // TODO: Show error message to user
    }
  };

  if (!game) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-cozy-brown mb-4">Game not found</h2>
          <p className="text-soft-wood">Let's go back and find another game to play!</p>
          <button 
            onClick={handleBack}
            className="mt-4 cozy-button"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-soft-wood hover:text-cozy-brown transition-colors mr-4"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Games
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
      <p className="text-gray-600 mb-6">{game.description}</p>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Game Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Players</p>
            <p className="font-medium">{game.tags.playerCount.min}-{game.tags.playerCount.max}</p>
          </div>
          <div>
            <p className="text-gray-600">Duration</p>
            <p className="font-medium">{game.tags.duration}</p>
          </div>
          <div>
            <p className="text-gray-600">Difficulty</p>
            <p className="font-medium capitalize">{game.tags.difficulty}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Rules</h2>
        <ol className="list-decimal list-inside space-y-2">
          {game.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      </div>

      {game.videoUrl && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">How to Play</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={game.videoUrl}
              title={`How to play ${game.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="mt-8">
        {gameCode ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 text-center">
            <p className="text-lg font-semibold mb-2">Game Created Successfully!</p>
            <p>Your game code is: <span className="font-mono font-bold text-xl">{gameCode}</span></p>
            <p className="text-sm mt-2">Redirecting to game room...</p>
          </div>
        ) : (
          <div className="flex gap-4">
            <button 
              onClick={handleStartGame}
              className="cozy-button flex-1"
            >
              Start Game
            </button>
            <button className="cozy-button flex-1 bg-soft-wood hover:bg-cozy-brown">
              Share Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail; 