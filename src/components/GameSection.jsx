'use client';

import { useState } from 'react';

export default function GameSection() {
  const [activeTab, setActiveTab] = useState('All');

  const games = {
    All: ['Ludo', 'Carrom', 'Chess', 'BGMI', 'Freefire', 'TicTacToe', 'RockPaperScissor', 'Uno'],
    Board: ['Ludo', 'Carrom', 'Chess', 'TicTacToe', 'RockPaperScissor'],
    Action: ['BGMI', 'Freefire'],
    Card: ['Uno'],
  };

  const gameImages = {
    TicTacToe: '/tictactoe.jpg',
    RockPaperScissor: '/rock.png',
    Uno: '/uno.jpg',
    Ludo: '/ludo.jpeg',
    Carrom: '/carrom.jpg',
    Chess: '/chess.jpg',
    BGMI: '/bgmi.jpg',
    Freefire: '/freefire.jpg',
  };

  const handleGameClick = (game) => {
    console.log(`${game} clicked`);
    // Placeholder for future dashboard or game logic
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-nowrap overflow-x-auto justify-start sm:justify-center gap-3 mb-8 scrollbar-hide">
          {['All', 'Board', 'Card', 'Action'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-base font-medium rounded-lg transition-all duration-200 min-w-[80px] flex-shrink-0 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-white bg-white/10 hover:bg-white/20 hover:shadow-md'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {games[activeTab].map((game) => (
            <div
              key={game}
              className="bg-white/10 rounded-xl text-white hover:bg-white/20 hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer aspect-[3/4] flex flex-col"
              onClick={() => handleGameClick(game)}
            >
              {/* Image Section (70%) */}
              <div className="flex-[0.7] flex items-center justify-center">
                <img
                  src={gameImages[game]}
                  alt={game}
                  className="w-full h-[180px] sm:h-[200px] object-cover rounded-md aspect-[3/4]"
                />
              </div>
              {/* Text Section (30%) */}
              <div className="flex-[0.3] flex flex-col items-center justify-center text-sm sm:text-base">
                <span className="font-medium">{game}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}