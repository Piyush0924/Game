"use client"

import React from "react"
import GameModeTemplate from "../GameModeTemplate"
import { useNavigate } from "react-router-dom"

export default function TournamentMode({ onBack, gameTitle = "MemoryMatch" }) {
  const navigate = useNavigate()
  
  // Tournament data for MemoryMatch with prize pool information
  const tournamentOptions = [
    {
      id: 1,
      name: "Daily Tournament",
      prize: "₹1,200",
      prizePool: "₹1,200",
      entryFee: "₹40",
      players: "2 Players",
      playerCount: "145",
      liveCount: "72",
      winners: "3 Winners",
      xp: 15,
      startTime: "Daily 6:00 PM",
      timeRemaining: "02h 45m"
    },
    {
      id: 2,
      name: "Weekend Special",
      prize: "₹4,000",
      prizePool: "₹4,000",
      entryFee: "₹100",
      players: "2 Players",
      playerCount: "110",
      liveCount: "55",
      winners: "4 Winners",
      xp: 25,
      startTime: "Saturday, 4:00 PM",
      timeRemaining: "22h 15m",
      isQuick: true
    },
    {
      id: 3,
      name: "Free Tournament",
      prize: "₹400",
      prizePool: "₹400",
      entryFee: "Free",
      players: "2 Players",
      playerCount: "280",
      liveCount: "140",
      winners: "8 Winners",
      xp: 6,
      startTime: "Friday, 8:00 PM",
      timeRemaining: "4h 30m"
    }
  ]
  
  return (
    <GameModeTemplate
      onBack={onBack}
      gameTitle={gameTitle}
      modeType="Tournament"
      gameOptions={tournamentOptions}
      logoSrc="/memorymatch.png"
    />
  )
} 