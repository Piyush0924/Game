"use client"

import React from "react"
import GameModeTemplate from "../GameModeTemplate"
import { useNavigate } from "react-router-dom"

export default function ClassicMode({ onBack, gameTitle = "TicTacToe" }) {
  const navigate = useNavigate()
  
  // Game data for TicTacToe classic mode precisely matching the screenshot
  const gameOptions = [
    {
      id: 1,
      name: "Quick Match",
      prize: "₹8",
      entryFee: "₹5",
      players: "2 Players",
      playerCount: "94",
      liveCount: "34", 
      winners: "1 Winner",
      timeRemaining: "00m 30s"
    },
    {
      id: 2,
      name: "Standard Match",
      prize: "₹15",
      entryFee: "₹10",
      players: "2 Players",
      playerCount: "45",
      liveCount: "18",
      winners: "1 Winner", 
      timeRemaining: "01m 30s"
    },
    {
      id: 3,
      name: "Expert Match",
      prize: "₹23",
      entryFee: "₹15",
      players: "2 Players",
      playerCount: "22",
      liveCount: "11",
      winners: "1 Winner", 
      timeRemaining: "02m 00s"
    }
  ]
  
  return (
    <GameModeTemplate
      onBack={onBack}
      gameTitle={gameTitle}
      modeType="Classic"
      gameOptions={gameOptions}
      logoSrc="/tictactoe.jpg"
    />
  )
}