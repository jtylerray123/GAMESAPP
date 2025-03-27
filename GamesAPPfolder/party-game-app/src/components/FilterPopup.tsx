import React from 'react';

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    playerCount: number | null;
    gameType: string[];
    duration: string | null;
    difficulty: string | null;
  };
  onFilterChange: (filters: {
    playerCount: number | null;
    gameType: string[];
    duration: string | null;
    difficulty: string | null;
  }) => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}) => {
  if (!isOpen) return null;

  const gameTypes = ['acting', 'word-guessing', 'drawing', 'communication', 'party', 'quick', 'strategy'];
  const durations = ['5-10 minutes', '10-20 minutes', '15-30 minutes', '20-30 minutes', '30-45 minutes'];
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filter Games</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Player Count Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Number of Players</h3>
          <input
            type="number"
            min="1"
            max="20"
            value={filters.playerCount || ''}
            onChange={(e) => onFilterChange({
              ...filters,
              playerCount: e.target.value ? parseInt(e.target.value) : null
            })}
            className="w-full p-2 border rounded"
            placeholder="Enter number of players"
          />
        </div>

        {/* Game Type Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Game Type</h3>
          <div className="flex flex-wrap gap-2">
            {gameTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  const newTypes = filters.gameType.includes(type)
                    ? filters.gameType.filter(t => t !== type)
                    : [...filters.gameType, type];
                  onFilterChange({ ...filters, gameType: newTypes });
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.gameType.includes(type)
                    ? 'bg-warm-accent text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Duration</h3>
          <select
            value={filters.duration || ''}
            onChange={(e) => onFilterChange({
              ...filters,
              duration: e.target.value || null
            })}
            className="w-full p-2 border rounded"
          >
            <option value="">Any Duration</option>
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Difficulty</h3>
          <select
            value={filters.difficulty || ''}
            onChange={(e) => onFilterChange({
              ...filters,
              difficulty: e.target.value || null
            })}
            className="w-full p-2 border rounded"
          >
            <option value="">Any Difficulty</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onFilterChange({
              playerCount: null,
              gameType: [],
              duration: null,
              difficulty: null
            })}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-warm-accent text-white rounded hover:bg-warm-accent-dark"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup; 