import React, { useState, useEffect } from 'react';
import { games, Game } from '../games/gamesData';
import GameListItem from '../components/GameListItem';
import FilterPopup from '../components/FilterPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGameSession } from '../context/GameSessionContext';
import { GameSession } from '../types/gameSession';

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useGameSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    playerCount: null as number | null,
    gameType: [] as string[],
    duration: null as string | null,
    difficulty: null as string | null,
  });

  // Handle filter state when returning from game detail
  useEffect(() => {
    if (location.state?.filters) {
      setFilters(location.state.filters);
    }
  }, [location.state]);

  const handleJoinGame = async () => {
    if (!gameCode.trim()) {
      setJoinError('Please enter a game code');
      return;
    }

    try {
      const session = await dispatch({ 
        type: 'JOIN_SESSION', 
        payload: { code: gameCode.toUpperCase() }
      }) as GameSession | undefined;

      if (session?.gameId) {
        const gameName = games.find(g => g.id === session.gameId)?.name.toLowerCase().replace(/\s+/g, '-') || 'game';
        navigate(`/play/${gameName}/${gameCode.toUpperCase()}`);
      } else {
        setJoinError('Game not found');
      }
    } catch (error) {
      console.error('Failed to join game:', error);
      setJoinError('Failed to join game');
    }
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply filters
    const matchesPlayerCount = !filters.playerCount || 
      (game.tags.playerCount.min <= filters.playerCount && game.tags.playerCount.max >= filters.playerCount);
    
    const matchesGameType = filters.gameType.length === 0 || 
      filters.gameType.some(type => game.tags.type.includes(type));
    
    const matchesDuration = !filters.duration || 
      game.tags.duration === filters.duration;
    
    const matchesDifficulty = !filters.difficulty || 
      game.tags.difficulty === filters.difficulty;

    return matchesSearch && matchesPlayerCount && matchesGameType && matchesDuration && matchesDifficulty;
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-cozy-brown">Welcome to Game Night</h1>
          <p className="text-xl text-soft-wood">Gather your friends and let's play something fun!</p>
        </div>

        {/* Join Game Section */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Join a Game</h2>
          <div className="flex gap-4">
            <input
              type="text"
              maxLength={4}
              placeholder="Enter 4-letter code"
              value={gameCode}
              onChange={(e) => {
                setGameCode(e.target.value.toUpperCase());
                setJoinError(null);
              }}
              className="cozy-input flex-1"
            />
            <button
              onClick={handleJoinGame}
              className="cozy-button"
            >
              Join Game
            </button>
          </div>
          {joinError && (
            <p className="text-red-600 mt-2 text-sm">{joinError}</p>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <div className="flex items-center w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-soft-wood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="cozy-input w-full pl-10 pr-4"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="cozy-button flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>
        </div>

        {/* Game List */}
        <div className="space-y-2">
          {filteredGames.map(game => (
            <GameListItem
              key={game.id}
              game={game}
              filters={filters}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-soft-wood text-xl">
              No games found matching your search. Try adjusting your filters!
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-soft-wood">
            Grab some snacks, get comfortable, and let's make some memories!
          </p>
        </div>

        <FilterPopup
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>
    </div>
  );
};

export default Home; 