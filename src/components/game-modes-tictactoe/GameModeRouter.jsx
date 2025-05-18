import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GameModeConnector from '../GameModeConnector';

/**
 * GameModeRouter - Handles routing for game modes across all games
 * Routes to either mode selection screens or directly to the game lobby with the selected mode
 */
const GameModeRouter = ({ onBack, gameType = "tictactoe" }) => {
  // Dynamic imports based on game type
  const getComponent = (mode) => {
    // Try to import the component dynamically
    try {
      // First, try to import from the game-specific folder
      const Component = lazy(() => import(`../game-modes-${gameType}/${mode}`));
      return (
        <Suspense fallback={<div className="text-white p-8 text-center">Loading...</div>}>
          <Component onBack={onBack} gameId={gameType} />
        </Suspense>
      );
    } catch (error) {
      console.error(`Failed to load ${mode} for ${gameType}: ${error}`);
      // Fallback to generic message
      return <div className="text-white p-8 text-center">This mode is not available for {gameType}</div>;
    }
  };

  return (
    <Routes>
      {/* Mode selection screens */}
      <Route path="/" element={<Navigate to="select/classic" />} />
      <Route path="select/classic" element={getComponent('ClassicMode')} />
      <Route path="select/tournament" element={getComponent('TournamentMode')} />
      <Route path="select/private" element={getComponent('PrivateMode')} />
      <Route path="select/quick" element={getComponent('QuickMode')} />
      
      {/* Game lobby routes with the selected mode and price */}
      <Route path="play/:modeType" element={<GameModeConnector />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="select/classic" />} />
    </Routes>
  );
};

export default GameModeRouter; 