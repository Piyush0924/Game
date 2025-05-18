"use client"

import React from "react"
import GameModeTemplate from "../GameModeTemplate"
import { useNavigate } from "react-router-dom"

export default function ClassicMode({ onBack, gameTitle = "MemoryMatch" }) {
  const navigate = useNavigate()
  
  // Game data for MemoryMatch classic mode
  const gameOptions = [
    {
      id: 1,
      name: "Easy Match",
      prize: "₹8",
      entryFee: "₹5",
      players: "2 Players",
      playerCount: "245",
      liveCount: "110", 
      coinCost: "0.5 Coin",
      winners: "1 Winner",
      xp: 2,
      timeRemaining: "01m 00s"
    },
    {
      id: 2,
      name: "Medium Match",
      prize: "₹15",
      entryFee: "₹10",
      players: "2 Players",
      playerCount: "180",
      liveCount: "86",
      coinCost: "1 Coin",
      winners: "1 Winner", 
      xp: 5,
      timeRemaining: "01m 30s"
    },
    {
      id: 3,
      name: "Hard Match",
      prize: "₹38",
      entryFee: "₹25",
      players: "2 Players",
      playerCount: "125",
      liveCount: "65",
      coinCost: "2.5 Coin",
      winners: "1 Winner", 
      xp: 10,
      timeRemaining: "02m 30s"
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