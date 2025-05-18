"use client"

import React from "react"
import GameModeTemplate from "../GameModeTemplate"
import { useNavigate } from "react-router-dom"

export default function TournamentMode({ onBack, gameTitle = "Dice" }) {
  const navigate = useNavigate()
  
  // Tournament data for Dice
  const tournamentOptions = [
    {
      id: 1,
      name: "Daily Tournament",
      prize: "₹1,000",
      entryFee: "₹40",
      players: "2 Players",
      playerCount: "182",
      liveCount: "86",
      winners: "3 Winners",
      xp: 12,
      startTime: "Daily 9:00 PM",
      timeRemaining: "03h 30m"
    },
    {
      id: 2,
      name: "Weekend Special",
      prize: "₹5,000",
      entryFee: "₹100",
      players: "2 Players",
      playerCount: "124",
      liveCount: "62",
      winners: "5 Winners",
      xp: 25,
      startTime: "Saturday, 8:00 PM",
      timeRemaining: "24h 15m",
      isQuick: true
    },
    {
      id: 3,
      name: "Free Tournament",
      prize: "₹500",
      entryFee: "Free",
      players: "2 Players",
      playerCount: "280",
      liveCount: "145",
      winners: "10 Winners",
      xp: 5,
      startTime: "Friday, 7:00 PM",
      timeRemaining: "5h 45m"
    }
  ]
  
  return (
    <GameModeTemplate
      onBack={onBack}
      gameTitle={gameTitle}
      modeType="Tournament"
      gameOptions={tournamentOptions}
      logoSrc="/dice-tournament.png"
    />
  )
} 