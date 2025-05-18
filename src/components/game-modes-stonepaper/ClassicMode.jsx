"use client"

import React from "react"
import GameModeTemplate from "../GameModeTemplate"
import { useNavigate } from "react-router-dom"

export default function ClassicMode({ onBack, gameTitle = "StonePaper" }) {
  const navigate = useNavigate()
  
  // Game data for Stone-Paper-Scissors classic mode
  const gameOptions = [
    {
      id: 1,
      name: "Quick Match",
      prize: "₹8",
      entryFee: "₹5",
      players: "2 Players",
      playerCount: "312",
      liveCount: "145", 
      coinCost: "0.5 Coin",
      winners: "1 Winner",
      xp: 2,
      timeRemaining: "00m 20s"
    },
    {
      id: 2,
      name: "Standard Match",
      prize: "₹15",
      entryFee: "₹10",
      players: "2 Players",
      playerCount: "210",
      liveCount: "95",
      coinCost: "1 Coin",
      winners: "1 Winner", 
      xp: 3,
      timeRemaining: "00m 30s"
    },
    {
      id: 3,
      name: "Premium Match",
      prize: "₹38",
      entryFee: "₹25",
      players: "2 Players",
      playerCount: "145",
      liveCount: "68",
      coinCost: "2.5 Coin",
      winners: "1 Winner", 
      xp: 6,
      timeRemaining: "00m 45s"
    }
  ]
  
  return (
    <GameModeTemplate
      onBack={onBack}
      gameTitle={gameTitle}
      modeType="Classic"
      gameOptions={gameOptions}
      logoSrc="/stonepaper.jpg"
    />
  )
} 