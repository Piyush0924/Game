import React from 'react';
import GameSection  from '../components/GameSection';
import BottomNav  from '../components/BottomNav';
const Games = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <GameSection />
      <BottomNav />
    </div>
  );
}

export default Games;
