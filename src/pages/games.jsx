import React from 'react';
import { GameSection, BottomNav } from '../components/GameSection';

const Games = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <GameSection />
      <BottomNav />
    </div>
  );
}

export default Games;
