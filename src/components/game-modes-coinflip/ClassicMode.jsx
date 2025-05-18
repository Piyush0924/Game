"use client"

import React from "react"
import GameModeTemplate from "../GameModeTemplate"
import { useNavigate } from "react-router-dom"

export default function ClassicMode({ onBack, gameTitle = "CoinFlip" }) {
  const navigate = useNavigate()
  
  // Game data for multiplayer battles
  const gameOptions = [
    {
      id: 1,
      name: "Multiplayer Battle",
      prize: "₹3",
      entryFee: "₹2",
      players: "2 Players",
      playerCount: "350",
      liveCount: "124", 
      coinCost: "0.20 Coin",
      winners: "1 Winner",
      xp: 1,
      timeRemaining: "00m 29s"
    },
    {
      id: 2,
      name: "Special Event",
      prize: "₹15",
      entryFee: "₹10",
      players: "2 Players",
      playerCount: "216",
      liveCount: "78",
      coinCost: "1 Coin",
      winners: "1 Winner", 
      xp: 4,
      timeRemaining: "01m 15s"
    },
    {
      id: 3,
      name: "Free Game",
      prize: "₹3",
      entryFee: "Free",
      players: "2 Players",
      playerCount: "412",
      liveCount: "180",
      coinCost: "0",
      winners: "1 Winner", 
      xp: 1,
      timeRemaining: "00m 45s"
    }
  ]
  
  return (
    <GameModeTemplate
      onBack={onBack}
      gameTitle={gameTitle}
      modeType="Classic"
      gameOptions={gameOptions}
      logoSrc="/coinflip.png"
    />
  )
} 