"use client"

import { useState } from "react"
import GameDashboard from "./GameDashboard"
import CarromDashboard from "./CarromDashboard"

export default function GameSection() {
  const [activeTab, setActiveTab] = useState("All")
  const [activeDashboard, setActiveDashboard] = useState(null)

  const games = {
    All: ["Ludo", "Carrom", "Chess", "BGMI", "Freefire", "TicTacToe", , "Uno","CoinFlip","Dice","MemoryMatch","StonePaper"],
    Board: ["Ludo", "Carrom", "Chess", "TicTacToe", ],
    Action: ["BGMI", "Freefire"],
    Card: ["Uno"],
  }
const gameLinks = {
  TicTacToe: "/games/tictactoe",
  Uno: "/games/uno",
  Ludo: "/games/ludo",
  Carrom: "/games/carrom",
  Chess: "/games/chess",
  BGMI: "/games/bgmi",
  Freefire: "/games/freefire",
  CoinFlip: "/games/coinFlip",
  Dice: "/games/dice",
  MemoryMatch: "/games/memorymatch",
  StonePaper:"/games/stonePaper",
}

  const gameImages = {
    TicTacToe: "/tictactoe.jpg",
    Uno: "/uno.jpg",
    Ludo: "/ludo.jpeg",
    Carrom: "/carrom.jpg",
    Chess: "/chess.jpg",
    BGMI: "/bgmi.jpg",
    Freefire: "/freefire.jpg",
      CoinFlip: "/coinflip.jpg",
  Dice: "/dice.png",
  MemoryMatch: "/memorymatch.png",
  StonePaper:"/stonepaper.jpg",
  }

  const gameCategories = {
    TicTacToe: "Board",
    RockPaperScissor: "Board",
    Uno: "Card",
    Ludo: "Board",
    Carrom: "Board",
    Chess: "Board",
    BGMI: "Action",
    Freefire: "Action",
  }

  // Default entry fees for all games (can be customized per game if needed)
  const defaultEntryFees = {
    classic: "₹10 - ₹50",
    quick: "₹5 - ₹25",
    tournament: "₹20 - ₹100",
    private: "Custom",
  }

  // Custom entry fees for specific games (if needed)
  const gameEntryFees = {
    BGMI: {
      classic: "₹15 - ₹75",
      quick: "₹10 - ₹30",
      tournament: "₹50 - ₹200",
      private: "Custom",
    },
    Freefire: {
      classic: "₹15 - ₹75",
      quick: "₹10 - ₹30",
      tournament: "₹50 - ₹200",
      private: "Custom",
    },
    // Add other custom entry fees as needed
  }

  const handleGameClick = (game) => {
    // Check if the game is implemented
    if (games.All.includes(game)) {
      setActiveDashboard(game)
    } else {
      console.log(`${game} dashboard not implemented yet`)
    }
  }

  const getEntryFees = (game) => {
    return gameEntryFees[game] || defaultEntryFees
  }

  return (
    <div className="relative bg-gray-900 min-h-screen overflow-hidden mb-36 pb-5">
      {/* Background gradient and blur effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 animate-gradient" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-float pb-3" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed pb-3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Tabs Section */}
        <div className="mt-12">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["All", "Board", "Card", "Action"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-200 min-w-[80px] ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "text-white bg-white/10 hover:bg-white/20"
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
                className="bg-white/10 rounded-xl text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer flex flex-col shadow-md"
                onClick={() => handleGameClick(game)}
              >
                {/* Image Section (70%) */}
                <div className="flex-[0.7] p-3">
                  <div className="relative w-full h-full aspect-[3/4]">
                    <img
                      src={gameImages[game] || "/placeholder.svg"}
                      alt={game}
                      className="absolute inset-0 w-full h-full object-cover rounded-md border border-gray-700"
                      onError={(e) => {
                        e.target.src = "/fallback.jpg" // Fallback image
                      }}
                    />
                  </div>
                </div>
                {/* Text Section (30%) */}
                <div className="flex-[0.3] flex flex-col items-center justify-center text-sm sm:text-base">
                  <span className="font-medium">{game}</span>
                  {game === "Ludo" && <span className="text-xs text-green-400 mt-1">Popular</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Dashboard Modal */}
      {activeDashboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setActiveDashboard(null)}></div>
          <div className="relative w-full max-w-4xl px-4">
            <div className="bg-gray-800 rounded-xl p-6 border-4 border-gradient-to-r from-purple-600 to-blue-600">
              <GameDashboard
                gameTitle={activeDashboard}
                gameImage={gameImages[activeDashboard]}
                gameCategory={gameCategories[activeDashboard]}
                entryFees={getEntryFees(activeDashboard)}
                onClose={() => setActiveDashboard(null)}
                 link={gameLinks[activeDashboard] || "#"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
