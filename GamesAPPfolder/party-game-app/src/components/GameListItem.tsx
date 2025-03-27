import React, { useState } from 'react';
import { Game } from '../games/gamesData';
import { useNavigate } from 'react-router-dom';

interface GameListItemProps {
  game: Game;
  filters: {
    playerCount: number | null;
    gameType: string[];
    duration: string | null;
    difficulty: string | null;
  };
}

const GameListItem: React.FC<GameListItemProps> = ({ game, filters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    navigate(`/game/${game.id}`, { state: { filters } });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-2">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
        onClick={handleClick}
      >
        <h3 className="text-lg font-semibold text-gray-800">{game.name}</h3>
        <button 
          onClick={toggleExpand}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg 
            className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          <p className="text-gray-600 mb-4">{game.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Players</h4>
              <p className="text-gray-600">{game.tags.playerCount.min}-{game.tags.playerCount.max}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Duration</h4>
              <p className="text-gray-600">{game.tags.duration}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">Difficulty</h4>
              <p className="text-gray-600 capitalize">{game.tags.difficulty}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameListItem; 