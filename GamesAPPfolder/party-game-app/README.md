# Party Game Web App

A mobile-first web application for playing party games with friends, whether in person or over video calls.

## Features

- Browse and filter party games
- Create and join game sessions
- Real-time game synchronization
- Mobile-optimized interface
- Team-based and individual game modes

## Tech Stack

- React.js with TypeScript
- Tailwind CSS for styling
- Firebase for backend services
- Vite for build tooling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Main app pages
├── firebase/      # Firebase setup and utilities
├── hooks/         # Custom React hooks
├── context/       # React context for state management
└── games/         # Game logic and configurations
```

## Development

This project follows a mobile-first approach and uses modern React practices. The codebase is organized to support scalability and maintainability.

## Implementation Notes

### Phase 2: Static Game Selection & Details (Completed)
- Created mock data structure for games with TypeScript interfaces
- Implemented mobile-optimized game browsing grid with cozy card design
- Added client-side search functionality and category filters
- Created detailed game view pages with placeholders for rules and instructions
- Set up React Router for navigation between pages
- Maintained cozy, homey design throughout with warm colors and friendly UI elements

Key Components Created:
- `GameCard.tsx`: Reusable card component for displaying game information
- `GameDetail.tsx`: Detailed view for individual games
- `mockGames.ts`: TypeScript interface and mock data for games
- Updated `Home.tsx` with search and filtering capabilities
- Set up routing in `App.tsx`

The implementation maintains a warm, inviting atmosphere while providing a smooth user experience for browsing and viewing games.

### Phase 3: UI/UX Improvements (Latest Updates)
- Unified game data structure by combining mockGames.ts into gamesData.ts
- Redesigned game list view with expandable items replacing the card grid layout
- Implemented advanced filtering system with a popup modal including:
  - Number of players filter
  - Game type multi-select
  - Duration dropdown
  - Difficulty level selection
- Enhanced search functionality with improved icon placement and styling
- Added clear filters option and apply filters button
- Improved mobile responsiveness with better spacing and touch targets

Key Components Updated:
- Created new `FilterPopup.tsx` for advanced filtering options
- Replaced `GameCard.tsx` with new `GameListItem.tsx` for expandable list view
- Updated `Home.tsx` with new search and filter UI
- Consolidated game data in `gamesData.ts` with comprehensive game information

The new list view provides a more compact and efficient way to browse games, while the advanced filtering system helps users find the perfect game for their group size and preferences.

## License

MIT
