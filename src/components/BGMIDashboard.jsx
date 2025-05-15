"use client"

import { useState } from "react"
import { X, Star } from "lucide-react"
import ClassicMode from "./games-modes-BGMI/ClassicMode"
import TDM from "./games-modes-BGMI/TDM"

export default function BGMIDashboard() {
  const [currentView, setCurrentView] = useState("main")
  const [showDashboard, setShowDashboard] = useState(true)

  const handleClose = () => {
    console.log("Dashboard closed")
    setShowDashboard(false)
  }

  const renderView = () => {
    switch (currentView) {
      case "classicMode":
        return <ClassicMode onBack={() => setCurrentView("main")} />
      case "tdm":
        return <TDM onBack={() => setCurrentView("main")} />
      default:
        return (
          <div className="relative w-full h-screen bg-black text-white overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="/bgmi.jpg"
                alt="BGMI Background"
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col min-h-screen px-4">
              {/* Header with Close Button */}
              <div className="absolute top-4 right-4">
                <button
                  className="text-white hover:text-red-500 transition"
                  onClick={handleClose}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Spacer to push content down slightly */}
              <div className="flex-grow" />

              {/* Game Title Section */}
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-500 overflow-hidden shadow-lg mb-3">
                  <img
                    src="/bgmi.jpg"
                    alt="BGMI Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">BGMI</h1>
                <div className="flex justify-center gap-2 text-sm text-gray-300 mt-1">
                  <span className="text-base">Battle Royale</span>
                  <span>•</span>
                  <span className="text-green-400 flex items-center">
                    4.7 <Star size={16} fill="currentColor" className="ml-1" />
                  </span>
                  <span>•</span>
                  <span class="text-base">10K+ playing</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full max-w-md mb-4">
                <button
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg hover:brightness-110 transition-all active:scale-95"
                  onClick={() => setCurrentView("classicMode")}
                >
                  Play Now
                </button>
                <button
                  className="flex-1 py-3 rounded-lg border border-blue-500 text-blue-400 font-medium bg-blue-500/10 shadow-lg hover:bg-blue-500/20 transition-all active:scale-95"
                  onClick={() => setCurrentView("tdm")}
                >
                  Practice
                </button>
              </div>

              {/* Game Modes Section */}
              <div className="w-full max-w-md mb-4">
                <h2 className="text-xl font-bold mb-3 text-white text-left tracking-tight">Game Modes</h2>
                <div className="flex flex-col gap-1">
                  {/* Classic Mode */}
                  <div
                    className="bg-gray-800/50 rounded-xl shadow-lg p-2 border border-gray-700/50 transition-all hover:shadow-xl hover:bg-gray-800 cursor-pointer min-h-[3.5rem]"
                    onClick={() => setCurrentView("classicMode")}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-blue-400 font-semibold">Classic Mode</span>
                        <p className="text-gray-300 text-base">100-player battle royale</p>
                      </div>
                      <button
                        className="w-28 h-[48px] bg-[#009E60] px-2 py-0.5 rounded-lg font-bold text-white shadow-md hover:brightness-110 transition-all active:scale-95"
                      >
                        <div className="flex flex-col items-center justify-center gap-0 h-full">
                          <span className="text-white text-base">Entry</span>
                          <span className="text-white text-base">₹50 - ₹200</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Team Deathmatch (TDM) */}
                  <div
                    className="bg-gray-800/50 rounded-xl shadow-lg p-2 border border-gray-700/50 transition-all hover:shadow-xl hover:bg-gray-800 cursor-pointer min-h-[3.5rem]"
                    onClick={() => setCurrentView("tdm")}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-blue-400 font-semibold">Team Deathmatch (TDM)</span>
                        <p className="text-gray-300 text-base">Fast-paced 4v4 matches</p>
                      </div>
                      <button
                        className="w-28 h-[48px] bg-[#009E60] px-2 py-0.5 rounded-lg font-bold text-white shadow-md hover:brightness-110 transition-all active:scale-95"
                      >
                        <div className="flex flex-col items-center justify-center gap-0 h-full">
                          <span className="text-white text-base">Entry</span>
                          <span className="text-white text-base">₹20 - ₹100</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer to ensure content doesn't touch the bottom */}
              <div className="flex-grow" />
            </div>
          </div>
        )
    }
  }

  return showDashboard ? (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      {renderView()}
    </div>
  ) : null
}