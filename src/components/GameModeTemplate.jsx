"use client"

import React, { useState } from "react"
import { ChevronLeft, Clock, Info, Users, Trophy, Wallet, History as HistoryIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function GameModeTemplate({ 
  onBack, 
  gameTitle = "Game",
  modeType = "Classic", // "Classic" or "Tournament"
  gameOptions = [],
  logoSrc = "/game-logo.png"
}) {
  const navigate = useNavigate()
  const [showHistory, setShowHistory] = useState(false)
  const [walletBalance] = useState(1240) // Mock balance - replace with real balance from your state management
  
  // Mock history data - replace with real history from API/state
  const gameHistory = [
    { id: 1, gameName: "TicTacToe", date: "Today, 3:30 PM", result: "Won", amount: "₹15" },
    { id: 2, gameName: "CoinFlip", date: "Today, 2:15 PM", result: "Lost", amount: "₹5" },
    { id: 3, gameName: "MemoryMatch", date: "Yesterday", result: "Won", amount: "₹20" }
  ]

  const handlePlayClick = (game) => {
    // Navigate to the actual game with the selected mode
    navigate(`/games/${gameTitle.toLowerCase()}/${modeType.toLowerCase()}`);
  };

  const showGameInfo = () => {
    alert(`How to play ${gameTitle} ${modeType}:\n\nChoose your entry amount and compete against other players to win prizes. ${modeType === "Tournament" ? "Join tournaments to win bigger prizes!" : "Play classic mode for quick games!"}`);
  };
  
  return (
    <div className="flex flex-col h-full min-h-screen bg-[#1e0b3b] text-white">
      {/* Header */}
      <div className="p-3 flex items-center justify-between bg-[#1e0b3b] border-b border-purple-900/40">
        <div className="flex items-center">
          <button className="text-white p-2" onClick={onBack}>
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center">
            <span className="text-lg font-medium">{gameTitle}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-purple-900/60 px-3 py-1.5 rounded-full">
            <Wallet size={14} className="text-green-400" />
            <span className="text-white font-medium">₹{walletBalance}</span>
          </div>
          <button 
            className="p-2 bg-purple-900/60 rounded-full"
            onClick={() => setShowHistory(!showHistory)}
          >
            <HistoryIcon size={16} className="text-gray-300" />
          </button>
          <button 
            className="p-2 bg-purple-900/60 rounded-full"
            onClick={showGameInfo}
          >
            <Info size={16} className="text-gray-300" />
          </button>
        </div>
      </div>

      {/* History Popup */}
      {showHistory && (
        <div className="absolute top-16 right-3 z-10 bg-[#2a1252] shadow-lg rounded-lg w-64 p-3 border border-purple-700/50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Recent Games</h3>
            <button onClick={() => setShowHistory(false)}>×</button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {gameHistory.map(item => (
              <div key={item.id} className="flex justify-between text-xs border-b border-purple-800/30 pb-1">
                <div>
                  <div className="font-medium">{item.gameName}</div>
                  <div className="text-gray-400">{item.date}</div>
                </div>
                <div className={item.result === "Won" ? "text-green-400" : "text-red-400"}>
                  {item.result === "Won" ? "+" : "-"}{item.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Hero Section with Game Title */}
      <div className="bg-[#1e0b3b] pt-6 pb-2 px-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/50 overflow-hidden">
            <img 
              src={logoSrc} 
              alt={gameTitle}
              className="w-16 h-16 object-contain"
              onError={(e) => {
                e.target.src = "/fallback.jpg"
              }}
            />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-white mb-4">{modeType} Mode</h1>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        {gameOptions.map((game) => (
          <div key={game.id} className="bg-white mb-0.5">
            <div className="p-4 relative overflow-hidden">
              {/* Game Card */}
              <div className="relative z-10">
                {/* Players and Winners Info */}
                <div className="flex justify-between mb-3">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-gray-700 font-medium">{game.players}</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-gray-700 font-medium">{game.winners}</span>
                  </div>
                </div>

                {/* Prize and Entry Fee */}
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-gray-500 text-xs">
                      {modeType === "Classic" ? "WINNING AMOUNT" : "PRIZE POOL"}
                    </div>
                    <div className="text-2xl font-bold text-[#1e0b3b]">
                      {game.prize}
                    </div>
                  </div>
                  
                  <button
                    className="h-11 px-6 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full text-center"
                    onClick={() => handlePlayClick(game)}
                  >
                    {game.entryFee === "Free" ? "Free" : `Play ${game.entryFee}`}
                  </button>
                </div>

                {/* Live Count and Time */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                    <span>{game.liveCount} playing</span>
                  </div>
                  
                  {game.timeRemaining && (
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{game.timeRemaining}</span>
                    </div>
                  )}
                  
                  {modeType === "Tournament" && game.startTime && (
                    <div className="flex items-center text-blue-600">
                      <span>{game.startTime}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Quick Badge - Show only if applicable and not in Classic mode */}
              {game.isQuick && modeType !== "Classic" && (
                <div className="absolute top-2 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                  QUICK
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 