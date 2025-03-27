import { useState, useMemo } from 'react';
import { games, Game } from '../games/gamesData';
import { FilterDropdown } from '../components/FilterDropdown';

type FilterOptions = {
  type: string[];
  duration: string[];
  difficulty: ('easy' | 'medium' | 'hard')[];
};

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    type: [],
    duration: [],
    difficulty: [],
  });

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const types = new Set<string>();
    const durations = new Set<string>();
    const difficulties = new Set<'easy' | 'medium' | 'hard'>();

    games.forEach(game => {
      game.tags.type.forEach(type => types.add(type));
      durations.add(game.tags.duration);
      difficulties.add(game.tags.difficulty);
    });

    return {
      types: Array.from(types),
      durations: Array.from(durations),
      difficulties: Array.from(difficulties),
    };
  }, []);

  // Filter games based on search and filters
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      // Search filter
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Type filter
      const matchesType = filters.type.length === 0 || 
                         game.tags.type.some(type => filters.type.includes(type));

      // Duration filter
      const matchesDuration = filters.duration.length === 0 || 
                             filters.duration.includes(game.tags.duration);

      // Difficulty filter
      const matchesDifficulty = filters.difficulty.length === 0 || 
                               filters.difficulty.includes(game.tags.difficulty);

      return matchesSearch && matchesType && matchesDuration && matchesDifficulty;
    });
  }, [searchQuery, filters]);

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    setFilters(prev => {
      if (category === 'difficulty') {
        // Type guard for difficulty values
        if (value === 'easy' || value === 'medium' || value === 'hard') {
          return {
            ...prev,
            difficulty: prev.difficulty.includes(value)
              ? prev.difficulty.filter(v => v !== value)
              : [...prev.difficulty, value],
          };
        }
        return prev;
      }
      return {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(v => v !== value)
          : [...prev[category], value],
      };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <FilterDropdown
          title={`Game Type ${filters.type.length > 0 ? `(${filters.type.length})` : ''}`}
          options={filterOptions.types}
          selectedOptions={filters.type}
          onToggleOption={(value) => toggleFilter('type', value)}
        />
        <FilterDropdown
          title={`Duration ${filters.duration.length > 0 ? `(${filters.duration.length})` : ''}`}
          options={filterOptions.durations}
          selectedOptions={filters.duration}
          onToggleOption={(value) => toggleFilter('duration', value)}
        />
        <FilterDropdown
          title={`Difficulty ${filters.difficulty.length > 0 ? `(${filters.difficulty.length})` : ''}`}
          options={filterOptions.difficulties}
          selectedOptions={filters.difficulty}
          onToggleOption={(value) => toggleFilter('difficulty', value)}
        />
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map(game => (
          <div key={game.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{game.name}</h2>
            <p className="text-gray-600 mb-4">{game.description}</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-4">👥 {game.tags.playerCount.min}-{game.tags.playerCount.max} players</span>
                <span>⏱️ {game.tags.duration}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {game.tags.type.map(type => (
                  <span key={type} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 