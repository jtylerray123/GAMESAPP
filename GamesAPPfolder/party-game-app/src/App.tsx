import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameSessionProvider } from './context/GameSessionContext';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import { GamePage } from './pages/GamePage';

function App() {
  return (
    <Router>
      <GameSessionProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/play/:gameName/:sessionId" element={<GamePage />} />
        </Routes>
      </GameSessionProvider>
    </Router>
  );
}

export default App;
