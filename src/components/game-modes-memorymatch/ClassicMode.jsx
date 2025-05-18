"use client"

import React from "react"
import GameModeTemplate from "../GameModeTemplate"
import { useNavigate } from "react-router-dom"

export default function ClassicMode({ onBack, gameTitle = "MemoryMatch" }) {
  const navigate = useNavigate()
  
  // Game data for MemoryMatch classic mode exactly matching the screenshot
  const gameOptions = [
    {
      id: 1,
      name: "Easy Match",
      prize: "₹8",
      entryFee: "₹5",
      players: "2 Players",
      playerCount: "34",
      liveCount: "16", 
      winners: "1 Winner",
      timeRemaining: "00m 30s"
    },
    {
      id: 2,
      name: "Medium Match",
      prize: "₹15",
      entryFee: "₹10",
      players: "2 Players",
      playerCount: "18",
      liveCount: "7",
      winners: "1 Winner", 
      timeRemaining: "01m 30s"
    },
    {
      id: 3,
      name: "Hard Match",
      prize: "₹23",
      entryFee: "₹15",
      players: "2 Players",
      playerCount: "11",
      liveCount: "5",
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
      logoSrc="/memorymatch.png"
    />
  )
} 