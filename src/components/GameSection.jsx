'use client';

import React, { useState } from 'react';
import { Home, Gamepad2, Wallet, Users, User } from 'lucide-react';

// GameSection Component
function GameSection() {
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
    <div className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
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

// BottomNav Component
const navigation = [
  { name: 'Home', icon: Home, href: '#' },
  { name: 'Games', icon: Gamepad2, href: '#' },
  { name: 'Wallet', icon: Wallet, href: '#' },
  { name: 'Community', icon: Users, href: '#' },
  { name: 'Profile', icon: User, href: '#' },
];

export default function BottomNav() {
  const [active, setActive] = useState('Home'); // Default to Home

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Content Area */}
      <div className="flex-grow pb-20">
        {active === 'Games' && <GameSection />}
        {active === 'Home' && <div className="text-white text-center pt-12">Home Content</div>}
        {active === 'Wallet' && <div className="text-white text-center pt-12">Wallet Content</div>}
        {active === 'Community' && <div className="text-white text-center pt-12">Community Content</div>}
        {active === 'Profile' && <div className="text-white text-center pt-12">Profile Content</div>}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999]">
        <div className="mx-auto max-w-2xl">
          <div className="glass-effect bg-gradient-to-tr from-white/70 via-purple-100/60 to-blue-100/60 backdrop-blur-xl border-t border-gray-200 shadow-2xl rounded-t-2xl flex justify-around items-center h-20 px-2">
            {navigation.map((item) => {
              const isActive = active === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActive(item.name)}
                  className={`flex flex-col items-center justify-center w-full h-full group focus:outline-none transition-all duration-200 ${
                    isActive ? 'text-purple-700' : 'text-gray-600 hover:text-purple-600'
                  }`}
                  style={{ minWidth: 0 }}
                >
                  <span
                    className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                      isActive ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg scale-110' : ''
                    } p-2`}
                  >
                    <item.icon className={`h-7 w-7 transition-all duration-200 ${isActive ? 'text-white' : ''}`} />
                  </span>
                  <span
                    className={`text-xs mt-1 font-semibold transition-all duration-200 ${
                      isActive ? 'text-purple-700' : ''
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}