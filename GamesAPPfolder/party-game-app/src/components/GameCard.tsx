import React from 'react';
import { Game } from '../games/gamesData';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
      <p className="text-gray-600 mb-4">{game.description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{game.tags.playerCount.min}-{game.tags.playerCount.max} players</span>
        <span>{game.tags.duration}</span>
        <span>{game.tags.difficulty}</span>
      </div>
    </div>
  );
};

export default GameCard; 