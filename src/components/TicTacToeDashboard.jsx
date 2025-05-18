"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";
import ClassicMode from "./game-modes-tictactoe/ClassicMode";
import TournamentMode from "./game-modes-tictactoe/TournamentMode";
import QuickMode from "./game-modes-tictactoe/QuickMode";
import PrivateMode from "./game-modes-tictactoe/PrivateMode";
import TicTacToe from "../games/Tictactoe/Tictactoe";

export default function TicTacToeDashboard() {
  const [currentView, setCurrentView] = useState("main");
  const [showDashboard, setShowDashboard] = useState(true);

  const handleClose = () => {
    console.log("Dashboard closed");
    setShowDashboard(false);
  };

  const renderView = () => {
    switch (currentView) {
      case "classicMode":
        return <ClassicMode onBack={() => setCurrentView("main")} />;
      case "tournament":
        return <TournamentMode onBack={() => setCurrentView("main")} />;
      case "quickMode":
        return <QuickMode onBack={() => setCurrentView("main")} />;
      case "privateRoom":
        return <PrivateMode onBack={() => setCurrentView("main")} />;
      case "playNow":
        return (
          <div className="relative w-full h-screen bg-black text-white overflow-hidden">
            <TicTacToe onBack={() => setCurrentView("main")} />
          </div>
        );
      case "practice":
        return <div>Practice Page (Placeholder)</div>;
      default:
        return (
          <div className="relative w-full h-screen bg-black text-white overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="/tictactoe.jpg"
                alt="Tic-Tac-Toe Background"
                className="w-full h-full object-cover opacity-100 blur-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-transparent" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col min-h-screen px-4">
              {/* Header with Close Button */}
              <div className="absolute top-4 right-4">
                <button
                  className="text-white hover:text-red-500 transition rounded-full p-2 bg-gray-800/50"
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
                    src="/tictactoe.jpeg"
                    alt="Tic-Tac-Toe Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Tic-Tac-Toe</h1>
                <div className="flex justify-center gap-2 text-base text-gray-300 mt-1">
                  <span>Board</span>
                  <span>•</span>
                  <span className="text-green-400 flex items-center">
                    4.8 <Star size={16} fill="currentColor" className="ml-1" />
                  </span>
                  <span>•</span>
                  <span className="text-base">4 playing</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full max-w-md mb-4">
                <button
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg hover:brightness-110 transition-all active:scale-95"
                  onClick={() => setCurrentView("playNow")}
                >
                  Play Now
                </button>
                <button
                  className="flex-1 py-3 rounded-lg border border-blue-500 text-blue-400 font-medium bg-blue-500/10 shadow-lg hover:bg-blue-500/20 transition-all active:scale-95"
                  onClick={() => setCurrentView("practice")}
                >
                  Practice
                </button>
              </div>

              {/* Game Modes Section */}
              <div className="w-full max-w-md mb-4">
                <h2 className="text-xl font-bold mb-3 text-white text-left tracking-tight">
                  Game Modes
                </h2>
                <div className="flex flex-col gap-1">
                  {/* Classic Mode */}
                  <div
                    className="bg-gray-800/50 rounded-xl shadow-lg p-2 border border-gray-700/50 transition-all hover:shadow-xl hover:bg-gray-800 cursor-pointer min-h-[3.5rem]"
                    onClick={() => setCurrentView("classicMode")}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-blue-400 font-medium text-lg">
                          Classic Mode
                        </span>
                        <p className="text-gray-300 text-base">
                          Play with 2-4 players
                        </p>
                      </div>
                      <button
                        className="w-28 h-[48px] bg-[#009E60] px-2 py-0.5 rounded-lg font-bold text-white shadow-md hover:brightness-110 transition-all active:scale-95"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentView("classicMode");
                        }}
                      >
                        <div className="flex flex-col items-center justify-center gap-0 h-full">
                          <span className="text-white text-sm">Entry</span>
                          <span className="text-white text-sm">₹10 - ₹50</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Quick Mode */}
                  <div
                    className="bg-gray-800/50 rounded-xl shadow-lg p-2 border border-gray-700/50 transition-all hover:shadow-xl hover:bg-gray-800 cursor-pointer min-h-[3.5rem]"
                    onClick={() => setCurrentView("quickMode")}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-blue-400 font-medium text-lg">
                          Quick Mode
                        </span>
                        <p className="text-gray-300 text-base">Faster gameplay</p>
                      </div>
                      <button
                        className="w-28 h-[48px] bg-[#009E60] px-2 py-0.5 rounded-lg font-bold text-white shadow-md hover:brightness-110 transition-all active:scale-95"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentView("quickMode");
                        }}
                      >
                        <div className="flex flex-col items-center justify-center gap-0 h-full">
                          <span className="text-white text-sm">Entry</span>
                          <span className="text-white text-sm">₹5 - ₹25</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Tournament Mode */}
                  <div
                    className="bg-gray-800/50 rounded-xl shadow-lg p-2 border border-gray-700/50 transition-all hover:shadow-xl hover:bg-gray-800 cursor-pointer min-h-[3.5rem]"
                    onClick={() => setCurrentView("tournament")}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-blue-400 font-medium text-lg">
                          Tournament
                        </span>
                        <p className="text-gray-300 text-base">
                          Compete for big prizes
                        </p>
                      </div>
                      <button
                        className="w-28 h-[48px] bg-[#009E60] px-2 py-0.5 rounded-lg font-bold text-white shadow-md hover:brightness-110 transition-all active:scale-95"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentView("tournament");
                        }}
                      >
                        <div className="flex flex-col items-center justify-center gap-0 h-full">
                          <span className="text-white text-sm">Entry</span>
                          <span className="text-white text-sm">₹20 - ₹100</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Private Room */}
                  <div
                    className="bg-gray-800/50 rounded-xl shadow-lg p-2 border border-gray-700/50 transition-all hover:shadow-xl hover:bg-gray-800 cursor-pointer min-h-[3.5rem]"
                    onClick={() => setCurrentView("privateRoom")}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-blue-400 font-medium text-lg">
                          Private Room
                        </span>
                        <p className="text-gray-300 text-base">
                          Invite your friends
                        </p>
                      </div>
                      <button
                        className="w-28 h-[48px] bg-[#009E60] px-2 py-0.5 rounded-lg font-bold text-white shadow-md hover:brightness-110 transition-all active:scale-95"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentView("privateRoom");
                        }}
                      >
                        <div className="flex flex-col items-center justify-center gap-0 h-full">
                          <span className="text-white text-sm">Entry</span>
                          <span className="text-white text-sm">Custom</span>
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
        );
    }
  };

  return showDashboard ? (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      {renderView()}
    </div>
  ) : null;
}