'use client';

import { useState } from 'react';
import { ArrowRight, Users, Trophy, Wallet, Car } from 'lucide-react';
import LudoDashboard from './LudoDashboard';
import ChessDashboard from './ChessDashboard';
import CarromDashboard from './CarromDashboard';
import BGMIDashboard from './BGMIDashboard';
import FreefireDashboard from './FreeFireDashboard';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeDashboard, setActiveDashboard] = useState(null);

  const games = {
    All: ['Ludo', 'Carrom', 'Chess', 'BGMI', 'Freefire','TicTacToe','Rockpaperscissor','Uno'],
    Board: ['Ludo', 'Carrom', 'Chess','TicTacToe','Rockpaperscissor'],
    Action: ['BGMI', 'Freefire'],
    Card: ['Uno'],
  };

  const gameImages = {
    TicTacToe: '/tictactoe.jpg',
    Rockpaperscissor: '/rock.png',
    Uno: '/uno.jpg',
    Ludo: '/ludo.jpeg',
    Carrom: '/carrom.jpg',
    Chess: '/chess.jpg',
    BGMI: '/bgmi.jpg',
    Freefire: '/freefire.jpg',
  };

  const handleGameClick = (game) => {
    const dashboardMap = {
      Ludo: 'ludo',
      Chess: 'chess',
      Carrom: 'carrom',
      BGMI: 'bgmi',
      Freefire: 'freefire',
    };
    setActiveDashboard(dashboardMap[game]);
  };

  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden">
      {/* Background gradient and blur effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 animate-gradient" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Hero Heading */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            <span className="block">Your Favorite Games,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mt-2">
              Anytime!
            </span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg md:text-xl text-gray-300">
            Join millions of players in exciting multiplayer games. Challenge your skills,
            compete in tournaments, and win real cash prizes instantly.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="group px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
              Start Playing
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3 rounded-lg bg-white/10 text-white font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-200 backdrop-blur-sm">
              Download App
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-200">
            <Users className="mx-auto h-8 w-8 text-purple-400" />
            <div className="mt-4 text-3xl font-bold text-white">80M+</div>
            <div className="mt-2 text-gray-300">Downloads</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-200">
            <Trophy className="mx-auto h-8 w-8 text-yellow-400" />
            <div className="mt-4 text-3xl font-bold text-white">₹65,000</div>
            <div className="mt-2 text-gray-300">In Contest Winning</div>
          </div>
          <div className="                 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-200">
            <Wallet className="mx-auto h-8 w-8 text-green-400" />
            <div className="mt-4 text-3xl font-bold text-white">Instant</div>
            <div className="mt-2 text-gray-300">Withdrawal</div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All', 'Board', 'Card', 'Action'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm sm:text-base font-semibold transition-all duration-200 w-[80px] sm:w-auto ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-white bg-white/10 hover:bg-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {games[activeTab].map((game) => (
              <div
                key={game}
                className="bg-white/10 rounded-xl text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer aspect-[2.7/4] flex flex-col overflow-hidden"
                onClick={() => handleGameClick(game)}
              >
                {/* Image Section (70%) */}
                <div className="flex-[0.5] flex items-center justify-center ">
                  <img
                    src={gameImages[game]}
                    alt={game}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                {/* Text Section (30%) */}
                <div className="flex-[0.5] flex flex-col items-center justify-center text-sm sm:text-base">
                  <span className="font-medium">{game}</span>
                  {game === 'Ludo' && <span className="text-xs text-green-400 mt-1"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Dashboard Modal */}
      {activeDashboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setActiveDashboard(null)}
          ></div>
          <div className="relative w-full max-w-4xl px-4">
            <div className="modified-dashboard">
              {activeDashboard === 'ludo' && <LudoDashboard />}
              {activeDashboard === 'chess' && <ChessDashboard />}
              {activeDashboard === 'carrom' && <CarromDashboard />}
              {activeDashboard === 'bgmi' && <BGMIDashboard />}
              {activeDashboard === 'freefire' && <FreefireDashboard />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}